"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { ResultsSummary } from "@/components/results/ResultsSummary";
import type { AssessmentSubmission, GeneratedReport } from "@/types/assessment";

interface StoredResults {
  submission: AssessmentSubmission;
  report: GeneratedReport;
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<StoredResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("themis_results");
      if (!stored) {
        router.replace("/assessment");
        return;
      }
      setData(JSON.parse(stored));
    } catch {
      router.replace("/assessment");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <ResultsSummary submission={data.submission} report={data.report} />
      </main>
    </div>
  );
}
