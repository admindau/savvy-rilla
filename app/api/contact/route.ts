import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServerClient } from "@/lib/supabase";

const resendApiKey = process.env.RESEND_API_KEY;
const contactTo = process.env.CONTACT_INBOX_EMAIL;
const contactFrom = process.env.CONTACT_FROM_EMAIL || contactTo;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const requestLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const ALLOWED_TYPES = new Set([
  "product",
  "partnership",
  "build",
  "media",
  "other",
]);
const RESPONSE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    requestLog.set(key, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(key, recent);

  if (requestLog.size > 1_000) {
    for (const [loggedKey, timestamps] of requestLog) {
      if (!timestamps.some((timestamp) => now - timestamp < WINDOW_MS)) {
        requestLog.delete(loggedKey);
      }
    }
  }

  return false;
}

function buildConfirmationHtml({
  name,
  organisation,
  type,
  message,
}: {
  name: string;
  organisation: string;
  type: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeOrganisation = escapeHtml(organisation);
  const safeType = escapeHtml(type);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return `<!doctype html>
  <html lang="en">
    <body style="margin:0;background:#080908;color:#f4f5ef;padding:32px;font-family:Arial,Helvetica,sans-serif">
      <div style="max-width:580px;margin:auto;background:#101210;border:1px solid #2b2f2b;padding:32px">
        <p style="margin:0 0 28px;color:#c9ff58;font-size:11px;letter-spacing:.18em;text-transform:uppercase">Savvy Rilla Technologies™</p>
        <h1 style="margin:0 0 18px;font-size:25px">We received your message.</h1>
        <p style="color:#b8beb6;line-height:1.7">Hi ${safeName}, thank you for reaching out. A member of the Savvy Rilla team will review your note and respond with the right next step.</p>
        <div style="margin-top:26px;padding:20px;background:#080908;border:1px solid #2b2f2b;color:#b8beb6;line-height:1.65">
          ${safeOrganisation ? `<p><strong style="color:#f4f5ef">Organisation:</strong> ${safeOrganisation}</p>` : ""}
          ${safeType ? `<p><strong style="color:#f4f5ef">Topic:</strong> ${safeType}</p>` : ""}
          <p><strong style="color:#f4f5ef">Message:</strong><br />${safeMessage}</p>
        </div>
        <p style="margin-top:30px;color:#737a72;font-size:12px">Savvy Rilla Technologies™ · Juba, South Sudan · savvyrilla.tech</p>
      </div>
    </body>
  </html>`;
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Please submit the contact form." },
        { status: 415, headers: RESPONSE_HEADERS },
      );
    }

    if (request.headers.get("sec-fetch-site") === "cross-site") {
      return NextResponse.json(
        { ok: false, error: "Cross-site requests are not accepted." },
        { status: 403, headers: RESPONSE_HEADERS },
      );
    }

    const ip =
      request.headers.get("cf-connecting-ip")?.trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many messages. Please try again shortly." },
        {
          status: 429,
          headers: { ...RESPONSE_HEADERS, "Retry-After": "600" },
        },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const name = readString(body.name, 100);
    const email = readString(body.email, 180).toLowerCase();
    const organisation = readString(body.organisation, 160);
    const type = readString(body.type, 80);
    const message = readString(body.message, 3000);
    const website = readString(body.website, 200);

    if (website) {
      return NextResponse.json({ ok: true }, { headers: RESPONSE_HEADERS });
    }

    if (
      name.length < 2 ||
      message.length < 10 ||
      !ALLOWED_TYPES.has(type) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please provide a valid name, email, topic, and message.",
        },
        { status: 400, headers: RESPONSE_HEADERS },
      );
    }

    let stored = false;
    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        organisation: organisation || null,
        type: type || null,
        message,
        user_agent: request.headers.get("user-agent"),
      });

      stored = !error;

      if (error) {
        console.error("Contact storage failed:", error.message);
      }
    }

    let emailed = false;

    if (resend && contactTo && contactFrom) {
      const internal = await resend.emails.send({
        from: `Savvy Rilla Contact <${contactFrom}>`,
        to: [contactTo],
        replyTo: email,
        subject: `New Savvy Rilla enquiry — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Organisation: ${organisation}`,
          `Topic: ${type}`,
          "",
          message,
        ].join("\n"),
      });

      if (internal.error) {
        throw new Error("Email delivery failed");
      }

      const confirmation = await resend.emails.send({
        from: `Savvy Rilla Technologies <${contactFrom}>`,
        to: [email],
        replyTo: contactTo,
        subject: "We received your message — Savvy Rilla Technologies™",
        html: buildConfirmationHtml({
          name,
          organisation,
          type,
          message,
        }),
      });

      emailed = !confirmation.error;
    }

    if (!stored && !emailed) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Messaging is temporarily unavailable. Please email hello@savvyrilla.tech.",
        },
        { status: 503, headers: RESPONSE_HEADERS },
      );
    }

    return NextResponse.json({ ok: true }, { headers: RESPONSE_HEADERS });
  } catch (error) {
    console.error(
      "Contact request failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your message. Please email hello@savvyrilla.tech.",
      },
      { status: 500, headers: RESPONSE_HEADERS },
    );
  }
}
