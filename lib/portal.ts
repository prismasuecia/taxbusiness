import {createClient} from '@supabase/supabase-js';

export const portalBucket = 'client-documents';

export type PortalDocument = {
  id: string;
  owner_id: string;
  uploader_email: string | null;
  customer_name: string | null;
  company_name: string | null;
  file_name: string;
  file_path: string;
  file_size: number | null;
  content_type: string | null;
  document_type: string | null;
  period: string | null;
  created_at: string;
};

export function hasPortalConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function createPortalClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
}
