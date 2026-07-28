import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Escape user-provided content before inserting it into HTML
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    // =========================================================
    // HOSTINGER SMTP CONFIGURATION
    // =========================================================

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASS;

    // =========================================================
    // CHECK SMTP ENVIRONMENT VARIABLES
    // =========================================================

    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error("Hostinger SMTP environment variables are missing");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    // =========================================================
    // READ FORM DATA
    // =========================================================

    const data = await req.json();

    console.log("CONTACT DATA:", data);

    const { name, email, projectType, message } = data;

    // =========================================================
    // BASIC VALIDATION
    // =========================================================

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        {
          status: 400,
        },
      );
    }

    // =========================================================
    // ESCAPE USER DATA
    // =========================================================

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    // =========================================================
    // CREATE HOSTINGER SMTP TRANSPORTER
    // =========================================================

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,

      // Port 465 = SSL
      // Port 587 = STARTTLS
      secure: smtpPort === 465,

      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // =========================================================
    // VERIFY SMTP CONNECTION
    // =========================================================

    await transporter.verify();

    console.log("Hostinger SMTP connection successful");

    // =========================================================
    // EMAIL 1
    // SEND INQUIRY TO VAISPACE
    // =========================================================

    const adminResult = await transporter.sendMail({
      from: `"VAISPACE" <${smtpUser}>`,

      to: "contact@vaispace.com",

      // When you click Reply in Hostinger,
      // the reply goes directly to the customer.
      replyTo: email,

      subject: `🚀 New VAISPACE Inquiry from ${name}`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New VAISPACE Inquiry</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f5f7ff;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <div
    style="
      padding:30px 15px;
      background:#f5f7ff;
    "
  >

    <!-- Main Container -->
    <div
      style="
        max-width:650px;
        margin:0 auto;
      "
    >

        <!-- ================================== -->
<!-- BANNER -->
<!-- ================================== -->

<div
  style="
    text-align:center;
    border-radius:18px;
    overflow:hidden;
  "
>
  <img
    src="cid:banner"
    alt="VAISPACE Banner"
    style="
      width:100%;
      max-width:600px;
      height:auto;
      display:block;
      border-radius:18px;
    "
  />
</div>

      <!-- Client Details -->
      <div
        style="
          background:white;
          padding:30px;
          margin-top:25px;
          border-radius:18px;
          box-shadow:0 5px 25px rgba(0,0,0,0.05);
        "
      >

        <h2
          style="
            margin-top:0;
            color:#111827;
          "
        >
          Client Details
        </h2>

        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Name:</strong>
          ${safeName}
        </p>

        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Email:</strong>
          ${safeEmail}
        </p>

        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Project Type:</strong>
          ${safeProjectType}
        </p>

        <hr
          style="
            border:none;
            border-top:1px solid #eee;
            margin:25px 0;
          "
        />

        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Project Details:</strong>
        </p>

        <div
          style="
            background:#f5f7ff;
            padding:20px;
            border-radius:12px;
            color:#444;
            line-height:1.7;
          "
        >
          ${safeMessage}
        </div>

      </div>

      <!-- Reply Reminder -->
      <div
        style="
          background:#ffffff;
          padding:20px 25px;
          margin-top:20px;
          border-radius:14px;
          text-align:center;
        "
      >

        <p
          style="
            margin:0;
            color:#555;
            font-size:14px;
          "
        >
          💬 Simply click <strong>Reply</strong> to respond directly
          to ${safeName}.
        </p>

      </div>

      <!-- Footer -->
      <div
        style="
          text-align:center;
          padding:25px 10px;
          color:#777;
          font-size:13px;
        "
      >

        © ${new Date().getFullYear()} VAISPACE

      </div>

    </div>

  </div>

</body>
</html>
      `,
    });

    console.log("ADMIN EMAIL SENT:", adminResult.messageId);

    // =========================================================
    // EMAIL 2
    // SEND THANK YOU EMAIL TO CUSTOMER
    // =========================================================

    const userResult = await transporter.sendMail({
      from: `"VAISPACE" <${smtpUser}>`,

      to: email,

      subject: "Thank you for contacting VAISPACE 🚀",

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You - VAISPACE</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f5f7ff;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <div
    style="
      margin:0;
      padding:30px 15px;
      background:#f5f7ff;
    "
  >

    <!-- Main Container -->
    <div
      style="
        max-width:650px;
        margin:0 auto;
      "
    >

      <!-- Banner -->
      <div
        style="
          background:linear-gradient(135deg,#616CFA,#E46ECC);
          padding:40px 20px;
          border-radius:18px;
          text-align:center;
          color:white;
        "
      >

        <h1
          style="
            margin:0;
            font-size:32px;
            font-weight:700;
          "
        >
          VAISPACE
        </h1>

        <p
          style="
            margin:12px 0 0;
            font-size:15px;
          "
        >
          Where Strategy Meets Creative Instinct
        </p>

      </div>

      <!-- Content -->
      <div
        style="
          background:white;
          margin-top:30px;
          padding:35px;
          border-radius:18px;
          box-shadow:0 5px 25px rgba(0,0,0,0.05);
        "
      >

        <h2
          style="
            margin-top:0;
            color:#111827;
          "
        >
          Hi ${safeName} 👋
        </h2>

        <p
          style="
            color:#444;
            line-height:1.7;
            font-size:15px;
          "
        >
          Thank you for contacting
          <strong>VAISPACE</strong>.
        </p>

        <p
          style="
            color:#444;
            line-height:1.7;
            font-size:15px;
          "
        >
          We have successfully received your enquiry
          for:
        </p>

        <!-- Project Type -->
        <div
          style="
            background:#f5f7ff;
            padding:18px;
            border-radius:12px;
            margin:20px 0;
            text-align:center;
          "
        >

          <h3
            style="
              margin:0;
              color:#616CFA;
              font-size:20px;
            "
          >
            ${safeProjectType}
          </h3>

        </div>

        <!-- Message -->
        <div
          style="
            background:#f5f7ff;
            padding:20px;
            border-radius:12px;
            margin:20px 0;
          "
        >

          <p
            style="
              margin-top:0;
              color:#333;
            "
          >
            <strong>Your message:</strong>
          </p>

          <p
            style="
              color:#555;
              line-height:1.7;
              margin-bottom:0;
            "
          >
            ${safeMessage}
          </p>

        </div>

        <p
          style="
            color:#444;
            line-height:1.7;
            font-size:15px;
          "
        >
          Our team will review your requirements
          and get back to you shortly.
        </p>

        <!-- Website Button -->
        <div
          style="
            text-align:center;
            margin:30px 0;
          "
        >

          <a
            href="https://vaispace.vercel.app"
            style="
              display:inline-block;
              background:#616CFA;
              color:white;
              padding:14px 30px;
              border-radius:30px;
              text-decoration:none;
              font-weight:bold;
            "
          >
            Visit VAISPACE
          </a>

        </div>

        <p
          style="
            color:#444;
            line-height:1.7;
          "
        >
          Regards,
          <br />
          <strong>VAISPACE Team</strong>
        </p>

      </div>

      <!-- Footer -->
      <div
        style="
          text-align:center;
          padding:25px 10px;
          font-size:13px;
          color:#777;
        "
      >

        © ${new Date().getFullYear()} VAISPACE.
        All rights reserved.

      </div>

    </div>

  </div>

</body>
</html>
      `,
    });

    console.log("USER EMAIL SENT:", userResult.messageId);

    // =========================================================
    // SUCCESS RESPONSE
    // =========================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting VAISPACE. We will get back to you shortly.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    // =========================================================
    // ERROR HANDLING
    // =========================================================

    console.error("Contact Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
}