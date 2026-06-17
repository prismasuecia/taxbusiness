create extension if not exists pg_net with schema extensions;

create or replace function public.notify_document_upload()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  perform net.http_post(
    url := 'https://formsubmit.co/ajax/info@taxbusiness.se',
    headers := '{"Content-Type":"application/json","Accept":"application/json"}'::jsonb,
    body := jsonb_build_object(
      '_subject', 'Nytt dokument uppladdat i kundportalen',
      '_template', 'table',
      '_captcha', 'false',
      '_honey', '',
      '_replyto', coalesce(new.uploader_email, 'info@taxbusiness.se'),
      'Kund', coalesce(new.customer_name, '-'),
      'Företagsnamn', coalesce(new.company_name, '-'),
      'E-post', coalesce(new.uploader_email, '-'),
      'Dokument', new.file_name,
      'Storlek', case
        when new.file_size is null then '-'
        when new.file_size < 1024 then new.file_size::text || ' B'
        when new.file_size < 1048576 then round(new.file_size / 1024.0)::text || ' KB'
        else round(new.file_size / 1048576.0, 1)::text || ' MB'
      end,
      'Meddelande', 'Ett nytt dokument har laddats upp i kundportalen.',
      'Skickat från', 'Tax Business kundportal'
    ),
    timeout_milliseconds := 5000
  );

  return new;
end;
$$;

drop trigger if exists notify_document_upload_after_insert on public.documents;

create trigger notify_document_upload_after_insert
after insert on public.documents
for each row execute function public.notify_document_upload();
