import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
    serviceRoleKey,
  };
}

async function getAuthenticatedUser(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const accessToken = authorization
    .slice("Bearer ".length)
    .trim();

  if (!accessToken) {
    return null;
  }

  const { supabaseUrl, supabaseAnonKey } = getEnv();

  const authClient = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  const {
    data: { user },
    error,
  } = await authClient.auth.getUser(accessToken);

  if (error || !user) {
    return null;
  }

  return user;
}

function getAdminClient() {
  const { supabaseUrl, serviceRoleKey } = getEnv();

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

async function requireSuperAdmin(request: NextRequest) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return {
      user: null,
      adminClient: null,
      response: NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      ),
    };
  }

  const adminClient = getAdminClient();

  const { data: adminUser, error } = await adminClient
    .from("admin_users")
    .select(
      `
        status,
        admin_roles (
          role_key,
          role_name
        )
      `,
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error(
      "Failed to verify Super Admin:",
      error,
    );

    return {
      user: null,
      adminClient: null,
      response: NextResponse.json(
        {
          success: false,
          error:
            "Failed to verify administrator access",
        },
        { status: 500 },
      ),
    };
  }

  const role = Array.isArray(adminUser?.admin_roles)
    ? adminUser.admin_roles[0]
    : adminUser?.admin_roles;

  if (
    adminUser?.status !== "active" ||
    role?.role_key !== "SUPER_ADMIN"
  ) {
    return {
      user: null,
      adminClient: null,
      response: NextResponse.json(
        {
          success: false,
          error: "Super Admin access required",
        },
        { status: 403 },
      ),
    };
  }

  return {
    user,
    adminClient,
    response: null,
  };
}

function normalizeRole(value: unknown) {
  const roleMap: Record<string, string> = {
    "Super Admin": "SUPER_ADMIN",
    Admin: "ADMIN",
    Editor: "EDITOR",
    Author: "AUTHOR",
    Analyst: "ANALYST",
  };

  if (
    typeof value !== "string" ||
    !roleMap[value]
  ) {
    return null;
  }

  return roleMap[value];
}

function normalizeStatus(value: unknown) {
  if (value === "Active") {
    return "active";
  }

  if (value === "Suspended") {
    return "suspended";
  }

  if (value === "Invited") {
    return "invited";
  }

  return null;
}

/* =========================================================
   GET ADMINISTRATOR ACCESS
   ========================================================= */

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  },
) {
  try {
    const auth = await requireSuperAdmin(request);

    if (
      auth.response ||
      !auth.adminClient
    ) {
      return auth.response;
    }

    const { userId } = await params;

    const adminClient = auth.adminClient;

    /* -----------------------------------------
       Administrator
       ----------------------------------------- */

    const {
      data: admin,
      error: adminError,
    } = await adminClient
      .from("admin_users")
      .select(
        `
          user_id,
          status,
          role_id,
          admin_roles (
            id,
            role_key,
            role_name,
            description
          )
        `,
      )
      .eq("user_id", userId)
      .maybeSingle();

    if (adminError) {
      throw adminError;
    }

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Administrator not found",
        },
        { status: 404 },
      );
    }

    /* -----------------------------------------
       Page permissions
       ----------------------------------------- */

    const {
      data: pageRows,
      error: pageError,
    } = await adminClient
      .from("admin_user_pages")
      .select(
        `
          page_id,
          admin_pages (
            id,
            page_key,
            page_name,
            route,
            description,
            is_active
          )
        `,
      )
      .eq("user_id", userId);

    if (pageError) {
      throw pageError;
    }

    /* -----------------------------------------
       Work hours
       ----------------------------------------- */

    const {
      data: workHours,
      error: workHourError,
    } = await adminClient
      .from("admin_work_hours")
      .select("*")
      .eq("user_id", userId)
      .order("day_of_week", {
        ascending: true,
      });

    if (workHourError) {
      throw workHourError;
    }

    /* -----------------------------------------
       Normalize role
       ----------------------------------------- */

    const role = Array.isArray(
      admin.admin_roles,
    )
      ? admin.admin_roles[0]
      : admin.admin_roles;

    /* -----------------------------------------
       Normalize pages
       ----------------------------------------- */

    const pages = (pageRows ?? [])
      .map((row) =>
        Array.isArray(row.admin_pages)
          ? row.admin_pages[0]
          : row.admin_pages,
      )
      .filter(Boolean);

    return NextResponse.json({
      success: true,

      administrator: {
        id: admin.user_id,

        status: admin.status,

        role: role
          ? {
              id: role.id,
              key: role.role_key,
              name: role.role_name,
              description: role.description,
            }
          : null,

        pages,

        workHours: workHours ?? [],
      },
    });
  } catch (error) {
    console.error(
      "Administrator GET error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error",
      },
      { status: 500 },
    );
  }
}

/* =========================================================
   UPDATE ADMINISTRATOR ACCESS
   ========================================================= */

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  },
) {
  try {
    const auth = await requireSuperAdmin(request);

    if (
      auth.response ||
      !auth.adminClient ||
      !auth.user
    ) {
      return auth.response;
    }

    const { userId } = await params;

    const body = await request.json();

    const roleKey = normalizeRole(body.role);

    const normalizedStatus =
      normalizeStatus(body.status);

    const pageKeys = Array.isArray(
      body.pageKeys,
    )
      ? body.pageKeys.filter(
          (
            value: unknown,
          ): value is string =>
            typeof value === "string",
        )
      : [];

    const workStart =
      typeof body.workStart === "string"
        ? body.workStart
        : "09:00";

    const workEnd =
      typeof body.workEnd === "string"
        ? body.workEnd
        : "18:00";

    if (
      !roleKey ||
      !normalizedStatus
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid role or status",
        },
        { status: 400 },
      );
    }

    /* -----------------------------------------
       Protect current Super Admin
       ----------------------------------------- */

    if (
      userId === auth.user.id &&
      roleKey !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You cannot remove your own Super Admin role.",
        },
        { status: 400 },
      );
    }

    if (
      userId === auth.user.id &&
      normalizedStatus !== "active"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You cannot suspend or deactivate your own account.",
        },
        { status: 400 },
      );
    }

    const adminClient = auth.adminClient;

    /* -----------------------------------------
       Find role
       ----------------------------------------- */

    const {
      data: role,
      error: roleError,
    } = await adminClient
      .from("admin_roles")
      .select("id, role_key")
      .eq("role_key", roleKey)
      .single();

    if (roleError || !role) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Administrator role not found",
        },
        { status: 400 },
      );
    }

    /* -----------------------------------------
       Verify target administrator
       ----------------------------------------- */

    const {
      data: targetAdmin,
      error: targetError,
    } = await adminClient
      .from("admin_users")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (targetError) {
      throw targetError;
    }

    if (!targetAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: "Administrator not found",
        },
        { status: 404 },
      );
    }

    /* -----------------------------------------
       Update administrator
       ----------------------------------------- */

    const {
      error: updateError,
    } = await adminClient
      .from("admin_users")
      .update({
        role_id: role.id,
        status: normalizedStatus,
        updated_at:
          new Date().toISOString(),

        ...(normalizedStatus === "active"
          ? {
              approved_by:
                auth.user.id,

              approved_at:
                new Date().toISOString(),
            }
          : {}),
      })
      .eq("user_id", userId);

    if (updateError) {
      throw updateError;
    }

    /* -----------------------------------------
       Resolve requested pages
       ----------------------------------------- */

    const {
      data: pageRows,
      error: pageLookupError,
    } = await adminClient
      .from("admin_pages")
      .select("id, page_key")
      .in("page_key", pageKeys);

    if (pageLookupError) {
      throw pageLookupError;
    }

    const pageIds = (
      pageRows ?? []
    ).map((page) => page.id);

    /* -----------------------------------------
       Remove existing permissions
       ----------------------------------------- */

    const {
      error: deletePagesError,
    } = await adminClient
      .from("admin_user_pages")
      .delete()
      .eq("user_id", userId);

    if (deletePagesError) {
      throw deletePagesError;
    }

    /* -----------------------------------------
       Super Admin gets every page
       ----------------------------------------- */

    if (roleKey === "SUPER_ADMIN") {
      const {
        data: allPages,
        error: allPagesError,
      } = await adminClient
        .from("admin_pages")
        .select("id");

      if (allPagesError) {
        throw allPagesError;
      }

      const rows = (
        allPages ?? []
      ).map((page) => ({
        user_id: userId,
        page_id: page.id,
      }));

      if (rows.length > 0) {
        const {
          error,
        } = await adminClient
          .from("admin_user_pages")
          .insert(rows);

        if (error) {
          throw error;
        }
      }
    }

    /* -----------------------------------------
       Normal admin gets selected pages
       ----------------------------------------- */

    else if (pageIds.length > 0) {
      const rows = pageIds.map(
        (pageId) => ({
          user_id: userId,
          page_id: pageId,
        }),
      );

      const {
        error,
      } = await adminClient
        .from("admin_user_pages")
        .insert(rows);

      if (error) {
        throw error;
      }
    }

    /* -----------------------------------------
       Work hours
       ----------------------------------------- */

    const workHourRows = Array.from(
      { length: 7 },
      (_, dayOfWeek) => ({
        user_id: userId,
        day_of_week: dayOfWeek,
        start_time: workStart,
        end_time: workEnd,
        is_enabled: true,
      }),
    );

    const {
      error: workHourError,
    } = await adminClient
      .from("admin_work_hours")
      .upsert(
        workHourRows,
        {
          onConflict:
            "user_id,day_of_week",
        },
      );

    if (workHourError) {
      throw workHourError;
    }

    return NextResponse.json({
      success: true,
      message:
        "Administrator access updated successfully",
    });
  } catch (error) {
    console.error(
      "Administrator PATCH error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error",
      },
      { status: 500 },
    );
  }
}