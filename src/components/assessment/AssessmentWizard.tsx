"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sections } from "@/lib/questions";
import { calculateScore } from "@/lib/scoring";
import type { Answers, ContactInfo } from "@/types/assessment";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { ContactForm } from "./ContactForm";
import { GeneratingScreen } from "./GeneratingScreen";
import { Button } from "@/components/ui/Button";

type Stage = "questions" | "contact" | "generating";

const STORAGE_KEY = "themis_assessment_answers";

function loadSavedAnswers(): Answers {
  if (typeof window === "undefined") return {};
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveAnswers(answers: Answers) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {}
}

export function AssessmentWizard() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [stage, setStage] = useState<Stage>("questions");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const saved = loadSavedAnswers();
    setAnswers(saved);
  }, []);

  const totalQuestions = sections.reduce(
    (sum, s) => sum + s.questions.length,
    0
  );

  const answeredCount = sections
    .slice(0, sectionIdx)
    .reduce((sum, s) => sum + s.questions.length, 0) + questionIdx;

  const currentSection = sections[sectionIdx];
  const currentQuestion = currentSection?.questions[questionIdx];

  const handleAnswer = useCallback(
    (questionId: string, value: number) => {
      const newAnswers = { ...answers, [questionId]: value };
      setAnswers(newAnswers);
      saveAnswers(newAnswers);

      // Auto-advance after short delay
      setTimeout(() => {
        const isLastQuestionInSection =
          questionIdx === currentSection.questions.length - 1;
        const isLastSection = sectionIdx === sections.length - 1;

        if (isLastQuestionInSection && isLastSection) {
          setStage("contact");
        } else if (isLastQuestionInSection) {
          setSectionIdx((prev) => prev + 1);
          setQuestionIdx(0);
        } else {
          setQuestionIdx((prev) => prev + 1);
        }
      }, 350);
    },
    [answers, questionIdx, sectionIdx, currentSection]
  );

  const handleBack = useCallback(() => {
    if (stage === "contact") {
      setStage("questions");
      setSectionIdx(sections.length - 1);
      setQuestionIdx(sections[sections.length - 1].questions.length - 1);
      return;
    }
    if (questionIdx > 0) {
      setQuestionIdx((prev) => prev - 1);
    } else if (sectionIdx > 0) {
      const prevSection = sections[sectionIdx - 1];
      setSectionIdx((prev) => prev - 1);
      setQuestionIdx(prevSection.questions.length - 1);
    }
  }, [stage, questionIdx, sectionIdx]);

  const handleContactSubmit = useCallback(
    async (contact: ContactInfo) => {
      setGenerating(true);
      setStage("generating");

      const score = calculateScore(answers);
      const submission = { answers, contact, score };

      try {
        const response = await fetch("/api/generate-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
        });

        if (!response.ok) {
          throw new Error("Report generation failed");
        }

        const data = await response.json();

        // Store results in session storage for results page
        sessionStorage.setItem(
          "themis_results",
          JSON.stringify({ submission, report: data.report })
        );

        // Clear answers
        sessionStorage.removeItem(STORAGE_KEY);

        router.push("/results");
      } catch (err) {
        console.error("Report generation error:", err);
        alert(
          "We encountered an issue generating your report. Please try again."
        );
        setStage("contact");
        setGenerating(false);
      }
    },
    [answers, router]
  );

  if (stage === "generating") {
    return <GeneratingScreen />;
  }

  if (stage === "contact") {
    return (
      <div>
        <div className="mb-8">
          <ProgressBar
            sections={sections}
            currentSection={sections.length - 1}
            currentQuestion={totalQuestions}
            totalQuestions={totalQuestions}
          />
        </div>
        <ContactForm onSubmit={handleContactSubmit} loading={generating} />
      </div>
    );
  }

  const canGoBack = sectionIdx > 0 || questionIdx > 0;
  const currentAnswerValue = answers[currentQuestion?.id];

  return (
    <div>
      <ProgressBar
        sections={sections}
        currentSection={sectionIdx}
        currentQuestion={answeredCount}
        totalQuestions={totalQuestions}
      />

      <QuestionCard
        key={currentQuestion?.id}
        question={currentQuestion}
        sectionIndex={sectionIdx}
        questionIndex={questionIdx}
        selectedValue={currentAnswerValue}
        onAnswer={handleAnswer}
      />

      <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
        {canGoBack ? (
          <Button variant="ghost" size="sm" onClick={handleBack}>
            ← Back
          </Button>
        ) : (
          <div />
        )}

        {currentAnswerValue !== undefined && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const isLastQuestionInSection =
                questionIdx === currentSection.questions.length - 1;
              const isLastSection = sectionIdx === sections.length - 1;
              if (isLastQuestionInSection && isLastSection) {
                setStage("contact");
              } else if (isLastQuestionInSection) {
                setSectionIdx((prev) => prev + 1);
                setQuestionIdx(0);
              } else {
                setQuestionIdx((prev) => prev + 1);
              }
            }}
          >
            Next →
          </Button>
        )}
      </div>
    </div>
  );
}
