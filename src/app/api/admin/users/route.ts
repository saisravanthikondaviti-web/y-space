import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL environment variable.",
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.",
  );
}

if (!serviceRoleKey) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY environment variable.",
  );
}

/*
 * Public/anon client.
 *
 * Used only to validate the access token sent by the
 * currently logged-in admin.
 */
const supabaseAuth = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

/*
 * Service-role client.
 *
 * IMPORTANT:
 * This is server-only.
 * Never expose this key through NEXT_PUBLIC_* variables.
 */
const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

export async function GET(request: NextRequest) {
  try {
    /*
     * Get the access token from the Authorization header.
     */
    const authorization =
      request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        { status: 401 },
      );
    }

    const accessToken =
      authorization.substring("Bearer ".length);

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication token is missing.",
        },
        { status: 401 },
      );
    }

    /*
     * Ask Supabase Auth to validate the access token.
     */
    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser(
      accessToken,
    );

    if (authError || !user) {
      console.error(
        "Admin users authentication error:",
        authError,
      );

      return NextResponse.json(
        {
          success: false,
          error: "Your session is invalid or expired.",
        },
        { status: 401 },
      );
    }

    /*
     * Verify that this authenticated user exists
     * in our admin_users table.
     *
     * The service-role client is used here because
     * this is a server-side authorization check.
     */
    const { data: adminUser, error: adminError } =
      await supabaseAdmin
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (adminError) {
      console.error(
        "Admin verification error:",
        adminError,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to verify administrator access.",
        },
        { status: 500 },
      );
    }

    if (!adminUser) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You are not authorized to view users.",
        },
        { status: 403 },
      );
    }

    /*
     * Fetch all Supabase Auth users.
     *
     * auth.users cannot be queried directly from
     * the browser, so this happens securely on
     * the server with the service-role client.
     */
    const allUsers = [];

    let page = 1;
    const perPage = 1000;

    while (true) {
      const {
        data,
        error,
      } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage,
      });

      if (error) {
        console.error(
          "Supabase Auth users error:",
          error,
        );

        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: 500 },
        );
      }

      allUsers.push(...data.users);

      if (data.users.length < perPage) {
        break;
      }

      page += 1;
    }

    /*
     * Get every admin account so we can show the
     * correct role in the dashboard.
     */
    const {
      data: adminRows,
      error: adminUsersError,
    } = await supabaseAdmin
      .from("admin_users")
      .select("user_id");

    if (adminUsersError) {
      console.error(
        "Admin users table error:",
        adminUsersError,
      );

      return NextResponse.json(
        {
          success: false,
          error: adminUsersError.message,
        },
        { status: 500 },
      );
    }

    const adminIds = new Set(
      (adminRows ?? []).map(
        (row) => row.user_id,
      ),
    );

    /*
     * Convert Supabase Auth users into the shape
     * required by the dashboard.
     */
    const users = allUsers.map((authUser) => {
      const metadata =
        authUser.user_metadata ?? {};

      const fullName =
        metadata.full_name ||
        metadata.name ||
        metadata.display_name ||
        metadata.username ||
        "";

      const fallbackName =
        authUser.email?.split("@")[0] ||
        "Unknown user";

      const name =
        typeof fullName === "string" &&
        fullName.trim()
          ? fullName.trim()
          : fallbackName;

      const providers =
        authUser.app_metadata?.providers ?? [];

      let status:
        | "Active"
        | "Invited"
        | "Suspended" = "Active";

      if (authUser.banned_until) {
        status = "Suspended";
      } else if (!authUser.last_sign_in_at) {
        status = "Invited";
      }

      return {
        id: authUser.id,
        name,
        email: authUser.email ?? "",
        role: adminIds.has(authUser.id)
          ? "Admin"
          : "User",
        status,
        lastLogin:
          authUser.last_sign_in_at ?? null,
        createdAt: authUser.created_at,
        emailConfirmed:
          Boolean(authUser.email_confirmed_at),
        providers,
      };
    });

    /*
     * Newest accounts first.
     */
    users.sort((a, b) => {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });

    return NextResponse.json({
      success: true,
      users,
      total: users.length,
    });
  } catch (error) {
    console.error(
      "Admin users API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load users.",
      },
      { status: 500 },
    );
  }
}