# Themis Partners — Governance Readiness Assessment

A premium web application for assessing governance maturity, generating AI-powered reports, and booking consultations with Themis Partners.

## Quick Start

### Prerequisites

- Node.js 18+
- An Anthropic API key

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

The only **required** variable is:
```
ANTHROPIC_API_KEY=sk-ant-...
```

Email delivery is optional — if SMTP variables are not set, the report is still generated on-screen and downloadable as PDF.

### 3. Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ | Claude API key (console.anthropic.com) |
| `RESEND_API_KEY` | Optional | Resend API key for email delivery (resend.com) |
| `RESEND_FROM_EMAIL` | Optional | From address — must be on a Resend-verified domain |
| `NEXT_PUBLIC_BASE_URL` | Optional | Base URL for email links |

### Getting email working (Resend)

1. Sign up at [resend.com](https://resend.com) — free tier gives 3,000 emails/month
2. Create an API key and copy it into `RESEND_API_KEY`
3. Add your sending domain in Resend → Domains, then set `RESEND_FROM_EMAIL`

**During development**, set `RESEND_FROM_EMAIL=Themis Partners <onboarding@resend.dev>` — Resend will deliver to your own verified email only, no domain setup needed.

---

## Application Flow

```
/ (landing page)
  → /assessment (19-question wizard, 5 sections)
    → Contact form (name, company, email)
      → API: /api/generate-report (Claude generates report + emails PDF)
        → /results (score gauge, category breakdown, full report, PDF download, CTA)
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── assessment/page.tsx         # Assessment wizard
│   ├── results/page.tsx            # Results page
│   └── api/
│       ├── generate-report/        # Claude API + email
│       └── generate-pdf/           # PDF download endpoint
├── components/
│   ├── assessment/                 # Wizard, questions, contact form
│   ├── results/                    # Score gauge, category bars, CTA
│   ├── layout/                     # Header
│   └── ui/                         # Button
├── lib/
│   ├── questions.ts                # All 19 questions across 5 sections
│   ├── scoring.ts                  # Weighted scoring logic
│   ├── claude.ts                   # Claude API integration
│   └── pdf.ts                      # @react-pdf/renderer PDF generation
└── types/
    └── assessment.ts               # TypeScript types
```

---

## Scoring Methodology

| Section | Weight | Questions |
|---|---|---|
| Board Structure | 25% | 4 |
| Statutory Compliance | 20% | 4 |
| Governance Processes | 25% | 4 |
| Director Oversight | 15% | 3 |
| Investor Readiness | 15% | 4 |

**Bands:**
- 0–30: High Governance Risk
- 31–60: Governance Gaps Identified
- 61–80: Strong Governance Foundations
- 81–100: Investor-Grade Governance Maturity

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Add environment variables in Vercel dashboard → Settings → Environment Variables.

### Other platforms

Any Node.js 18+ host supporting Next.js 15 will work. Set environment variables per the table above.

---

## Customisation

- **Questions**: edit `src/lib/questions.ts`
- **Scoring weights**: edit `src/lib/scoring.ts`
- **Claude prompt**: edit `src/lib/claude.ts` → `buildPrompt()`
- **PDF layout**: edit `src/lib/pdf.ts`
- **Branding/colours**: edit `tailwind.config.ts` (themis colour palette)
- **CTA links**: edit `src/components/results/CTASection.tsx`
