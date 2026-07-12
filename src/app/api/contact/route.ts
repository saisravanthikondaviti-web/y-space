import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(apiKey);

    const { name, email, projectType, message } = await req.json();

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    await resend.emails.send({
      from: "vaispace <onboarding@resend.dev>",
      to: ["saisravanthikondaviti@gmail.com"],
      replyTo: email,
      subject: `🚀 New Contact Form Submission from ${name}`,
      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          max-width: 650px;
          margin: auto;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          overflow: hidden;
        ">

          <div style="
            background: linear-gradient(90deg,#616CFA,#E46ECC);
            color: white;
            padding: 24px;
          ">
            <h2 style="margin:0;">New Contact Inquiry</h2>
            <p style="margin:8px 0 0;">
              Submitted through the Auria website.
            </p>
          </div>

          <div style="padding:24px;">

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;"><strong>Name</strong></td>
                <td>${name}</td>
              </tr>

              <tr>
                <td style="padding:10px 0;"><strong>Email</strong></td>
                <td>${email}</td>
              </tr>

              <tr>
                <td style="padding:10px 0;"><strong>Project Type</strong></td>
                <td>${projectType}</td>
              </tr>
            </table>

            <hr style="margin:30px 0;" />

            <h3 style="margin-bottom:12px;">Project Details</h3>

            <div style="
              background:#f8f8f8;
              padding:18px;
              border-radius:10px;
              line-height:1.8;
            ">
              ${message.replace(/\n/g, "<br/>")}
            </div>

          </div>

          <div style="
            padding:20px;
            background:#fafafa;
            color:#666;
            text-align:center;
            font-size:13px;
          ">
            © Auria • Website Contact Form
          </div>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Contact Form Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending the email.",
      },
      {
        status: 500,
      }
    );
  }
}