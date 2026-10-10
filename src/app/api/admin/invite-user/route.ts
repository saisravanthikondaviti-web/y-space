import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type InviteRequest = {
  email?: string;
  role?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InviteRequest;

    const email = body.email?.trim().toLowerCase();
    const role = body.role?.trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    if (!role) {
      return NextResponse.json(
        { error: "User role is required." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
      );

      return NextResponse.json(
        { error: "Server authentication configuration is missing." },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data, error } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        data: {
          role,
        },
      });

    if (error) {
      console.error("Supabase invitation error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        role,
      },
    });
  } catch (error) {
    console.error("Invite user API error:", error);

    return NextResponse.json(
      { error: "Unable to send the invitation." },
      { status: 500 }
    );
  }
}