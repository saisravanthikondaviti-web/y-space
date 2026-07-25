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


    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        {
          status: 400,
        }
      );
    }


    const apiKey = process.env.RESEND_API_KEY;


    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY is missing"
      );
    }


    const resend = new Resend(apiKey);



    // ===============================
    // EMAIL TO VAI SPACE ADMIN
    // ===============================

    const adminEmail =
      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to: [
          "saisravanthikondaviti@gmail.com",
        ],

        replyTo:
          email,

        subject:
          `🚀 New VAI SPACE Enquiry from ${name}`,


        html: `
        <div style="
          font-family:Arial,sans-serif;
          padding:20px;
          color:#111;
        ">

          <h2>
            New Contact Form Submission
          </h2>


          <p>
            <strong>Name:</strong>
            ${name}
          </p>


          <p>
            <strong>Email:</strong>
            ${email}
          </p>


          <p>
            <strong>Project Type:</strong>
            ${projectType || "Not specified"}
          </p>


          <p>
            <strong>Message:</strong>
          </p>


          <p>
            ${message}
          </p>


        </div>
        `,
      });



    console.log(
      "ADMIN EMAIL SENT:",
      adminEmail
    );




    // ===============================
    // THANK YOU EMAIL TO USER
    // ===============================

    const thankYouEmail =
      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to:[
          email,
        ],

        subject:
          "Thank you for contacting VAI SPACE 🚀",


        html: `
        <div style="
          font-family:Arial,sans-serif;
          padding:25px;
          color:#111;
        ">


          <h2>
            Hi ${name} 👋
          </h2>


          <p>
            Thank you for contacting 
            <strong>VAI SPACE</strong>.
          </p>


          <p>
            We have successfully received
            your enquiry.
          </p>


          <p>
            Our team will review your
            requirements and get back to
            you shortly.
          </p>


          <br/>


          <p>
            Regards,
          </p>


          <p>
            <strong>
              VAI SPACE Team
            </strong>
          </p>


        </div>
        `,
      });



    console.log(
      "THANK YOU EMAIL SENT:",
      thankYouEmail
    );



    // Response returned to frontend

    return NextResponse.json(
      {
        success: true,

        message:
          "Thank you for contacting VAI SPACE. We will get back to you shortly.",
      },
      {
        status:200,
      }
    );


  } catch(error:any) {


    console.error(
      "CONTACT FORM ERROR:",
      error?.message || error
    );


    return NextResponse.json(
      {
        success:false,

        message:
          "Something went wrong. Please try again.",
      },
      {
        status:500,
      }
    );

  }
}