export function CTASection() {
  return (
    <div className="mt-16 border-t border-slate-200 pt-16">
      <div className="rounded-xl bg-slate-900 px-8 py-12 text-center sm:px-12">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-400">
          Themis Partners
        </div>
        <h2 className="mb-4 font-serif text-2xl font-medium text-white sm:text-3xl">
          Governance issues rarely become cheaper over time.
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-base text-slate-400 leading-relaxed">
          Themis Partners helps private and PE-backed businesses implement
          governance structures that scale with growth, investors, and
          operational complexity.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://themis-partners.co.uk/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Book a Consultation
          </a>
          <a
            href="https://themis-partners.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            themis-partners.co.uk →
          </a>
        </div>
        <div className="mt-10 flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-6">
          <span className="text-xs text-slate-600">
            hello@themis-partners.co.uk
          </span>
          <span className="hidden text-slate-700 sm:inline">·</span>
          <span className="text-xs text-slate-600">
            Themis Partners Limited, London
          </span>
        </div>
      </div>
    </div>
  );
}
