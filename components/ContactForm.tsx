'use client';

import {FormEvent, useState} from 'react';
import type {Locale} from '@/lib/navigation';

export function ContactForm({
  locale,
  labels,
  options
}: {
  locale: Locale;
  labels: {
    name: string;
    email: string;
    phone: string;
    company: string;
    preferredLanguage: string;
    helpWith: string;
    message: string;
    consent: string;
    privacy: string;
    success: string;
    error: string;
    rateLimit: string;
    required: string;
    send: string;
  };
  options: string[];
}) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const alertMessage = status === 'success' ? labels.success : status === 'error' ? labels.error : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const helpWith = formData.getAll('helpWith').map(String);
    const consent = formData.get('consent') === 'on';

    const nextErrors = {
      name: name.length < 2,
      email: !email.includes('@'),
      message: message.length < 10,
      helpWith: helpWith.length === 0,
      consent: !consent
    };
    setFieldErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus('error');
      return;
    }

    setPending(true);
    const phone = String(formData.get('phone') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const preferredLanguage = String(formData.get('preferredLanguage') || locale);
    const subject = 'Ny förfrågan från Tax Business Stockholm AB';
    const body = [
      'Ny kontaktförfrågan',
      '',
      `Namn: ${name}`,
      `E-post: ${email}`,
      `Telefon: ${phone || '-'}`,
      `Företagsnamn: ${company || '-'}`,
      `Önskat språk: ${preferredLanguage}`,
      `Behöver hjälp med: ${helpWith.join(', ')}`,
      'Meddelande:',
      message,
      '',
      'Skickat från:',
      'taxbusiness.se'
    ].join('\n');

    window.location.href = `mailto:info@taxbusiness.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('success');
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft md:p-8" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {alertMessage ? (
        <div
          className={`mb-6 rounded-2xl px-4 py-3 text-sm ${
                status === 'success' ? 'bg-petroleum text-white' : 'bg-linen text-ink'
          }`}
          role="status"
        >
          {alertMessage}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field name="name" label={labels.name} error={fieldErrors.name ? labels.required : undefined} required />
        <Field name="email" type="email" label={labels.email} error={fieldErrors.email ? labels.required : undefined} required />
        <Field name="phone" label={labels.phone} />
        <Field name="company" label={labels.company} />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold text-petroleum">{labels.preferredLanguage}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ['sv', 'Svenska'],
            ['es', 'Español'],
            ['en', 'English']
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-3 rounded-2xl border border-ink/10 px-4 py-3 text-sm">
              <input className="h-4 w-4 accent-petroleum" type="radio" name="preferredLanguage" value={value} defaultChecked={value === locale} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold text-petroleum">{labels.helpWith}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-3 rounded-2xl border border-ink/10 px-4 py-3 text-sm">
              <input className="h-4 w-4 accent-petroleum" type="checkbox" name="helpWith" value={option} />
              {option}
            </label>
          ))}
        </div>
        {fieldErrors.helpWith ? <p className="mt-2 text-sm text-red-900">{labels.required}</p> : null}
      </fieldset>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-petroleum" htmlFor="message">
          {labels.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          className="w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/25"
        />
        {fieldErrors.message ? (
          <p className="mt-2 text-sm text-red-900" id="message-error">
            {labels.required}
          </p>
        ) : null}
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-ink/72">
        <input className="mt-1 h-4 w-4 accent-petroleum" type="checkbox" name="consent" required />
        <span>{labels.consent}</span>
      </label>
      {fieldErrors.consent ? <p className="mt-2 text-sm text-red-900">{labels.required}</p> : null}
      <p className="mt-3 text-sm text-ink/52">{labels.privacy}</p>

      <button
        type="submit"
        disabled={pending}
        className="mt-7 rounded-full bg-petroleum px-7 py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
      >
        {pending ? '...' : labels.send}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  error
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-petroleum" htmlFor={name}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/25"
      />
      {error ? (
        <p className="mt-2 text-sm text-red-900" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
