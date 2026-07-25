import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("CONTACT API HIT");

  try {
    const body = await req.json();

    console.log("REQUEST BODY:", body);

    return NextResponse.json({
      success: true,
      message: "API working",
      data: body,
    });

  } catch (error) {

    console.error(
      "API ERROR:",
      JSON.stringify(error, null, 2)
    );

    return NextResponse.json(
      {
        success:false,
        error:"API crashed"
      },
      {
        status:500
      }
    );
  }
}