import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");

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


    console.log(
      "CONTACT DATA:",
      data
    );


    // Matching your contact form
    const {
      name,
      email,
      projectType,
      message,
    } = data;



    // ==========================
    // EMAIL TO VAISPACE
    // ==========================

const adminResult = await resend.emails.send({
  from: "VAISPACE <noreply@vaispace.com>",
  to: "saisravanthikondaviti@gmail.com",
  subject: "TEST RESEND TO GMAIL",
  html: `
    <h1>Resend Test</h1>
    <p>This is a test email from Resend.</p>
  `,
});

console.log("ADMIN RESULT:", adminResult);



    // ==========================
    // THANK YOU EMAIL TO USER
    // ==========================


    const userResult =
      await resend.emails.send({

        from:
          "VAISPACE <noreply@vaispace.com>",


        to:
          email,


        subject:
          "Thank you for contacting VAISPACE 🚀",



        html: `

<div style="
margin:0;
padding:30px;
background:#f5f7ff;
font-family:Arial,Helvetica,sans-serif;
">


<!-- Banner -->


<div style="
background:linear-gradient(
135deg,
#616CFA,
#E46ECC
);
padding:40px 20px;
border-radius:18px;
text-align:center;
color:white;
">


<h1 style="
margin:0;
font-size:32px;
">
VAISPACE
</h1>


<p>
Where Strategy Meets Creative Instinct
</p>


</div>





<!-- Content -->


<div style="
background:white;
max-width:600px;
margin:30px auto;
padding:35px;
border-radius:18px;
">


<h2>
Hi ${name} 👋
</h2>


<p>
Thank you for contacting
<strong>
VAISPACE
</strong>.
</p>



<p>
We have successfully received your enquiry
for:
</p>



<h3 style="
color:#616CFA;
">

${projectType}

</h3>



<div style="
background:#f5f7ff;
padding:20px;
border-radius:12px;
margin:20px 0;
">


<p>
<strong>
Your message:
</strong>
</p>


<p>
${message}
</p>


</div>




<p>
Our team will review your requirements
and get back to you shortly.
</p>




<div style="
text-align:center;
margin:30px 0;
">


<a href="https://vaispace.vercel.app"
style="
background:#616CFA;
color:white;
padding:14px 30px;
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
padding:20px;
font-size:13px;
color:#777;
">

© ${new Date().getFullYear()} VAISPACE.
All rights reserved.

</div>



</div>

`,
      });



    console.log(
      "User Result:",
      userResult
    );




    return NextResponse.json(
      {
        success:true,

        message:
        "Thank you for contacting VAISPACE. We will get back to you shortly.",
      },
      {
        status:200,
      }
    );


  } catch(error) {


    console.error(
      "Contact Route Error:",
      error
    );


    return NextResponse.json(
      {
        success:false,

        message:
        "Failed to send email.",
      },
      {
        status:500,
      }
    );

  }
}