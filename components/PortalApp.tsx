'use client';

import {FormEvent, useEffect, useMemo, useState} from 'react';
import type {ReactNode} from 'react';
import {Download, FileUp, FolderLock, LogOut, RefreshCw, Trash2} from 'lucide-react';
import type {Session, SupabaseClient} from '@supabase/supabase-js';
import {createPortalClient, hasPortalConfig, portalBucket, type PortalDocument} from '@/lib/portal';
import type {Locale} from '@/lib/navigation';

type PortalLabels = {
  eyebrow: string;
  title: string;
  intro: string;
  loginTitle: string;
  loginText: string;
  loginHelp: string;
  email: string;
  password: string;
  login: string;
  createAccount: string;
  accountCreated: string;
  setPasswordTitle: string;
  setPasswordText: string;
  newPassword: string;
  savePassword: string;
  passwordSaved: string;
  fullName: string;
  companyName: string;
  signedInAs: string;
  sendLink: string;
  linkSent: string;
  signOut: string;
  uploadTitle: string;
  uploadText: string;
  chooseFile: string;
  upload: string;
  uploading: string;
  uploadSuccess: string;
  documentsTitle: string;
  empty: string;
  refresh: string;
  adminBadge: string;
  download: string;
  delete: string;
  deleteConfirm: string;
  notConfiguredTitle: string;
  notConfiguredText: string;
  error: string;
};

export function PortalApp({locale, labels}: {locale: Locale; labels: PortalLabels}) {
  const configured = hasPortalConfig();
  const supabase = useMemo(() => createPortalClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileCompany, setProfileCompany] = useState('');

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({data}) => setSession(data.session));
    const {data} = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !session) return;
    void loadDocuments(supabase, session.user.id);
  }, [supabase, session]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setLoading(true);
    setError(null);
    setNotice(null);

    const {error: authError} = await supabase.auth.signInWithPassword({email, password});

    setLoading(false);

    if (authError) {
      setError(labels.error);
    }
  }

  async function handleCreateAccount() {
    if (!supabase) return;

    setLoading(true);
    setError(null);
    setNotice(null);

    const {error: authError} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.href,
        data: {
          locale
        }
      }
    });

    setLoading(false);

    if (authError) {
      setError(labels.error);
      return;
    }

    setNotice(labels.accountCreated);
  }

  async function handleMagicLink() {
    if (!supabase) return;

    setLoading(true);
    setError(null);
    setNotice(null);

    const {error: authError} = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.href,
        data: {
          locale
        }
      }
    });

    setLoading(false);

    if (authError) {
      setError(labels.error);
      return;
    }

    setNotice(labels.linkSent);
  }

  async function handleSetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setLoading(true);
    setError(null);
    setNotice(null);

    const {error: passwordError} = await supabase.auth.updateUser({password: newPassword});

    setLoading(false);

    if (passwordError) {
      setError(labels.error);
      return;
    }

    setNewPassword('');
    setNotice(labels.passwordSaved);
  }

  async function loadDocuments(client: SupabaseClient, userId: string) {
    setError(null);

    const {data: profile} = await client.from('profiles').select('role, display_name, company_name').eq('id', userId).maybeSingle();
    const admin = profile?.role === 'admin';
    setIsAdmin(admin);
    setProfileName(typeof profile?.display_name === 'string' ? profile.display_name : '');
    setProfileCompany(typeof profile?.company_name === 'string' ? profile.company_name : '');

    const query = client.from('documents').select('*').order('created_at', {ascending: false});
    const {data, error: listError} = admin ? await query : await query.eq('owner_id', userId);

    if (listError) {
      return;
    }

    setDocuments((data ?? []) as PortalDocument[]);
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !session) return;

    const form = event.currentTarget;
    const input = form.elements.namedItem('file') as HTMLInputElement | null;
    const nameInput = form.elements.namedItem('customerName') as HTMLInputElement | null;
    const companyInput = form.elements.namedItem('companyName') as HTMLInputElement | null;
    const file = input?.files?.[0];
    const customerName = String(nameInput?.value || '').trim();
    const companyName = String(companyInput?.value || '').trim();
    if (!file || customerName.length < 2) {
      setUploadError(labels.error);
      setUploadSuccess(null);
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `${session.user.id}/${Date.now()}-${safeName}`;

    const {error: storageError} = await supabase.storage.from(portalBucket).upload(path, file, {
      contentType: file.type || 'application/octet-stream',
      upsert: false
    });

    if (storageError) {
      setUploading(false);
      setUploadError(labels.error);
      return;
    }

    const {error: profileError} = await supabase.from('profiles').update({display_name: customerName, company_name: companyName || null}).eq('id', session.user.id);

    if (profileError) {
      setUploading(false);
      setUploadError(labels.error);
      return;
    }

    const {data: insertedDocument, error: insertError} = await supabase.from('documents').insert({
      owner_id: session.user.id,
      uploader_email: session.user.email,
      customer_name: customerName,
      company_name: companyName || null,
      file_name: file.name,
      file_path: path,
      file_size: file.size,
      content_type: file.type || null
    }).select('*').single();

    setUploading(false);

    if (insertError) {
      setUploadError(labels.error);
      return;
    }

    const visibleDocument = insertedDocument ? insertedDocument as PortalDocument : {
      id: path,
      owner_id: session.user.id,
      uploader_email: session.user.email ?? null,
      customer_name: customerName,
      company_name: companyName || null,
      file_name: file.name,
      file_path: path,
      file_size: file.size,
      content_type: file.type || null,
      created_at: new Date().toISOString()
    };

    form.reset();
    setProfileName(customerName);
    setProfileCompany(companyName);
    setDocuments((current) => [visibleDocument, ...current.filter((item) => item.id !== visibleDocument.id)]);
    setUploadSuccess(labels.uploadSuccess);
    void loadDocuments(supabase, session.user.id);
  }

  async function handleDownload(document: PortalDocument) {
    if (!supabase) return;
    const {data, error: signedUrlError} = await supabase.storage.from(portalBucket).createSignedUrl(document.file_path, 60);

    if (signedUrlError || !data?.signedUrl) {
      setUploadError(labels.error);
      return;
    }

    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  }

  async function handleDelete(document: PortalDocument) {
    if (!supabase || !session) return;
    if (!window.confirm(labels.deleteConfirm)) return;

    setDeletingId(document.id);
    setUploadError(null);

    const {error: storageError} = await supabase.storage.from(portalBucket).remove([document.file_path]);

    if (storageError) {
      setDeletingId(null);
      setUploadError(labels.error);
      return;
    }

    const {error: deleteError} = await supabase.from('documents').delete().eq('id', document.id);

    setDeletingId(null);

    if (deleteError) {
      setUploadError(labels.error);
      return;
    }

    setDocuments((current) => current.filter((item) => item.id !== document.id));
  }

  if (!configured || !supabase) {
    return (
      <PortalShell labels={labels}>
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
          <FolderLock className="h-8 w-8 text-copper" aria-hidden="true" />
          <h2 className="mt-6 font-serif text-3xl text-petroleum">{labels.notConfiguredTitle}</h2>
          <p className="mt-4 leading-7 text-ink/68">{labels.notConfiguredText}</p>
        </div>
      </PortalShell>
    );
  }

  if (!session) {
    return (
      <PortalShell labels={labels}>
        <form onSubmit={handleLogin} className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
          <h2 className="font-serif text-3xl text-petroleum">{labels.loginTitle}</h2>
          <p className="mt-3 leading-7 text-ink/68">{labels.loginText}</p>
          <p className="mt-3 text-sm leading-6 text-ink/55">{labels.loginHelp}</p>
          <label className="mt-7 block text-sm font-semibold text-petroleum" htmlFor="portal-email">
            {labels.email}
          </label>
          <input
            id="portal-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/25"
          />
          <label className="mt-5 block text-sm font-semibold text-petroleum" htmlFor="portal-password">
            {labels.password}
          </label>
          <input
            id="portal-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            autoComplete="current-password"
            className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/25"
          />
          {notice ? <p className="mt-4 rounded-2xl bg-petroleum px-4 py-3 text-sm text-white">{notice}</p> : null}
          {error ? <p className="mt-4 rounded-2xl bg-linen px-4 py-3 text-sm text-ink">{error}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-petroleum px-7 py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? '...' : labels.login}
            </button>
            <button
              type="button"
              disabled={loading || password.length < 8 || !email}
              onClick={handleCreateAccount}
              className="rounded-full border border-ink/10 bg-white px-7 py-3 text-sm font-semibold text-petroleum transition hover:border-copper disabled:cursor-not-allowed disabled:opacity-60"
            >
              {labels.createAccount}
            </button>
          </div>
          <button
            type="button"
            disabled={loading || !email}
            onClick={handleMagicLink}
            className="mt-4 text-sm font-semibold text-petroleum underline-offset-4 transition hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          >
            {labels.sendLink}
          </button>
        </form>
      </PortalShell>
    );
  }

  return (
    <PortalShell labels={labels}>
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-petroleum">{labels.uploadTitle}</h2>
              <p className="mt-3 leading-7 text-ink/68">{labels.uploadText}</p>
            </div>
            {isAdmin ? <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-petroleum">{labels.adminBadge}</span> : null}
          </div>
          <p className="mt-5 rounded-2xl bg-paper px-4 py-3 text-sm text-ink/68">
            {labels.signedInAs} <span className="font-semibold text-petroleum">{profileName || session.user.email}</span>
            {profileCompany ? <span> · {profileCompany}</span> : null}
          </p>
          <form onSubmit={handleSetPassword} className="mt-5 rounded-2xl border border-ink/10 bg-paper p-4">
            <h3 className="font-semibold text-petroleum">{labels.setPasswordTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/62">{labels.setPasswordText}</p>
            <label className="mt-4 block text-sm font-semibold text-petroleum" htmlFor="portal-new-password">
              {labels.newPassword}
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="portal-new-password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/25"
              />
              <button
                type="submit"
                disabled={loading || newPassword.length < 8}
                className="shrink-0 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-petroleum transition hover:border-copper disabled:cursor-not-allowed disabled:opacity-60"
              >
                {labels.savePassword}
              </button>
            </div>
          </form>
          <form onSubmit={handleUpload} className="mt-7">
            <label className="block text-sm font-semibold text-petroleum" htmlFor="portal-customer-name">
              {labels.fullName}
            </label>
            <input
              id="portal-customer-name"
              name="customerName"
              type="text"
              defaultValue={profileName}
              required
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/25"
            />
            <label className="mt-5 block text-sm font-semibold text-petroleum" htmlFor="portal-company-name">
              {labels.companyName}
            </label>
            <input
              id="portal-company-name"
              name="companyName"
              type="text"
              defaultValue={profileCompany}
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/25"
            />
            <label className="mt-5 block text-sm font-semibold text-petroleum" htmlFor="portal-file">
              {labels.chooseFile}
            </label>
            <input
              id="portal-file"
              name="file"
              type="file"
              accept=".pdf,image/*,.doc,.docx,.xls,.xlsx,.csv"
              required
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-petroleum file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            {uploadError ? <p className="mt-4 rounded-2xl bg-linen px-4 py-3 text-sm text-ink">{uploadError}</p> : null}
            {uploadSuccess ? <p className="mt-4 rounded-2xl bg-petroleum px-4 py-3 text-sm text-white">{uploadSuccess}</p> : null}
            <button
              type="submit"
              disabled={uploading}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-petroleum px-7 py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-70"
            >
              <FileUp className="h-4 w-4" aria-hidden="true" />
              {uploading ? labels.uploading : labels.upload}
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-3xl text-petroleum">{labels.documentsTitle}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => loadDocuments(supabase, session.user.id)}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-petroleum"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {labels.refresh}
              </button>
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-petroleum"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                {labels.signOut}
              </button>
            </div>
          </div>
          <div className="mt-6 divide-y divide-ink/10">
            {documents.length === 0 ? <p className="py-6 text-ink/62">{labels.empty}</p> : null}
            {documents.map((document) => (
              <article key={document.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-petroleum">{document.file_name}</h3>
                  <p className="mt-1 text-sm text-ink/55">
                    {new Intl.DateTimeFormat(locale === 'sv' ? 'sv-SE' : locale === 'es' ? 'es-ES' : 'en-GB', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    }).format(new Date(document.created_at))}
                    {isAdmin && document.uploader_email
                      ? ` · ${document.company_name ? `${document.company_name} · ` : ''}${document.customer_name ? `${document.customer_name} · ` : ''}${document.uploader_email}`
                      : ''}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(document)}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-petroleum"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {labels.download}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(document)}
                    disabled={deletingId === document.id}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-petroleum transition hover:border-red-900/30 hover:text-red-900 disabled:cursor-wait disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    {labels.delete}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

function PortalShell({labels, children}: {labels: PortalLabels; children: ReactNode}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-copper">{labels.eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-petroleum md:text-5xl">{labels.title}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/72">{labels.intro}</p>
      </div>
      {children}
    </main>
  );
}
