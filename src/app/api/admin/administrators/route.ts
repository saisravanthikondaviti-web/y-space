import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type AdminRoleRow = {
  id: string;
  role_key: string;
  role_name: string;
  description: string | null;
};

type AdminUserRow = {
  user_id: string;
  role_id: string | null;
  status: string;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  admin_roles: AdminRoleRow | AdminRoleRow[] | null;
};

function getSupabaseClients() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured."
    );
  }

  const authClient = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const adminClient = createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  return {
    authClient,
    adminClient,
  };
}

async function getBearerToken(
  request: NextRequest
) {
  const authorization =
    request.headers.get("authorization");

  if (!authorization) {
    return null;
  }

  const [scheme, token] =
    authorization.split(" ");

  if (
    scheme?.toLowerCase() !== "bearer" ||
    !token
  ) {
    return null;
  }

  return token;
}

async function requireSuperAdmin(
  request: NextRequest
) {
  const token =
    await getBearerToken(request);

  if (!token) {
    return {
      error: "Authentication required.",
      status: 401,
    };
  }

  const {
    authClient,
    adminClient,
  } = getSupabaseClients();

  const {
    data: { user },
    error: userError,
  } =
    await authClient.auth.getUser(token);

  if (userError || !user) {
    return {
      error:
        "Invalid or expired authentication session.",
      status: 401,
    };
  }

  const {
    data: adminUser,
    error: adminError,
  } =
    await adminClient
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
        `
      )
      .eq("user_id", user.id)
      .maybeSingle();

  if (adminError) {
    console.error(
      "Failed to verify administrator:",
      adminError
    );

    return {
      error:
        "Unable to verify administrator permissions.",
      status: 500,
    };
  }

  if (!adminUser) {
    return {
      error:
        "Administrator access required.",
      status: 403,
    };
  }

  if (adminUser.status !== "active") {
    return {
      error:
        "Your administrator account is not active.",
      status: 403,
    };
  }

  const role = Array.isArray(
    adminUser.admin_roles
  )
    ? adminUser.admin_roles[0]
    : adminUser.admin_roles;

  if (
    role?.role_key !== "SUPER_ADMIN"
  ) {
    return {
      error:
        "Super Admin access required.",
      status: 403,
    };
  }

  return {
    user,
    adminClient,
  };
}

export async function GET(
  request: NextRequest
) {
  try {
    const result =
      await requireSuperAdmin(request);

    if ("error" in result) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        {
          status: result.status,
        }
      );
    }

    const { adminClient } = result;

    /*
     * ============================================================
     * LOAD ADMINISTRATORS
     * ============================================================
     *
     * Actual admin_roles columns:
     *   id
     *   role_key
     *   role_name
     *   description
     */
    const {
      data: adminRows,
      error: adminRowsError,
    } = await adminClient
      .from("admin_users")
      .select(
        `
          user_id,
          role_id,
          status,
          approved_by,
          approved_at,
          created_at,
          updated_at,
          admin_roles (
            id,
            role_key,
            role_name,
            description
          )
        `
      )
      .order("created_at", {
        ascending: true,
      });

    if (adminRowsError) {
      console.error(
        "Failed to load administrator records:",
        adminRowsError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            adminRowsError.message ||
            "Failed to load administrator records.",
        },
        {
          status: 500,
        }
      );
    }

    const rows =
      (adminRows as AdminUserRow[] | null) ??
      [];

    /*
     * ============================================================
     * LOAD PAGE PERMISSIONS
     * ============================================================
     *
     * Actual admin_pages columns:
     *   id
     *   page_key
     *   page_name
     *   route
     *   description
     *   is_active
     */
    const {
      data: pageRows,
      error: pageRowsError,
    } = await adminClient
      .from("admin_user_pages")
      .select(
        `
          user_id,
          page_id,
          admin_pages (
            id,
            page_key,
            page_name,
            route
          )
        `
      );

    if (pageRowsError) {
      console.error(
        "Failed to load administrator page permissions:",
        pageRowsError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            pageRowsError.message ||
            "Failed to load administrator page permissions.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ============================================================
     * LOAD WORK HOURS
     * ============================================================
     */
    const {
      data: workHourRows,
      error: workHourError,
    } = await adminClient
      .from("admin_work_hours")
      .select("*")
      .order("day_of_week", {
        ascending: true,
      });

    if (workHourError) {
      console.error(
        "Failed to load administrator work hours:",
        workHourError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            workHourError.message ||
            "Failed to load administrator work hours.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ============================================================
     * LOAD LOGIN HISTORY
     * ============================================================
     *
     * Actual admin_login_history column:
     *   login_at
     *
     * NOT logged_in_at.
     */
    const {
      data: loginRows,
      error: loginError,
    } = await adminClient
      .from("admin_login_history")
      .select(
        `
          user_id,
          login_at
        `
      )
      .order("login_at", {
        ascending: false,
      });

    if (loginError) {
      console.error(
        "Failed to load login history:",
        loginError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            loginError.message ||
            "Failed to load login history.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ============================================================
     * LOAD AUTH USERS
     * ============================================================
     */
    const authUsers: Array<{
      id: string;
      email?: string;
      user_metadata?: Record<
        string,
        unknown
      >;
      email_confirmed_at?: string | null;
      app_metadata?: Record<
        string,
        unknown
      >;
    }> = [];

    let authPage = 1;
    const authPerPage = 1000;

    while (true) {
      const {
        data: authData,
        error: authError,
      } =
        await adminClient.auth.admin.listUsers(
          {
            page: authPage,
            perPage: authPerPage,
          }
        );

      if (authError) {
        console.error(
          "Failed to load Auth users:",
          authError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              authError.message ||
              "Failed to load Auth users.",
          },
          {
            status: 500,
          }
        );
      }

      const users =
        authData.users ?? [];

      authUsers.push(...users);

      if (
        users.length <
        authPerPage
      ) {
        break;
      }

      authPage += 1;
    }

    const authUserMap =
      new Map(
        authUsers.map(
          (authUser) => [
            authUser.id,
            authUser,
          ]
        )
      );

    /*
     * ============================================================
     * MAP LATEST LOGIN PER USER
     * ============================================================
     */
    const latestLoginMap =
      new Map<string, string>();

    for (
      const login of loginRows ?? []
    ) {
      if (
        login.user_id &&
        login.login_at &&
        !latestLoginMap.has(
          login.user_id
        )
      ) {
        latestLoginMap.set(
          login.user_id,
          login.login_at
        );
      }
    }

    /*
     * ============================================================
     * MAP PAGE PERMISSIONS BY USER
     * ============================================================
     */
    const pagesByUser =
      new Map<
        string,
        Array<{
          id: string;
          pageKey: string;
          name: string;
          route: string;
        }>
      >();

    for (
      const row of pageRows ?? []
    ) {
      const page =
        Array.isArray(
          row.admin_pages
        )
          ? row.admin_pages[0]
          : row.admin_pages;

      if (!page) {
        continue;
      }

      const existing =
        pagesByUser.get(
          row.user_id
        ) ?? [];

      existing.push({
        id: page.id,

        pageKey:
          page.page_key,

        /*
         * Database uses page_name.
         * Frontend receives it as `name`.
         */
        name:
          page.page_name,

        route:
          page.route,
      });

      pagesByUser.set(
        row.user_id,
        existing
      );
    }

    /*
     * ============================================================
     * MAP WORK HOURS BY USER
     * ============================================================
     */
    const workHoursByUser =
      new Map<
        string,
        unknown[]
      >();

    for (
      const row of workHourRows ?? []
    ) {
      const existing =
        workHoursByUser.get(
          row.user_id
        ) ?? [];

      existing.push(row);

      workHoursByUser.set(
        row.user_id,
        existing
      );
    }

    /*
     * ============================================================
     * BUILD FINAL ADMINISTRATOR RESPONSE
     * ============================================================
     */
    const administrators =
      rows.map((row) => {
        const authUser =
          authUserMap.get(
            row.user_id
          );

        const role =
          Array.isArray(
            row.admin_roles
          )
            ? row.admin_roles[0]
            : row.admin_roles;

        const userMetadata =
          authUser?.user_metadata ??
          {};

        const firstName =
          typeof userMetadata.first_name ===
          "string"
            ? userMetadata.first_name
            : "";

        const lastName =
          typeof userMetadata.last_name ===
          "string"
            ? userMetadata.last_name
            : "";

        const metadataName =
          typeof userMetadata.name ===
          "string"
            ? userMetadata.name
            : "";

        const fullName =
          `${firstName} ${lastName}`.trim();

        const name =
          fullName ||
          metadataName ||
          authUser?.email ||
          "Unknown User";

        return {
          id: row.user_id,

          email:
            authUser?.email ??
            "Unknown email",

          name,

          status:
            row.status === "active"
              ? "Active"
              : row.status ===
                  "suspended"
                ? "Suspended"
                : row.status ===
                    "invited"
                  ? "Invited"
                  : row.status,

          /*
           * Database:
           *   role_key
           *   role_name
           *
           * Frontend:
           *   key
           *   name
           */
          role: role
            ? {
                id: role.id,
                key:
                  role.role_key,
                name:
                  role.role_name,
                description:
                  role.description,
              }
            : null,

          approvedBy:
            row.approved_by,

          approvedAt:
            row.approved_at,

          createdAt:
            row.created_at,

          updatedAt:
            row.updated_at,

          emailConfirmed:
            Boolean(
              authUser?.email_confirmed_at
            ),

          providers:
            Array.isArray(
              authUser?.app_metadata
                ?.providers
            )
              ? (authUser
                  ?.app_metadata
                  ?.providers as string[])
              : [],

          pages:
            pagesByUser.get(
              row.user_id
            ) ?? [],

          workHours:
            workHoursByUser.get(
              row.user_id
            ) ?? [],

          lastLogin:
            latestLoginMap.get(
              row.user_id
            ) ?? null,
        };
      });

    return NextResponse.json({
      success: true,
      administrators,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/administrators error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error.",
      },
      {
        status: 500,
      }
    );
  }
}