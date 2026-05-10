import type { Section } from "@/types/assessment";

export const sections: Section[] = [
  {
    id: "board-structure",
    title: "Board Structure",
    description:
      "Assess the composition, independence, and formalisation of your board.",
    weight: 0.25,
    questions: [
      {
        id: "bs-01",
        text: "How are board meetings currently managed?",
        type: "single",
        options: [
          { label: "No formal structure", value: 0 },
          { label: "Ad hoc meetings with no defined agenda", value: 1 },
          { label: "Structured but inconsistently applied", value: 2 },
          { label: "Fully formalised with agenda, papers, and minutes", value: 3 },
        ],
      },
      {
        id: "bs-02",
        text: "How many independent non-executive directors sit on your board?",
        type: "single",
        options: [
          { label: "None", value: 0 },
          { label: "One", value: 1 },
          { label: "Two", value: 2 },
          { label: "Three or more", value: 3 },
        ],
      },
      {
        id: "bs-03",
        text: "Is there a formal board charter or terms of reference in place?",
        type: "single",
        options: [
          { label: "No", value: 0 },
          { label: "Under development", value: 1 },
          { label: "Yes, but not regularly reviewed", value: 2 },
          { label: "Yes, reviewed and updated annually", value: 3 },
        ],
      },
      {
        id: "bs-04",
        text: "Are sub-committees (audit, risk, remuneration) formally constituted?",
        type: "single",
        options: [
          { label: "No committees exist", value: 0 },
          { label: "Informal committees only", value: 1 },
          { label: "Some formal committees with defined mandates", value: 2 },
          { label: "All key committees formally constituted with written terms", value: 3 },
        ],
      },
    ],
  },
  {
    id: "statutory-compliance",
    title: "Statutory Compliance",
    description:
      "Evaluate adherence to Companies Act obligations and filing requirements.",
    weight: 0.20,
    questions: [
      {
        id: "sc-01",
        text: "Are statutory registers (shareholders, directors, charges) regularly maintained?",
        type: "single",
        options: [
          { label: "No — registers are incomplete or missing", value: 0 },
          { label: "Unsure of their current state", value: 1 },
          { label: "Mostly maintained but with some gaps", value: 2 },
          { label: "Yes — fully up to date and accessible", value: 3 },
        ],
      },
      {
        id: "sc-02",
        text: "Are annual confirmation statements and accounts filed on time?",
        type: "single",
        options: [
          { label: "Rarely or never on time", value: 0 },
          { label: "Sometimes — occasional late filings", value: 1 },
          { label: "Usually on time", value: 2 },
          { label: "Always filed on time without exception", value: 3 },
        ],
      },
      {
        id: "sc-03",
        text: "Is there a defined process for managing the PSC (Persons with Significant Control) register?",
        type: "single",
        options: [
          { label: "No — this has not been addressed", value: 0 },
          { label: "Unsure what is required", value: 1 },
          { label: "Partially managed but not systematically", value: 2 },
          { label: "Yes — fully maintained and regularly reviewed", value: 3 },
        ],
      },
      {
        id: "sc-04",
        text: "Are director duties and conflict of interest procedures formally documented?",
        type: "single",
        options: [
          { label: "No documentation exists", value: 0 },
          { label: "Informal understanding only", value: 1 },
          { label: "Partially documented", value: 2 },
          { label: "Fully documented and actively enforced", value: 3 },
        ],
      },
    ],
  },
  {
    id: "governance-processes",
    title: "Governance Processes",
    description:
      "Review the maturity of your governance workflows, documentation, and risk management.",
    weight: 0.25,
    questions: [
      {
        id: "gp-01",
        text: "Are board decisions consistently documented through formal minutes?",
        type: "single",
        options: [
          { label: "Rarely — most decisions go unrecorded", value: 0 },
          { label: "Sometimes — only significant decisions documented", value: 1 },
          { label: "Usually — with occasional gaps", value: 2 },
          { label: "Always — with timely, accurate minutes", value: 3 },
        ],
      },
      {
        id: "gp-02",
        text: "Is there a formal risk management framework or risk register in place?",
        type: "single",
        options: [
          { label: "No formal framework exists", value: 0 },
          { label: "Risks are discussed informally", value: 1 },
          { label: "A partial framework is in place", value: 2 },
          { label: "A comprehensive, regularly reviewed framework", value: 3 },
        ],
      },
      {
        id: "gp-03",
        text: "Are board papers and management information distributed ahead of meetings?",
        type: "single",
        options: [
          { label: "No — materials are presented on the day", value: 0 },
          { label: "Sometimes — ad hoc and inconsistent", value: 1 },
          { label: "Usually — but timing varies", value: 2 },
          { label: "Always — with adequate notice for preparation", value: 3 },
        ],
      },
      {
        id: "gp-04",
        text: "Is there a formal delegation of authority (DoA) framework in place?",
        type: "single",
        options: [
          { label: "No — authority is exercised informally", value: 0 },
          { label: "Informal understanding but not documented", value: 1 },
          { label: "Partially documented", value: 2 },
          { label: "Fully documented, communicated, and enforced", value: 3 },
        ],
      },
    ],
  },
  {
    id: "director-oversight",
    title: "Director Oversight",
    description:
      "Assess the quality of information, evaluation, and development available to your directors.",
    weight: 0.15,
    questions: [
      {
        id: "do-01",
        text: "Do directors receive regular, structured management information packs?",
        type: "single",
        options: [
          { label: "No formal reporting to the board", value: 0 },
          { label: "Ad hoc information provided on request", value: 1 },
          { label: "Quarterly reporting in place", value: 2 },
          { label: "Monthly packs with KPIs and financial data", value: 3 },
        ],
      },
      {
        id: "do-02",
        text: "Is there a formal board and director performance evaluation process?",
        type: "single",
        options: [
          { label: "No evaluation process exists", value: 0 },
          { label: "Informal discussions only", value: 1 },
          { label: "Periodic but not formalised", value: 2 },
          { label: "Annual formal evaluation with documented outcomes", value: 3 },
        ],
      },
      {
        id: "do-03",
        text: "Are directors provided with appropriate induction and ongoing CPD?",
        type: "single",
        options: [
          { label: "No induction or training provided", value: 0 },
          { label: "Minimal — only on specific topics", value: 1 },
          { label: "Some structured induction and occasional training", value: 2 },
          { label: "Comprehensive onboarding and ongoing development programme", value: 3 },
        ],
      },
    ],
  },
  {
    id: "investor-readiness",
    title: "Investor Readiness",
    description:
      "Gauge the robustness of your governance structure against investor and transaction scrutiny.",
    weight: 0.15,
    questions: [
      {
        id: "ir-01",
        text: "Would your governance records withstand rigorous investor due diligence today?",
        type: "single",
        options: [
          { label: "No — there are significant gaps", value: 0 },
          { label: "Unsure — we have not stress-tested this", value: 1 },
          { label: "Probably — with some remediation required", value: 2 },
          { label: "Yes — we are confident in our records", value: 3 },
        ],
      },
      {
        id: "ir-02",
        text: "Is there a current shareholders' agreement or investment agreement in place?",
        type: "single",
        options: [
          { label: "No agreement exists", value: 0 },
          { label: "Under negotiation or being drafted", value: 1 },
          { label: "Yes — a basic agreement is in place", value: 2 },
          { label: "Yes — comprehensive and recently reviewed", value: 3 },
        ],
      },
      {
        id: "ir-03",
        text: "Is your cap table and ownership structure fully documented and current?",
        type: "single",
        options: [
          { label: "No — incomplete or not maintained", value: 0 },
          { label: "Mostly — some gaps or discrepancies exist", value: 1 },
          { label: "Substantially accurate", value: 2 },
          { label: "Yes — fully documented, reconciled, and current", value: 3 },
        ],
      },
      {
        id: "ir-04",
        text: "Are there robust financial reporting and independent audit processes in place?",
        type: "single",
        options: [
          { label: "No formal processes or audits", value: 0 },
          { label: "Minimal — management accounts only", value: 1 },
          { label: "Basic — annual accounts with some oversight", value: 2 },
          { label: "Comprehensive — audit committee and regular audits", value: 3 },
        ],
      },
    ],
  },
];

export const MAX_SCORE_PER_QUESTION = 3;
