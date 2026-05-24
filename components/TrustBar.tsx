import {CheckCircle2} from 'lucide-react';

export function TrustBar({items}: {items: string[]}) {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 border-y border-ink/10 md:grid-cols-4">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 border-b border-ink/10 px-4 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
          <p className="text-sm leading-6 text-ink/68">{item}</p>
        </div>
      ))}
    </section>
  );
}
