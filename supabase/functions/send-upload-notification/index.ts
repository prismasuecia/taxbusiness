import {serve} from 'https://deno.land/std@0.224.0/http/server.ts';
import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.49.8';

type DocumentRow = {
  id: string;
  owner_id: string;
  uploader_email: string | null;
  customer_name: string | null;
  company_name: string | null;
  file_name: string;
  file_size: number | null;
  content_type: string | null;
  document_type: string | null;
  period: string | null;
  created_at: string;
};

type ProfileRow = {
  role: 'client' | 'admin';
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', {headers: corsHeaders});
  }

  if (request.method !== 'POST') {
    return jsonResponse({error: 'Method not allowed'}, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const toEmail = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') ?? 'info@taxbusiness.se';
  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'Taxbusiness Kundportal <noreply@portal.taxbusiness.se>';
  const replyToEmail = Deno.env.get('REPLY_TO_EMAIL') ?? 'info@taxbusiness.se';

  if (!supabaseUrl || !anonKey || !serviceRoleKey || !resendApiKey) {
    return jsonResponse({error: 'Function is not configured'}, 500);
  }

  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return jsonResponse({error: 'Missing authorization token'}, 401);
  }

  let documentId = '';
  try {
    const body = await request.json();
    documentId = typeof body.document_id === 'string' ? body.document_id : '';
  } catch {
    return jsonResponse({error: 'Invalid JSON body'}, 400);
  }

  if (!documentId) {
    return jsonResponse({error: 'Missing document_id'}, 400);
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const {data: authData, error: authError} = await authClient.auth.getUser();
  const user = authData?.user;

  if (authError || !user) {
    return jsonResponse({error: 'Invalid authorization token'}, 401);
  }

  const {data: profile} = await adminClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle<ProfileRow>();
  const isAdmin = profile?.role === 'admin';

  const {data: document, error: documentError} = await adminClient
    .from('documents')
    .select('id, owner_id, uploader_email, customer_name, company_name, file_name, file_size, content_type, document_type, period, created_at')
    .eq('id', documentId)
    .maybeSingle<DocumentRow>();

  if (documentError || !document) {
    await logAttempt(adminClient, documentId, user.id, 'notification_failed', undefined, 'Document not found');
    return jsonResponse({error: 'Document not found'}, 404);
  }

  if (document.owner_id !== user.id && !isAdmin) {
    await logAttempt(adminClient, document.id, user.id, 'notification_failed', undefined, 'Forbidden');
    return jsonResponse({error: 'Forbidden'}, 403);
  }

  const companyName = document.company_name || 'Okänt företag';
  const subject = `Nytt dokument uppladdat – ${companyName}`;
  const uploadedAt = new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Stockholm'
  }).format(new Date(document.created_at));

  const text = [
    'Ett nytt dokument har laddats upp i kundportalen.',
    '',
    `Kund: ${document.customer_name || '-'}`,
    `Företag: ${companyName}`,
    `E-post: ${document.uploader_email || '-'}`,
    `Filnamn: ${document.file_name}`,
    `Filstorlek: ${formatFileSize(document.file_size)}`,
    `Dokumenttyp: ${document.document_type || document.content_type || '-'}`,
    `Period: ${document.period || '-'}`,
    `Tidpunkt: ${uploadedAt}`,
    '',
    'Logga in i adminpanelen för att granska dokumentet.'
  ].join('\n');

  const html = `
    <p>Ett nytt dokument har laddats upp i kundportalen.</p>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Kund:</strong></td><td>${escapeHtml(document.customer_name || '-')}</td></tr>
      <tr><td><strong>Företag:</strong></td><td>${escapeHtml(companyName)}</td></tr>
      <tr><td><strong>E-post:</strong></td><td>${escapeHtml(document.uploader_email || '-')}</td></tr>
      <tr><td><strong>Filnamn:</strong></td><td>${escapeHtml(document.file_name)}</td></tr>
      <tr><td><strong>Filstorlek:</strong></td><td>${escapeHtml(formatFileSize(document.file_size))}</td></tr>
      <tr><td><strong>Dokumenttyp:</strong></td><td>${escapeHtml(document.document_type || document.content_type || '-')}</td></tr>
      <tr><td><strong>Period:</strong></td><td>${escapeHtml(document.period || '-')}</td></tr>
      <tr><td><strong>Tidpunkt:</strong></td><td>${escapeHtml(uploadedAt)}</td></tr>
    </table>
    <p>Logga in i adminpanelen för att granska dokumentet.</p>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: replyToEmail,
        subject,
        text,
        html
      })
    });
    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      const message = typeof resendData?.message === 'string' ? resendData.message : `Resend HTTP ${resendResponse.status}`;
      await logAttempt(adminClient, document.id, user.id, 'notification_failed', undefined, message);
      return jsonResponse({error: 'Notification failed'}, 502);
    }

    const providerMessageId = typeof resendData?.id === 'string' ? resendData.id : undefined;
    await logAttempt(adminClient, document.id, user.id, 'notification_sent', providerMessageId);
    return jsonResponse({ok: true, provider_message_id: providerMessageId});
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Resend error';
    await logAttempt(adminClient, document.id, user.id, 'notification_failed', undefined, message);
    return jsonResponse({error: 'Notification failed'}, 502);
  }
});

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}

async function logAttempt(
  client: ReturnType<typeof createClient>,
  documentId: string | null,
  userId: string | null,
  status: 'notification_sent' | 'notification_failed',
  providerMessageId?: string,
  errorMessage?: string
) {
  await client.from('notification_attempts').insert({
    document_id: documentId,
    user_id: userId,
    channel: 'email',
    status,
    provider: 'resend',
    provider_message_id: providerMessageId ?? null,
    error_message: errorMessage ?? null
  });
}

function formatFileSize(bytes: number | null) {
  if (bytes === null) return '-';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
