// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseServerClient } from '@/lib/supabase';

const resendApiKey = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_INBOX_EMAIL;
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || CONTACT_TO;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function buildConfirmationHtml({
  name,
  organisation,
  type,
  message,
}: {
  name: string;
  organisation?: string | null;
  type?: string | null;
  message: string;
}) {
  const safeMessage = message
    .split("\n")
    .map((line) => line.trim())
    .join("<br />");

  return `
  <!DOCTYPE html>
  <html lang="en">
  <body style="background:#000;color:#fff;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:560px;margin:auto;background:#0a0a0a;border:1px solid #262626;padding:24px;border-radius:16px;">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">SAVVY GORILLA</div>
      <div style="font-size:11px;letter-spacing:0.22em;margin-bottom:20px;">TECHNOLOGIES</div>

      <h1 style="font-size:20px;font-weight:700;">We’ve received your message</h1>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to <strong>Savvy Gorilla Technologies</strong>. This confirms that we received your message.</p>

      <h3 style="margin-top:24px;font-size:13px;text-transform:uppercase;letter-spacing:0.16em;color:#a3a3a3;">Summary</h3>
      <div style="background:#000;border:1px solid #333;padding:16px;border-radius:12px;">
        <p><strong>Name:</strong> ${name}</p>
        ${organisation ? `<p><strong>Organisation:</strong> ${organisation}</p>` : ""}
        ${type ? `<p><strong>Type of work:</strong> ${type}</p>` : ""}
        <p><strong>Message:</strong><br/>${safeMessage}</p>
      </div>

      <p style="margin-top:32px;font-size:12px;color:#aaa;">
        Savvy Gorilla Technologies · Juba, South Sudan · savvyrilla.tech
      </p>
    </div>
  </body>
  </html>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, organisation, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // 🔥 DEBUG LOG — we keep this temporarily
    console.log("CONTACT FORM SUBMITTED:", {
      name,
      email,
      organisation,
      type,
      message,
    });

    // -----------------------------------------
    // 1️⃣ LOG TO SUPABASE
    // -----------------------------------------
    let dbLogged = false;
    let dbError: any = null;

    try {
      const supabase = getSupabaseServerClient();

      if (supabase) {
        console.log("SUPABASE READY — inserting...");

        const { error } = await supabase.from("contact_messages").insert({
          name,
          email,
          organisation,
          type,
          message,
          user_agent: req.headers.get("user-agent"),
        });

        if (error) throw error;

        dbLogged = true;
        console.log("SUPABASE INSERT SUCCESS");
      } else {
        console.log("Supabase not available — skipping DB log.");
      }
    } catch (err) {
      dbError = err;
      console.error("SUPABASE INSERT ERROR:", err);
    }

    // -----------------------------------------
    // 2️⃣ EMAIL INTERNAL
    // -----------------------------------------
    if (resend && CONTACT_TO && CONTACT_FROM) {
      await resend.emails.send({
        from: `Savvy Gorilla Contact <${CONTACT_FROM}>`,
        to: [CONTACT_TO],
        replyTo: email,
        subject: `New contact form submission – ${name}`,
        text: `
Name: ${name}
Email: ${email}
Organisation: ${organisation || ""}
Type: ${type || ""}
Message:
${message}
        `,
      });

      // -----------------------------------------
      // 3️⃣ EMAIL CONFIRMATION TO USER
      // -----------------------------------------
      await resend.emails.send({
        from: `Savvy Gorilla Contact <${CONTACT_FROM}>`,
        to: [email],
        subject: "We’ve received your message – Savvy Gorilla Technologies",
        replyTo: CONTACT_TO,
        html: buildConfirmationHtml({ name, organisation, type, message }),
      });
    }

    return NextResponse.json({
      ok: true,
      supabase_logged: dbLogged,
      supabase_error: dbError ? dbError.message : null,
    });
  } catch (err) {
    console.error("CONTACT ROUTE ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
