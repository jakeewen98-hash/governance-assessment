"use client";

interface SectionMeta {
  id: string;
  title: string;
}

interface ProgressBarProps {
  sections: SectionMeta[];
  currentSection: number;
  currentQuestion: number;
  totalQuestions: number;
}

export function ProgressBar({
  sections,
  currentSection,
  currentQuestion,
  totalQuestions,
}: ProgressBarProps) {
  const pct = totalQuestions > 0
    ? Math.round((currentQuestion / totalQuestions) * 100)
    : 0;

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-themis-600">
          {sections[currentSection]?.title ?? ""}
        </span>
        <span className="text-xs text-slate-400">
          {currentQuestion} of {totalQuestions} questions
        </span>
      </div>

      {/* Section segment bars */}
      <div className="mb-3 flex items-center gap-1.5">
        {sections.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-1.5">
            <div
              className={`h-1 w-full rounded-full transition-all duration-500 ${
                i < currentSection
                  ? "bg-slate-900"
                  : i === currentSection
                    ? "bg-themis-500"
                    : "bg-slate-200"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="h-0.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Section names */}
      <div className="mt-2 flex items-start">
        {sections.map((s, i) => (
          <div key={s.id} className="flex-1 text-center">
            <span
              className={`text-[10px] font-medium transition-colors duration-300 ${
                i === currentSection
                  ? "text-slate-700"
                  : i < currentSection
                    ? "text-slate-400"
                    : "text-slate-300"
              }`}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
