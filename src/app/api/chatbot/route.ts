import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing.");

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

    const data = await req.json();

// ==========================
// Email to VAISPACE
// ==========================
const adminResult = await resend.emails.send({
  from: "VAISPACE <onboarding@resend.dev>",
  to: "saisravanthikondaviti@gmail.com",
  replyTo: data.email,
  subject: `New VAISPACE Inquiry from ${data.name}`,
  html: `
    <h2>New Client Inquiry</h2>

    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Service:</strong> ${data.service}</p>
    <p><strong>Project:</strong> ${data.project}</p>
    <p><strong>Additional Details:</strong> ${data.projectDetails}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "Not Provided"}</p>
    <p><strong>Timeline:</strong> ${data.timeline}</p>
  `,
});

console.log("Admin Result:", adminResult);

// ==========================
// Confirmation Email to User
// ==========================
console.log("User email:", data.email);

const userResult = await resend.emails.send({
  from: "VAISPACE <onboarding@resend.dev>",
  to: data.email,
  subject: "Thank you for contacting VAISPACE",
  html: `
    <!-- Your existing HTML goes here -->
  `,
});

console.log("User Result:", userResult);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Chatbot Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
      },
      {
        status: 500,
      }
    );
  }
}