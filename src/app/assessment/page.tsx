import { Header } from "@/components/layout/Header";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <div className="mb-10">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-themis-600">
            Governance Readiness Assessment
          </div>
          <h1 className="font-serif text-2xl font-medium text-slate-900">
            Select the response that best describes your current position.
          </h1>
        </div>
        <AssessmentWizard />
      </main>
    </div>
  );
}
