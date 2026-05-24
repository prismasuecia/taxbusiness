import {CheckCircle2} from 'lucide-react';

export function TrustBar({items}: {items: string[]}) {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-4">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 bg-white px-5 py-6">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
          <p className="text-sm leading-6 text-ink/75">{item}</p>
        </div>
      ))}
    </section>
  );
}
