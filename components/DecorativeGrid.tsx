export function DecorativeGrid({labels}: {labels: string[]}) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,29,27,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(29,29,27,0.07)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-copper">TB</p>
            <p className="mt-3 max-w-[12rem] font-serif text-3xl leading-tight text-petroleum">Ordning i varje steg</p>
          </div>
          <div className="rounded-full border border-ink/10 bg-paper px-4 py-2 text-sm text-ink/70">559252-6726</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {labels.map((label, index) => (
            <div
              key={label}
              className={`rounded-2xl border border-ink/10 bg-paper/90 p-4 backdrop-blur ${
                index === 1 ? 'translate-y-5' : ''
              }`}
            >
              <span className="text-xs text-ink/45">0{index + 1}</span>
              <p className="mt-2 font-medium text-petroleum">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
