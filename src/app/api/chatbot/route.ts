import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

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
        },
      );
    }

    const resend = new Resend(apiKey);

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
    // EMAIL TO VAISPACE TEAM
    // ==================================

    const adminResult = await resend.emails.send({
      from: "VAISPACE <onboarding@resend.dev>",

      to: "saisravanthikondaviti@gmail.com",

      replyTo: email,

      subject: `🤖 New Chatbot Lead - ${name}`,

      html: `

<div style="
font-family:Arial,Helvetica,sans-serif;
background:#f5f7ff;
padding:30px;
">


<!-- Banner -->

<div style="
background:linear-gradient(
135deg,
#616CFA,
#E46ECC
);
padding:35px;
border-radius:18px;
text-align:center;
color:white;
">

<h1>
VAISPACE
</h1>

<p>
New Chatbot Conversation
</p>

</div>



<!-- Details Card -->

<div style="
background:white;
padding:30px;
margin-top:25px;
border-radius:18px;
">


<h2>
Client Details
</h2>


<p>
<strong>Name:</strong>
${name || "Not provided"}
</p>


<p>
<strong>Email:</strong>
${email || "Not provided"}
</p>


<p>
<strong>Phone:</strong>
${phone || "Not provided"}
</p>



<p>
<strong>Interested Service:</strong>
${service || "Not provided"}
</p>



<p>
<strong>Project:</strong>
${project || "Not provided"}
</p>



<p>
<strong>Timeline:</strong>
${timeline || "Not provided"}
</p>



<p>
<strong>Budget:</strong>
${budget || "Not provided"}
</p>



</div>





<!-- Chat Conversation -->

<div style="
background:white;
padding:30px;
margin-top:20px;
border-radius:18px;
">


<h2>
Chatbot Conversation
</h2>


<div style="
background:#f5f7ff;
padding:20px;
border-radius:12px;
white-space:pre-line;
">

${conversation || "No conversation history"}

</div>


</div>




<div style="
text-align:center;
padding:20px;
color:#777;
font-size:13px;
">

© ${new Date().getFullYear()} VAISPACE

</div>


</div>

`,
    });

    console.log("ADMIN RESULT:", adminResult);

    // ==================================
    // THANK YOU EMAIL TO USER
    // ==================================

    const userResult = await resend.emails.send({
      from: "VAISPACE <onboarding@resend.dev>",

      to: email,

      subject: "Thank you for contacting VAISPACE 🚀",

      html: `

<div style="
font-family:Arial,Helvetica,sans-serif;
background:#f5f7ff;
padding:30px;
">


<!-- Banner -->

<div style="
background:linear-gradient(
135deg,
#616CFA,
#E46ECC
);
padding:40px;
border-radius:18px;
text-align:center;
color:white;
">


<h1>
VAISPACE
</h1>


<p>
Where Strategy Meets Creative Instinct
</p>


</div>





<div style="
background:white;
padding:35px;
margin-top:25px;
border-radius:18px;
">


<h2>
Hi ${name || "there"} 👋
</h2>



<p>
Thank you for connecting with
<strong>
VAISPACE
</strong>.
</p>



<p>
We have received your project enquiry
through our AI assistant.
</p>



<div style="
background:#f5f7ff;
padding:20px;
border-radius:12px;
margin:25px 0;
">


<p>
<strong>
Service:
</strong>

${service || "Your requirement"}

</p>



<p>
<strong>
Project:
</strong>

${project || "Not specified"}

</p>



</div>




<p>
Our team will review your requirements
and contact you shortly.
</p>





<div style="
text-align:center;
margin:30px 0;
">


<a href="https://vaispace.vercel.app"
style="
background:#616CFA;
color:white;
padding:15px 30px;
border-radius:30px;
text-decoration:none;
font-weight:bold;
">

Visit VAISPACE

</a>


</div>




<p>
Regards,
<br/>

<strong>
VAISPACE Team
</strong>

</p>


</div>




<div style="
text-align:center;
font-size:13px;
color:#777;
padding:20px;
">

© ${new Date().getFullYear()} VAISPACE

</div>



</div>

`,
    });

    console.log("USER RESULT:", userResult);

    return NextResponse.json({
      success: true,

      message:
        "Thank you for contacting VAISPACE. Our team will get back to you shortly.",
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
      },
    );
  }
}
