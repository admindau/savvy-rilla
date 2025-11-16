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

    // -------- 2) CONFIRMATION EMAIL TO THE SENDER --------
    let confirmationError: unknown = null;

    try {
      const confirmationSubject = 'We’ve received your message – Savvy Gorilla Technologies';

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
      });
    } catch (err) {
      confirmationError = err;
      console.error('Error sending confirmation email:', err);
      // We don’t fail the whole request if the confirmation email fails.
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
