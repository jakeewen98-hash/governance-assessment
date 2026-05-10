"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Analysing board structure responses…",
  "Evaluating statutory compliance posture…",
  "Reviewing governance process maturity…",
  "Assessing director oversight framework…",
  "Benchmarking investor readiness…",
  "Calculating governance maturity score…",
  "Drafting executive summary…",
  "Identifying key governance risks…",
  "Formulating prioritised recommendations…",
  "Preparing your confidential report…",
];

export function GeneratingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 2200);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md text-center">
        {/* Spinner */}
        <div className="mb-10 flex justify-center">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-2 border-slate-100" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-slate-900 animate-spin" />
            <div className="absolute inset-2 rounded-full border border-slate-100" />
            <div
              className="absolute inset-2 rounded-full border border-transparent border-t-themis-500 animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            />
          </div>
        </div>

        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-themis-600">
          Themis Partners
        </div>
        <h2 className="mb-3 font-serif text-2xl font-medium text-slate-900">
          Generating your governance assessment
        </h2>
        <p className="mb-10 text-sm text-slate-400 leading-relaxed">
          Our analysis engine is reviewing your responses against institutional
          governance benchmarks. This typically takes 20–30 seconds.
        </p>

        {/* Step indicator */}
        <div className="rounded-lg border border-slate-100 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-themis-500 animate-pulse-slow" />
            <span className="text-left text-sm text-slate-600 transition-all duration-300">
              {STEPS[stepIndex]}
              {".".repeat(dotCount)}
            </span>
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= stepIndex ? "bg-slate-900" : "bg-slate-100"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-300">
          Your report will be emailed upon completion
        </p>
      </div>
    </div>
  );
}
