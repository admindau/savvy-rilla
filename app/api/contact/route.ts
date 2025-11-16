// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_INBOX_EMAIL;
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || CONTACT_TO;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function buildConfirmationHtml(params: {
  name: string;
  organisation?: string | null;
  type?: string | null;
  message: string;
}) {
  const { name, organisation, type, message } = params;

  const safeMessage = message
    .split('\n')
    .map((line) => line.trim())
    .join('<br />');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>We’ve received your message – Savvy Gorilla Technologies</title>
  </head>
  <body style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;padding:24px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#050505;border-radius:16px;border:1px solid #232323;padding:24px;">
            <tr>
              <td align="left" style="padding-bottom:16px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  <div style="width:32px;height:32px;border-radius:999px;background:radial-gradient(circle at 30% 20%,#ffffff 0,#111111 60%);display:inline-block;"></div>
                  <div style="display:inline-block;vertical-align:middle;">
                    <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#a3a3a3;">Savvy Gorilla</div>
                    <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#707070;">Technologies</div>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:12px;">
                <h1 style="margin:0;font-size:20px;line-height:1.3;font-weight:700;color:#ffffff;">
                  We’ve received your message
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:16px;font-size:14px;line-height:1.6;color:#d4d4d4;">
                <p style="margin:0 0 8px 0;">Hi ${name},</p>
                <p style="margin:0 0 8px 0;">
                  Thank you for reaching out to <strong>Savvy Gorilla Technologies</strong>.
                  This is a quick note to confirm that we’ve received your message and will review it.
                </p>
                <p style="margin:0;">
                  We usually respond within a few working days, depending on our studio workload.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:4px;">
                <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#a3a3a3;margin-bottom:4px;">
                  Summary of your message
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#020202;border-radius:12px;border:1px solid #262626;padding:12px 14px;">
                  <tr>
                    <td style="font-size:13px;color:#e5e5e5;padding-bottom:6px;">
                      <strong>Name:</strong> ${name}
                    </td>
                  </tr>
                  ${
                    organisation
                      ? `<tr><td style="font-size:13px;color:#e5e5e5;padding-bottom:6px;"><strong>Organisation / project:</strong> ${organisation}</td></tr>`
                      : ''
                  }
                  ${
                    type
                      ? `<tr><td style="font-size:13px;color:#e5e5e5;padding-bottom:6px;"><strong>Type of work:</strong> ${type}</td></tr>`
                      : ''
                  }
                  <tr>
                    <td style="font-size:13px;color:#e5e5e5;padding-top:4px;">
                      <strong>Message:</strong><br />
                      <span style="display:block;margin-top:4px;color:#d4d4d4;line-height:1.6;">
                        ${safeMessage}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding-top:4px;font-size:12px;line-height:1.6;color:#a3a3a3;">
                <p style="margin:0 0 6px 0;">
                  If anything about your inquiry is urgent or time-sensitive, you can reply directly
                  to this email and let us know.
                </p>
                <p style="margin:0;">
                  Savvy Gorilla Technologies<br />
                  Juba, South Sudan · <a href="https://savvyrilla.tech" style="color:#ffffff;text-decoration:none;">savvyrilla.tech</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, organisation, type, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    // Fallback if email service is not configured (still logs on server)
    if (!resend || !CONTACT_TO || !CONTACT_FROM) {
      console.log('Contact form submission (no email configured):', {
        name,
        email,
        organisation,
        type,
        message,
      });

      return NextResponse.json({
        ok: true,
        fallback: true,
        message:
          'Message received in server logs, but email service is not fully configured.',
      });
    }

    // -------- 1) INTERNAL EMAIL TO SAVVY GORILLA --------
    const internalSubject = `New contact form submission – ${name}`;

    const internalTextLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      organisation ? `Organisation: ${organisation}` : null,
      type ? `Type of work: ${type}` : null,
      '',
      'Message:',
      message,
    ].filter(Boolean);

    await resend.emails.send({
      from: `Savvy Gorilla Contact <${CONTACT_FROM}>`,
      to: [CONTACT_TO],
      replyTo: email,
      subject: internalSubject,
      text: internalTextLines.join('\n'),
    });

    // -------- 2) CONFIRMATION EMAIL TO THE SENDER (HTML + text) --------
    let confirmationError: unknown = null;

    try {
      const confirmationSubject =
        'We’ve received your message – Savvy Gorilla Technologies';

      const confirmationTextLines = [
        `Hi ${name},`,
        '',
        'Thank you for reaching out to Savvy Gorilla Technologies.',
        'This is a quick note to confirm that we’ve received your message and will review it.',
        '',
        'Here is a copy of what you sent:',
        '----------------------------------------',
        `Name: ${name}`,
        organisation ? `Organisation / project: ${organisation}` : null,
        type ? `Type of work: ${type}` : null,
        '',
        'Message:',
        message,
        '----------------------------------------',
        '',
        'We usually respond within a few working days, depending on our studio workload.',
        '',
        'If anything is urgent or time-sensitive, you can reply directly to this email and let us know.',
        '',
        'Savvy Gorilla Technologies',
        'Juba, South Sudan',
        'savvyrilla.tech',
      ].filter(Boolean);

      await resend.emails.send({
        from: `Savvy Gorilla Contact <${CONTACT_FROM}>`,
        to: [email],
        replyTo: CONTACT_TO || CONTACT_FROM,
        subject: confirmationSubject,
        text: confirmationTextLines.join('\n'),
        html: buildConfirmationHtml({
          name,
          organisation,
          type,
          message,
        }),
      });
    } catch (err) {
      confirmationError = err;
      console.error('Error sending confirmation email:', err);
      // Do not fail the whole request if confirmation fails
    }

    return NextResponse.json({
      ok: true,
      confirmationSent: !confirmationError,
    });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong while sending your message.' },
      { status: 500 },
    );
  }
}
