export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-px bg-themis-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900">
              Themis Partners
            </span>
          </div>
          <a
            href="https://themis-partners.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 transition-colors hover:text-slate-700"
          >
            themis-partners.co.uk
          </a>
        </div>
      </div>
    </header>
  );
}
