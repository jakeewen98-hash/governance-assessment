import Link from "next/link";
import { Header } from "@/components/layout/Header";

const SECTIONS = [
  { num: "01", title: "Board Structure", desc: "Board composition, independence, and formal governance structures." },
  { num: "02", title: "Statutory Compliance", desc: "Companies Act obligations, filing accuracy, and register maintenance." },
  { num: "03", title: "Governance Processes", desc: "Decision documentation, risk management, and delegation frameworks." },
  { num: "04", title: "Director Oversight", desc: "Management information, performance evaluation, and director development." },
  { num: "05", title: "Investor Readiness", desc: "Shareholder agreements, cap table accuracy, and due diligence readiness." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl">
              <div className="mb-6 inline-block rounded-full border border-themis-200 bg-themis-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-themis-700">
                Complimentary Assessment
              </div>
              <h1 className="mb-6 font-serif text-4xl font-medium leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Governance Readiness
                <span className="block text-slate-400">Assessment</span>
              </h1>
              <p className="mb-8 text-lg text-slate-600 leading-relaxed max-w-xl">
                A rigorous, confidential diagnostic of your governance maturity.
                Benchmark your board, compliance, and investor readiness — and
                receive a detailed advisory report in under ten minutes.
              </p>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/assessment"
                  className="rounded-md bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:bg-slate-950"
                >
                  Begin Assessment
                </Link>
                <span className="text-sm text-slate-400">
                  19 questions · 5–7 minutes
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* What you'll receive */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="mb-10">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-600">
                Your report includes
              </div>
              <h2 className="font-serif text-2xl font-medium text-slate-900">
                Institutional-grade governance analysis
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Governance Maturity Score",
                  desc: "A weighted composite score benchmarked across five governance domains.",
                },
                {
                  title: "Executive Summary",
                  desc: "Board-level narrative summarising your governance posture and key themes.",
                },
                {
                  title: "Key Risk Identification",
                  desc: "Material governance risks surfaced from your responses, ranked by severity.",
                },
                {
                  title: "Investor Readiness Assessment",
                  desc: "An honest appraisal of your governance position ahead of any transaction or fundraise.",
                },
                {
                  title: "Prioritised Recommendations",
                  desc: "Practical, sequenced actions to address gaps and strengthen your governance framework.",
                },
                {
                  title: "Polished PDF Report",
                  desc: "A professionally formatted report, suitable for sharing with your board or advisers.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-slate-100 p-6"
                >
                  <div className="mb-1.5 h-0.5 w-6 bg-themis-500" />
                  <h3 className="mb-2 text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment sections */}
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="mb-10">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-600">
                Assessment structure
              </div>
              <h2 className="font-serif text-2xl font-medium text-slate-900">
                Five governance domains
              </h2>
            </div>
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
              {SECTIONS.map((section) => (
                <div
                  key={section.num}
                  className="flex items-start gap-6 px-6 py-5"
                >
                  <span className="text-xs font-semibold text-slate-300 pt-0.5">
                    {section.num}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 mb-0.5">
                      {section.title}
                    </div>
                    <div className="text-xs text-slate-500">{section.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scoring bands */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="mb-10">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-600">
                Scoring methodology
              </div>
              <h2 className="font-serif text-2xl font-medium text-slate-900">
                Four maturity bands
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { range: "0 – 30", label: "High Governance Risk", colour: "#C0392B", bg: "#FEF2F2" },
                { range: "31 – 60", label: "Governance Gaps Identified", colour: "#E67E22", bg: "#FFF7ED" },
                { range: "61 – 80", label: "Strong Foundations", colour: "#27AE60", bg: "#F0FDF4" },
                { range: "81 – 100", label: "Investor-Grade Maturity", colour: "#1A5276", bg: "#EFF6FF" },
              ].map((band) => (
                <div
                  key={band.label}
                  className="rounded-lg p-5"
                  style={{ backgroundColor: band.bg }}
                >
                  <div
                    className="mb-2 text-2xl font-bold"
                    style={{ color: band.colour }}
                  >
                    {band.range}
                  </div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: band.colour }}
                  >
                    {band.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Themis */}
        <section>
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-600">
                  About Themis Partners
                </div>
                <h2 className="mb-4 font-serif text-2xl font-medium text-slate-900">
                  Governance advisory for private and PE-backed businesses
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Themis Partners is a boutique governance consultancy working
                  with founder-led, privately owned, and private equity-backed
                  businesses. We help management teams and boards build
                  governance frameworks that meet investor expectations and
                  support operational scale.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our advisers bring experience from investment banking, private
                  equity, and board-level executive roles — giving us a practical
                  understanding of what investors expect and what boards need.
                </p>
              </div>
              <div className="rounded-xl bg-slate-900 p-8 text-white">
                <div className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-400">
                  Ready to begin?
                </div>
                <p className="mb-6 font-serif text-xl font-medium leading-snug">
                  Receive your confidential governance diagnostic in under ten
                  minutes.
                </p>
                <Link
                  href="/assessment"
                  className="inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Start the Assessment →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col gap-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-4 w-px bg-themis-400" />
              <span className="font-semibold text-slate-600">Themis Partners Limited</span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 sm:text-right">
              <span>hello@themis-partners.co.uk</span>
              <a
                href="https://themis-partners.co.uk"
                className="hover:text-slate-600 transition-colors"
              >
                themis-partners.co.uk
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
