import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// ==================================
// ESCAPE HTML
// ==================================

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
    // ==================================
    // HOSTINGER SMTP CONFIGURATION
    // ==================================

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASS;

    // ==================================
    // CHECK SMTP CONFIGURATION
    // ==================================

    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error("Hostinger SMTP environment variables are missing.");

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

    // ==================================
    // READ CHATBOT DATA
    // ==================================

    const data = await req.json();

    console.log("CHATBOT DATA:", data);

    const {
      name,
      email,
      phone,
      service,
      project,
      projectDetails,
      timeline,
      budget,
      conversation,
    } = data;

    // ==================================
    // BASIC VALIDATION
    // ==================================

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer email is required.",
        },
        {
          status: 400,
        },
      );
    }

    // ==================================
    // ESCAPE USER DATA
    // ==================================

    const safeName = escapeHtml(name || "Not provided");
    const safeEmail = escapeHtml(email || "Not provided");
    const safePhone = escapeHtml(phone || "Not provided");
    const safeService = escapeHtml(service || "Not provided");
    const safeProject = escapeHtml(project || "Not provided");
    const safeProjectDetails = escapeHtml(projectDetails || "Not provided");
    const safeTimeline = escapeHtml(timeline || "Not provided");
    const safeBudget = escapeHtml(budget || "Not provided");

    const safeConversation = escapeHtml(
      conversation || "No conversation history",
    ).replace(/\n/g, "<br />");

    // ==================================
    // CREATE HOSTINGER SMTP TRANSPORTER
    // ==================================

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

    // ==================================
    // VERIFY SMTP CONNECTION
    // ==================================

    await transporter.verify();

    console.log("Hostinger SMTP connection successful.");

    // ==================================
    // EMAIL TO VAISPACE TEAM
    // ==================================

    const adminResult = await transporter.sendMail({
      from: `"VAISPACE" <${smtpUser}>`,

      to: "contact@vaispace.com",

      // Clicking Reply will reply directly
      // to the customer who submitted the chatbot form.
      replyTo: email,

      subject: `🤖 New Chatbot Lead - ${name || "New Client"}`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>New VAISPACE Chatbot Lead</title>
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

    <div
      style="
        max-width:700px;
        margin:0 auto;
      "
    >
<!-- ================================== -->
<!-- BANNER IMAGE -->
<!-- ================================== -->

<div
  style="
    padding:0;
    border-radius:18px;
    overflow:hidden;
    text-align:center;
  "
>
  <img
    src="https://vaispace.com/images/banner.png"
    alt="VAISPACE"
    style="
      width:100%;
      max-width:700px;
      height:auto;
      display:block;
      border-radius:18px;
    "
  />
</div>

      <!-- ================================== -->
      <!-- CLIENT DETAILS -->
      <!-- ================================== -->

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
          <strong>Phone:</strong>
          ${safePhone}
        </p>


        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Interested Service:</strong>
          ${safeService}
        </p>


        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Project:</strong>
          ${safeProject}
        </p>


        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Project Details:</strong>
          ${safeProjectDetails}
        </p>


        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Timeline:</strong>
          ${safeTimeline}
        </p>


        <p
          style="
            color:#444;
            line-height:1.6;
          "
        >
          <strong>Budget:</strong>
          ${safeBudget}
        </p>

      </div>


      <!-- ================================== -->
      <!-- CHATBOT CONVERSATION -->
      <!-- ================================== -->

      <div
        style="
          background:white;
          padding:30px;
          margin-top:20px;
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
          Chatbot Conversation
        </h2>


        <div
          style="
            background:#f5f7ff;
            padding:20px;
            border-radius:12px;
            color:#444;
            line-height:1.7;
            word-break:break-word;
          "
        >
          ${safeConversation}
        </div>

      </div>


      <!-- ================================== -->
      <!-- REPLY REMINDER -->
      <!-- ================================== -->

      <div
        style="
          background:white;
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
          💬 Simply click <strong>Reply</strong> to respond
          directly to ${safeName}.
        </p>

      </div>


      <!-- ================================== -->
      <!-- FOOTER -->
      <!-- ================================== -->

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

    console.log("ADMIN CHATBOT EMAIL SENT:", adminResult.messageId);

    // ==================================
    // THANK YOU EMAIL TO USER
    // ==================================

    const userResult = await transporter.sendMail({
      from: `"VAISPACE" <${smtpUser}>`,

      to: email,

      subject: "Thank you for contacting VAISPACE 🚀",

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

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
      padding:30px 15px;
      background:#f5f7ff;
    "
  >

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
          background:linear-gradient(
            135deg,
            #616CFA,
            #E46ECC
          );
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


      <!-- ================================== -->
      <!-- CONTENT -->
      <!-- ================================== -->

      <div
        style="
          background:white;
          padding:35px;
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
          Hi ${safeName} 👋
        </h2>


        <p
          style="
            color:#444;
            line-height:1.7;
            font-size:15px;
          "
        >
          Thank you for connecting with
          <strong>VAISPACE</strong>.
        </p>


        <p
          style="
            color:#444;
            line-height:1.7;
            font-size:15px;
          "
        >
          We have received your project enquiry
          through our AI assistant.
        </p>


        <!-- ================================== -->
        <!-- PROJECT SUMMARY -->
        <!-- ================================== -->

        <div
          style="
            background:#f5f7ff;
            padding:20px;
            border-radius:12px;
            margin:25px 0;
          "
        >

          <p
            style="
              margin-top:0;
              color:#444;
            "
          >
            <strong>Service:</strong>
            ${safeService}
          </p>


          <p
            style="
              margin-bottom:0;
              color:#444;
            "
          >
            <strong>Project:</strong>
            ${safeProject}
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
          and contact you shortly.
        </p>


        <!-- ================================== -->
        <!-- WEBSITE BUTTON -->
        <!-- ================================== -->

        <div
          style="
            text-align:center;
            margin:30px 0;
          "
        >

          <a
            href="https://vaispace.com"
            style="
              display:inline-block;
              background:#616CFA;
              color:white;
              padding:15px 30px;
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

          <strong>
            VAISPACE Team
          </strong>

        </p>

      </div>


      <!-- ================================== -->
      <!-- FOOTER -->
      <!-- ================================== -->

      <div
        style="
          text-align:center;
          font-size:13px;
          color:#777;
          padding:20px;
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

    console.log("USER CHATBOT EMAIL SENT:", userResult.messageId);

    // ==================================
    // SUCCESS
    // ==================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting VAISPACE. Our team will get back to you shortly.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Chatbot Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
      },
      {
        status: 500,
      },
    );
  }
}
