export function DecorativeGrid({labels}: {labels: string[]}) {
  const visibleLabels = labels.slice(0, 4);

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-soft">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,29,27,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(29,29,27,0.055)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="relative grid min-h-[420px] grid-rows-[auto_1fr_auto] p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-copper">TB</p>
            <p className="mt-3 max-w-[13rem] font-serif text-3xl leading-tight text-petroleum">Ordning i varje steg</p>
          </div>
          <div className="whitespace-nowrap border-b border-copper/45 pb-2 text-sm text-ink/62">559252-6726</div>
        </div>
        <div className="my-10 flex items-center">
          <div className="w-full border-y border-ink/10 bg-paper/70 px-6 py-7">
            <div className="grid gap-5 sm:grid-cols-[0.85fr_1.15fr]">
              <p className="font-serif text-4xl leading-tight text-petroleum">Tydlig ekonomi</p>
              <div className="space-y-3">
                <div className="h-px bg-ink/16" />
                <div className="h-px w-10/12 bg-ink/12" />
                <div className="h-px w-8/12 bg-ink/12" />
              </div>
            </div>
          </div>
        </div>
        <ul className="grid gap-3 border-t border-ink/10 pt-5 sm:grid-cols-2">
          {visibleLabels.map((label, index) => (
            <li key={label} className="flex items-center gap-3 text-sm text-ink/68">
              <span className="h-px w-7 bg-copper/70" aria-hidden="true" />
              <span className="text-xs text-ink/38">0{index + 1}</span>
              <span className="font-medium text-petroleum">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
