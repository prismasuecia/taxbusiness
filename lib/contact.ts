'use server';

import {contactSchema} from './validations';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const rateLimit = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const windowMs = 60_000;
  const current = (rateLimit.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);
  if (current.length >= 5) return true;
  rateLimit.set(key, [...current, now]);
  return false;
}

function formatBody(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferredLanguage: string;
  helpWith: string[];
  message: string;
}) {
  return `Ny kontaktförfrågan

Namn: ${data.name}
E-post: ${data.email}
Telefon: ${data.phone || '-'}
Företagsnamn: ${data.company || '-'}
Önskat språk: ${data.preferredLanguage}
Behöver hjälp med: ${data.helpWith.join(', ')}
Meddelande:
${data.message}

Skickat från:
taxbusiness.se`;
}

async function sendMail(subject: string, text: string, replyTo: string) {
  const to = process.env.CONTACT_TO_EMAIL ?? 'info@taxbusiness.se';
  const from = process.env.CONTACT_FROM_EMAIL ?? 'noreply@taxbusiness.se';

  if (process.env.RESEND_API_KEY) {
    const {Resend} = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({from, to, subject, text, replyTo});
    return;
  }

  if (process.env.SMTP_HOST) {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS}
        : undefined
    });
    await transporter.sendMail({from, to, subject, text, replyTo});
    return;
  }

  console.info('Contact form submission, email adapter not configured:', {to, subject, text});
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    preferredLanguage: formData.get('preferredLanguage'),
    helpWith: formData.getAll('helpWith'),
    message: formData.get('message'),
    consent: formData.get('consent'),
    website: formData.get('website')
  });

  if (!parsed.success) {
    return {
      status: 'error',
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  if (parsed.data.website) return {status: 'success'};

  const key = parsed.data.email.toLowerCase();
  if (isRateLimited(key)) {
    return {status: 'error', message: 'rateLimit'};
  }

  try {
    await sendMail('Ny förfrågan från Taxbusiness.se', formatBody(parsed.data), parsed.data.email);
    return {status: 'success'};
  } catch (error) {
    console.error('Contact form email failed', error);
    return {status: 'error', message: 'sendError'};
  }
}
