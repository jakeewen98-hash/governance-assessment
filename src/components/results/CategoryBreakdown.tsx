"use client";

import { useEffect, useState } from "react";
import type { CategoryScore } from "@/types/assessment";

interface CategoryBreakdownProps {
  categories: CategoryScore[];
}

function getColour(score: number): string {
  if (score >= 70) return "#27AE60";
  if (score >= 40) return "#E67E22";
  return "#C0392B";
}

function getLabel(score: number): string {
  if (score >= 70) return "Strong";
  if (score >= 40) return "Developing";
  return "Requires attention";
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-4">
      {categories.map((cat, i) => {
        const colour = getColour(cat.normalizedScore);
        const label = getLabel(cat.normalizedScore);

        return (
          <div
            key={cat.sectionId}
            className="rounded-lg border border-slate-100 bg-white p-5"
            style={{
              animationDelay: `${i * 100}ms`,
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-900">
                  {cat.title}
                </span>
                <span
                  className="ml-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: `${colour}18`,
                    color: colour,
                  }}
                >
                  {label}
                </span>
              </div>
              <span
                className="text-lg font-bold"
                style={{ color: colour }}
              >
                {cat.normalizedScore}
                <span className="text-xs font-normal text-slate-400">/100</span>
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${cat.normalizedScore}%` : "0%",
                  backgroundColor: colour,
                  transitionDelay: `${i * 100 + 200}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
