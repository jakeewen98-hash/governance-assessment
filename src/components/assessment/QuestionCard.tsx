"use client";

import { useState, useEffect } from "react";
import type { Question } from "@/types/assessment";

interface QuestionCardProps {
  question: Question;
  sectionIndex: number;
  questionIndex: number;
  selectedValue: number | undefined;
  onAnswer: (questionId: string, value: number) => void;
}

export function QuestionCard({
  question,
  sectionIndex,
  questionIndex,
  selectedValue,
  onAnswer,
}: QuestionCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [question.id]);

  return (
    <div
      className={`transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-themis-600">
        Question {questionIndex + 1}
      </div>
      <h2 className="mb-8 font-serif text-2xl font-medium leading-snug text-slate-900 sm:text-3xl">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={`group w-full rounded-lg border px-6 py-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-white bg-white"
                      : "border-slate-300 group-hover:border-slate-500"
                  }`}
                >
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-slate-900" />
                  )}
                </div>
                <span className="text-sm font-medium leading-relaxed">
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
