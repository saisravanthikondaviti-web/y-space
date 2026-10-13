import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const PAGE_KEYS = new Set([
  "dashboard",
  "users",
  "content",
  "blogs",
  "services",
  "apps-products",
  "api-hub",
  "media",
  "analytics",
  "marketing",
  "notifications",
  "settings",
]);

function getEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return { supabaseUrl, supabaseAnonKey, serviceRoleKey };
}

function getServiceClient() {
  const { supabaseUrl, serviceRoleKey } = getEnv();

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function getAuthenticatedUser(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) return null;

  const accessToken = authorization.slice("Bearer ".length).trim();
  if (!accessToken) return null;

  const { supabaseUrl, supabaseAnonKey } = getEnv();

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const {
    data: { user },
    error,
  } = await authClient.auth.getUser(accessToken);

  if (error || !user) return null;

  return user;
}

function normalizePageKey(value: string) {
  const normalized = value.replace(/^\/+|\/+$/g, "");
  const adminPrefix = normalized.startsWith("admin/")
    ? normalized.slice("admin/".length)
    : normalized;

  const key = adminPrefix.split("/")[0] ?? "";
  return PAGE_KEYS.has(key) ? key : null;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          allowed: false,
          reason: "unauthorized",
        },
        { status: 401 },
      );
    }

    const requestedPage =
      request.nextUrl.searchParams.get("page") ??
      request.nextUrl.searchParams.get("path") ??
      "";

    const pageKey = normalizePageKey(requestedPage);

    if (!pageKey) {
      return NextResponse.json(
        {
          success: false,
          allowed: false,
          reason: "invalid_page",
          error: "Invalid admin page.",
        },
        { status: 400 },
      );
    }

    const adminClient = getServiceClient();

    const { data: adminUser, error: adminError } = await adminClient
      .from("admin_users")
      .select("user_id,status,role_id,admin_roles(role_key,role_name)")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) throw adminError;

    if (!adminUser || adminUser.status !== "active") {
      return NextResponse.json(
        {
          success: true,
          allowed: false,
          reason: "not_active_admin",
          pageKey,
        },
        { status: 403 },
      );
    }

    const role = Array.isArray(adminUser.admin_roles)
      ? adminUser.admin_roles[0]
      : adminUser.admin_roles;

    if (role?.role_key === "SUPER_ADMIN") {
      return NextResponse.json({
        success: true,
        allowed: true,
        superAdmin: true,
        pageKey,
        role: role.role_name ?? "Super Admin",
      });
    }

    const { data: page, error: pageError } = await adminClient
      .from("admin_pages")
      .select("id,page_key,page_name,route,is_active")
      .eq("page_key", pageKey)
      .eq("is_active", true)
      .maybeSingle();

    if (pageError) throw pageError;

    if (!page) {
      return NextResponse.json(
        {
          success: true,
          allowed: false,
          reason: "page_not_found",
          pageKey,
        },
        { status: 403 },
      );
    }

    const { data: assignment, error: assignmentError } = await adminClient
      .from("admin_user_pages")
      .select("user_id,page_id")
      .eq("user_id", user.id)
      .eq("page_id", page.id)
      .maybeSingle();

    if (assignmentError) throw assignmentError;

    return NextResponse.json({
      success: true,
      allowed: Boolean(assignment),
      superAdmin: false,
      pageKey,
      role: role?.role_name ?? "Administrator",
      page: {
        key: page.page_key,
        name: page.page_name,
        route: page.route,
      },
    });
  } catch (error) {
    console.error("Admin access check error:", error);

    return NextResponse.json(
      {
        success: false,
        allowed: false,
        reason: "server_error",
        error:
          error instanceof Error
            ? error.message
            : "Unable to verify admin page access.",
      },
      { status: 500 },
    );
  }
}
