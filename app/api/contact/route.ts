// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_INBOX_EMAIL;
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || CONTACT_TO;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

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

    const subject = `New contact form submission – ${name}`;

    const textLines = [
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
      subject,
      text: textLines.join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong while sending your message.' },
      { status: 500 },
    );
  }
}
