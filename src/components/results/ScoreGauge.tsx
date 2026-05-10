"use client";

import { useEffect, useState } from "react";
import type { AssessmentScore } from "@/types/assessment";
import { BAND_COLOURS } from "@/lib/scoring";

interface ScoreGaugeProps {
  score: AssessmentScore;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  const colour = BAND_COLOURS[score.band];
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (animated ? score.overall / 100 : 0) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full -rotate-90"
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={colour}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-slate-900">
            {score.overall}
          </span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>
      <div
        className="mt-4 rounded-full px-4 py-1.5 text-xs font-semibold text-white"
        style={{ backgroundColor: colour }}
      >
        {score.bandLabel}
      </div>
    </div>
  );
}
