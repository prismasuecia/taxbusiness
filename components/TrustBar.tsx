import {CheckCircle2} from 'lucide-react';

export function TrustBar({items}: {items: string[]}) {
  const columns = items.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-4';

  return (
    <section className={`mx-auto grid max-w-6xl grid-cols-2 border-y border-ink/10 ${columns}`}>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 border-b border-ink/10 px-4 py-4 last:col-span-2 last:border-b-0 md:last:col-span-1 md:border-b-0 md:border-r md:py-5 md:last:border-r-0">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
          <p className="text-sm leading-6 text-ink/68">{item}</p>
        </div>
      ))}
    </section>
  );
}
