import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {

  console.log("CONTACT API HIT");

  try {

    const body = await req.json();

    console.log("REQUEST BODY:", body);


    const {
      name,
      email,
      projectType,
      message,
    } = body;


    const apiKey = process.env.RESEND_API_KEY;


    console.log(
      "RESEND KEY EXISTS:",
      Boolean(apiKey)
    );


    if (!apiKey) {

      throw new Error(
        "RESEND_API_KEY is missing"
      );

    }


    const resend = new Resend(apiKey);


    console.log(
      "RESEND INITIALIZED"
    );


    const emailResult =
      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to:[
          "saisravanthikondaviti@gmail.com"
        ],

        replyTo:
          email,

        subject:
          `New Contact Request - ${name}`,


        html:`

        <h2>
          New Contact Submission
        </h2>

        <p>
          <b>Name:</b> ${name}
        </p>

        <p>
          <b>Email:</b> ${email}
        </p>

        <p>
          <b>Project Type:</b> ${projectType}
        </p>

        <p>
          <b>Message:</b>
        </p>

        <p>
          ${message}
        </p>

        `

      });


    console.log(
      "RESEND RESPONSE:",
      JSON.stringify(
        emailResult,
        null,
        2
      )
    );


    return NextResponse.json({

      success:true,

      message:
        "Email sent successfully"

    });


  }
  catch(error:any){

    console.error(
      "CONTACT FORM ERROR:",
      error?.message || error
    );


    return NextResponse.json({

      success:false,

      message:
        "Something went wrong"

    },
    {
      status:500
    });

  }

}