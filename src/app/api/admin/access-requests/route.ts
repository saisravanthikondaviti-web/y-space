import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return { supabaseUrl, supabaseAnonKey, serviceRoleKey };
}

function getAdminClient() {
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

async function requireSuperAdmin(request: NextRequest) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return {
      user: null,
      adminClient: null,
      response: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  const adminClient = getAdminClient();

  const { data: adminUser, error } = await adminClient
    .from("admin_users")
    .select("status, admin_roles(role_key)")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Access request Super Admin check failed:", error);

    return {
      user: null,
      adminClient: null,
      response: NextResponse.json(
        { success: false, error: "Failed to verify administrator access" },
        { status: 500 },
      ),
    };
  }

  const role = Array.isArray(adminUser?.admin_roles)
    ? adminUser.admin_roles[0]
    : adminUser?.admin_roles;

  if (adminUser?.status !== "active" || role?.role_key !== "SUPER_ADMIN") {
    return {
      user: null,
      adminClient: null,
      response: NextResponse.json(
        { success: false, error: "Super Admin access required" },
        { status: 403 },
      ),
    };
  }

  return { user, adminClient, response: null };
}

async function requireAuthenticatedUser(request: NextRequest) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return {
      user: null,
      adminClient: null,
      response: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  return { user, adminClient: getAdminClient(), response: null };
}

function normalizeRoleKey(value: unknown) {
  if (typeof value !== "string") return null;

  const valueMap: Record<string, string> = {
    Admin: "ADMIN",
    Editor: "EDITOR",
    Author: "AUTHOR",
    Analyst: "ANALYST",
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
    AUTHOR: "AUTHOR",
    ANALYST: "ANALYST",
  };

  return valueMap[value] ?? null;
}

const PAGE_KEY_SET = new Set([
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

function normalizePageKeys(value: unknown) {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value.filter(
        (item): item is string =>
          typeof item === "string" && PAGE_KEY_SET.has(item),
      ),
    ),
  );
}

function normalizeRequestStatus(value: unknown) {
  if (value === "approved") return "Approved" as const;
  if (value === "rejected") return "Rejected" as const;
  return "Pending" as const;
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireSuperAdmin(request);
    if (auth.response || !auth.adminClient) return auth.response;

    const adminClient = auth.adminClient;

    const [requestResult, roleResult, pageResult, authUsersResult] =
      await Promise.all([
        adminClient
          .from("admin_access_requests")
          .select(
            "id,requester_id,requester_email,requested_role_id,reason,status,reviewed_by,reviewed_at,review_notes,created_at,updated_at",
          )
          .order("created_at", { ascending: false }),
        adminClient
          .from("admin_roles")
          .select("id,role_key,role_name,description"),
        adminClient
          .from("admin_pages")
          .select("id,page_key,page_name,route")
          .eq("is_active", true),
        adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      ]);

    if (requestResult.error) throw requestResult.error;
    if (roleResult.error) throw roleResult.error;
    if (pageResult.error) throw pageResult.error;
    if (authUsersResult.error) throw authUsersResult.error;

    const roles = roleResult.data ?? [];
    const pages = pageResult.data ?? [];
    const authUsers = authUsersResult.data.users ?? [];

    const roleMap = new Map(roles.map((role) => [role.id, role]));
    const pageMap = new Map(pages.map((page) => [page.id, page]));
    const authUserMap = new Map(authUsers.map((user) => [user.id, user]));

    const requestIds = (requestResult.data ?? []).map((item) => item.id);

    let requestPageRows: Array<{
      request_id: string;
      page_id: string;
    }> = [];

    if (requestIds.length > 0) {
      const { data, error } = await adminClient
        .from("admin_access_request_pages")
        .select("request_id,page_id")
        .in("request_id", requestIds);

      if (error) throw error;
      requestPageRows = data ?? [];
    }

    const pagesByRequest = new Map<string, typeof pages>();

    for (const row of requestPageRows) {
      const page = pageMap.get(row.page_id);
      if (!page) continue;

      const current = pagesByRequest.get(row.request_id) ?? [];
      current.push(page);
      pagesByRequest.set(row.request_id, current);
    }

    const administrators = new Set<string>();
    const { data: adminRows, error: adminRowsError } = await adminClient
      .from("admin_users")
      .select("user_id");

    if (adminRowsError) throw adminRowsError;
    for (const row of adminRows ?? []) administrators.add(row.user_id);

    const requests = (requestResult.data ?? []).map((item) => {
      const authUser = item.requester_id
        ? authUserMap.get(item.requester_id)
        : null;
      const role = item.requested_role_id
        ? roleMap.get(item.requested_role_id)
        : null;

      const requestedPages = (pagesByRequest.get(item.id) ?? []).sort(
        (a, b) => a.page_name.localeCompare(b.page_name),
      );

      return {
        id: item.id,
        requesterId: item.requester_id,
        name:
          String(authUser?.user_metadata?.name ?? "").trim() ||
          String(authUser?.user_metadata?.full_name ?? "").trim() ||
          item.requester_email ||
          "User",
        email: item.requester_email || authUser?.email || "",
        requestedRole: role?.role_name ?? "Admin",
        requestedRoleKey: role?.role_key ?? "ADMIN",
        requestedPages: requestedPages.map((page) => ({
          id: page.id,
          key: page.page_key,
          name: page.page_name,
          route: page.route,
        })),
        reason: item.reason ?? "",
        status: normalizeRequestStatus(item.status),
        reviewedBy: item.reviewed_by,
        reviewedAt: item.reviewed_at,
        reviewNotes: item.review_notes ?? "",
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        alreadyAdministrator: item.requester_id
          ? administrators.has(item.requester_id)
          : false,
      };
    });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("Access requests GET error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unable to load access requests",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuthenticatedUser(request);
    if (auth.response || !auth.adminClient || !auth.user) return auth.response;

    const adminClient = auth.adminClient;
    const body = await request.json();

    const requestedRoleKey = normalizeRoleKey(
      body.requestedRole ?? body.requestedRoleKey ?? body.roleKey,
    );
    const pageKeys = normalizePageKeys(
      body.pageKeys ?? body.requestedPages ?? body.pages,
    );
    const reason = typeof body.reason === "string" ? body.reason.trim() : "";

    if (!requestedRoleKey) {
      return NextResponse.json(
        { success: false, error: "Please select a valid administrator role." },
        { status: 400 },
      );
    }

    if (pageKeys.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please request at least one page." },
        { status: 400 },
      );
    }

    const { data: existingAdmin, error: existingAdminError } = await adminClient
      .from("admin_users")
      .select("user_id")
      .eq("user_id", auth.user.id)
      .maybeSingle();

    if (existingAdminError) throw existingAdminError;

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: "You already have administrator access." },
        { status: 409 },
      );
    }

    const { data: existingRequest, error: existingRequestError } =
      await adminClient
        .from("admin_access_requests")
        .select("id,status")
        .eq("requester_id", auth.user.id)
        .eq("status", "pending")
        .maybeSingle();

    if (existingRequestError) throw existingRequestError;

    if (existingRequest) {
      return NextResponse.json(
        { success: false, error: "You already have a pending access request." },
        { status: 409 },
      );
    }

    const { data: role, error: roleError } = await adminClient
      .from("admin_roles")
      .select("id,role_key,role_name")
      .eq("role_key", requestedRoleKey)
      .single();

    if (roleError || !role || role.role_key === "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Requested administrator role was not found." },
        { status: 400 },
      );
    }

    const { data: pages, error: pageError } = await adminClient
      .from("admin_pages")
      .select("id,page_key")
      .in("page_key", pageKeys)
      .eq("is_active", true);

    if (pageError) throw pageError;

    if (!pages || pages.length !== pageKeys.length) {
      return NextResponse.json(
        { success: false, error: "One or more requested pages are invalid." },
        { status: 400 },
      );
    }

    const { data: accessRequest, error: insertError } = await adminClient
      .from("admin_access_requests")
      .insert({
        requester_id: auth.user.id,
        requester_email: auth.user.email ?? null,
        requested_role_id: role.id,
        reason: reason || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !accessRequest) throw insertError ?? new Error("Request was not created");

    const { error: pageInsertError } = await adminClient
      .from("admin_access_request_pages")
      .insert(
        pages.map((page) => ({
          request_id: accessRequest.id,
          page_id: page.id,
        })),
      );

    if (pageInsertError) {
      await adminClient
        .from("admin_access_requests")
        .delete()
        .eq("id", accessRequest.id);
      throw pageInsertError;
    }

    return NextResponse.json(
      {
        success: true,
        requestId: accessRequest.id,
        message: "Administrator access request submitted successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Access request POST error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unable to submit access request",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await requireSuperAdmin(request);
    if (auth.response || !auth.adminClient || !auth.user) return auth.response;

    const adminClient = auth.adminClient;
    const body = await request.json();
    const requestId = typeof body.requestId === "string" ? body.requestId : "";
    const action = body.action === "approve" ? "approve" : body.action === "reject" ? "reject" : null;
    const reviewNotes =
      typeof body.reviewNotes === "string" ? body.reviewNotes.trim() : "";

    if (!requestId || !action) {
      return NextResponse.json(
        { success: false, error: "A valid requestId and action are required." },
        { status: 400 },
      );
    }

    const { data: accessRequest, error: requestError } = await adminClient
      .from("admin_access_requests")
      .select(
        "id,requester_id,requester_email,requested_role_id,status,reason",
      )
      .eq("id", requestId)
      .maybeSingle();

    if (requestError) throw requestError;

    if (!accessRequest) {
      return NextResponse.json(
        { success: false, error: "Access request not found." },
        { status: 404 },
      );
    }

    if (accessRequest.status !== "pending") {
      return NextResponse.json(
        { success: false, error: "This access request has already been reviewed." },
        { status: 409 },
      );
    }

    if (!accessRequest.requester_id) {
      return NextResponse.json(
        { success: false, error: "This request has no valid requester." },
        { status: 400 },
      );
    }

    if (action === "reject") {
      const { error } = await adminClient
        .from("admin_access_requests")
        .update({
          status: "rejected",
          reviewed_by: auth.user.id,
          reviewed_at: new Date().toISOString(),
          review_notes: reviewNotes || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", requestId)
        .eq("status", "pending");

      if (error) throw error;

      return NextResponse.json({
        success: true,
        message: "Access request rejected.",
      });
    }

    const requestedRoleKey = normalizeRoleKey(body.roleKey ?? body.requestedRole);
    const pageKeys = normalizePageKeys(body.pageKeys);

    if (!requestedRoleKey) {
      return NextResponse.json(
        { success: false, error: "A valid administrator role is required." },
        { status: 400 },
      );
    }

    const { data: role, error: roleError } = await adminClient
      .from("admin_roles")
      .select("id,role_key,role_name")
      .eq("role_key", requestedRoleKey)
      .single();

    if (roleError || !role || role.role_key === "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "The selected administrator role is invalid." },
        { status: 400 },
      );
    }

    let finalPageKeys = pageKeys;

    if (finalPageKeys.length === 0) {
      const { data: requestedPageRows, error: requestedPageError } =
        await adminClient
          .from("admin_access_request_pages")
          .select("page_id")
          .eq("request_id", requestId);

      if (requestedPageError) throw requestedPageError;

      const requestedPageIds = (requestedPageRows ?? []).map((row) => row.page_id);

      if (requestedPageIds.length > 0) {
        const { data: requestedPages, error: requestedPagesError } =
          await adminClient
            .from("admin_pages")
            .select("page_key")
            .in("id", requestedPageIds)
            .eq("is_active", true);

        if (requestedPagesError) throw requestedPagesError;
        finalPageKeys = (requestedPages ?? []).map((page) => page.page_key);
      }
    }

    if (finalPageKeys.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one page must be assigned." },
        { status: 400 },
      );
    }

    const { data: pages, error: pagesError } = await adminClient
      .from("admin_pages")
      .select("id,page_key")
      .in("page_key", finalPageKeys)
      .eq("is_active", true);

    if (pagesError) throw pagesError;

    if (!pages || pages.length !== finalPageKeys.length) {
      return NextResponse.json(
        { success: false, error: "One or more selected pages are invalid." },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();

    const { error: adminUpsertError } = await adminClient
      .from("admin_users")
      .upsert(
        {
          user_id: accessRequest.requester_id,
          role_id: role.id,
          status: "active",
          approved_by: auth.user.id,
          approved_at: now,
          updated_at: now,
        },
        { onConflict: "user_id" },
      );

    if (adminUpsertError) throw adminUpsertError;

    const { error: deletePagesError } = await adminClient
      .from("admin_user_pages")
      .delete()
      .eq("user_id", accessRequest.requester_id);

    if (deletePagesError) throw deletePagesError;

    const { error: insertPagesError } = await adminClient
      .from("admin_user_pages")
      .insert(
        pages.map((page) => ({
          user_id: accessRequest.requester_id,
          page_id: page.id,
        })),
      );

    if (insertPagesError) throw insertPagesError;

    const workHourRows = Array.from({ length: 7 }, (_, dayOfWeek) => ({
      user_id: accessRequest.requester_id,
      day_of_week: dayOfWeek,
      start_time: "09:00",
      end_time: "18:00",
      is_enabled: true,
    }));

    const { error: workHourError } = await adminClient
      .from("admin_work_hours")
      .upsert(workHourRows, { onConflict: "user_id,day_of_week" });

    if (workHourError) throw workHourError;

    const { error: updateRequestError } = await adminClient
      .from("admin_access_requests")
      .update({
        status: "approved",
        reviewed_by: auth.user.id,
        reviewed_at: now,
        review_notes: reviewNotes || null,
        updated_at: now,
      })
      .eq("id", requestId)
      .eq("status", "pending");

    if (updateRequestError) throw updateRequestError;

    return NextResponse.json({
      success: true,
      message: "Access request approved and administrator access created.",
      administrator: {
        userId: accessRequest.requester_id,
        role: role.role_name,
        pages: finalPageKeys,
      },
    });
  } catch (error) {
    console.error("Access request PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unable to review access request",
      },
      { status: 500 },
    );
  }
}
