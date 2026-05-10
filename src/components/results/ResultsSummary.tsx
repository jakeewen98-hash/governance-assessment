"use client";

import { useState } from "react";
import type { AssessmentSubmission, GeneratedReport } from "@/types/assessment";
import { BAND_DESCRIPTIONS } from "@/lib/scoring";
import { ScoreGauge } from "./ScoreGauge";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { CTASection } from "./CTASection";
import { Button } from "@/components/ui/Button";

interface ResultsSummaryProps {
  submission: AssessmentSubmission;
  report: GeneratedReport;
}

function ReportSection({
  label,
  title,
  content,
}: {
  label: string;
  title: string;
  content: string;
}) {
  return (
    <div className="border-t border-slate-100 py-10">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-600">
        {label}
      </div>
      <h3 className="mb-5 font-serif text-xl font-medium text-slate-900 sm:text-2xl">
        {title}
      </h3>
      <div className="prose prose-slate max-w-none">
        {content.split("\n\n").map((para, i) => (
          <p key={i} className="mb-4 text-sm leading-relaxed text-slate-600">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ResultsSummary({ submission, report }: ResultsSummaryProps) {
  const { score, contact } = submission;
  const [pdfLoading, setPdfLoading] = useState(false);

  async function handleDownloadPDF() {
    setPdfLoading(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission, report }),
      });

      if (!response.ok) throw new Error("PDF generation failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Themis-Governance-Assessment-${contact.company.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download error:", err);
      alert("Unable to generate PDF at this time. Please try again shortly.");
    } finally {
      setPdfLoading(false);
    }
  }

  const dateStr = new Date(report.generatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-200 pb-10 mb-10">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-600">
          Governance Readiness Assessment
        </div>
        <h1 className="mb-1 font-serif text-3xl font-medium text-slate-900 sm:text-4xl">
          {contact.company}
        </h1>
        <p className="text-sm text-slate-400">
          Prepared for {contact.name} · {dateStr}
        </p>
      </div>

      {/* Score + Categories */}
      <div className="mb-12 grid gap-8 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center sm:items-start">
          <ScoreGauge score={score} />
          <p className="mt-6 max-w-xs text-center text-xs text-slate-500 leading-relaxed sm:text-left">
            {BAND_DESCRIPTIONS[score.band]}
          </p>
        </div>
        <div>
          <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Category scores
          </div>
          <CategoryBreakdown categories={score.categories} />
        </div>
      </div>

      {/* Download + email notice */}
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">
            Your full report has been sent to{" "}
            <span className="text-slate-700">{contact.email}</span>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Download the PDF below to review offline or share with your board.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleDownloadPDF}
          loading={pdfLoading}
          className="whitespace-nowrap"
        >
          Download PDF Report
        </Button>
      </div>

      {/* Report sections */}
      <ReportSection
        label="Section 01"
        title="Executive Summary"
        content={report.executiveSummary}
      />
      <ReportSection
        label="Section 02"
        title="Category Analysis"
        content={report.categoryAnalysis}
      />
      <ReportSection
        label="Section 03"
        title="Key Governance Risks"
        content={report.keyRisks}
      />
      <ReportSection
        label="Section 04"
        title="Investor Readiness Assessment"
        content={report.investorReadiness}
      />
      <ReportSection
        label="Section 05"
        title="Prioritised Recommendations"
        content={report.recommendations}
      />
      <ReportSection
        label="Section 06"
        title="Suggested Next Steps"
        content={report.nextSteps}
      />

      <CTASection />
    </div>
  );
}
