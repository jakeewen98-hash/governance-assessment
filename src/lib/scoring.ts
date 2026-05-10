import type { Answers, AssessmentScore, CategoryScore } from "@/types/assessment";
import { sections, MAX_SCORE_PER_QUESTION } from "./questions";

export function calculateScore(answers: Answers): AssessmentScore {
  const categories: CategoryScore[] = sections.map((section) => {
    const maxScore = section.questions.length * MAX_SCORE_PER_QUESTION;
    const rawScore = section.questions.reduce((sum, q) => {
      return sum + (answers[q.id] ?? 0);
    }, 0);
    const normalizedScore = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;
    const weightedScore = normalizedScore * section.weight;

    return {
      sectionId: section.id,
      title: section.title,
      rawScore,
      maxScore,
      normalizedScore: Math.round(normalizedScore),
      weight: section.weight,
      weightedScore,
    };
  });

  const overall = Math.round(
    categories.reduce((sum, c) => sum + c.weightedScore, 0)
  );

  return {
    overall,
    band: getBand(overall),
    bandLabel: getBandLabel(overall),
    categories,
  };
}

function getBand(score: number): AssessmentScore["band"] {
  if (score <= 30) return "high-risk";
  if (score <= 60) return "gaps";
  if (score <= 80) return "strong";
  return "investor-grade";
}

function getBandLabel(score: number): string {
  if (score <= 30) return "High Governance Risk";
  if (score <= 60) return "Governance Gaps Identified";
  if (score <= 80) return "Strong Governance Foundations";
  return "Investor-Grade Governance Maturity";
}

export const BAND_DESCRIPTIONS: Record<AssessmentScore["band"], string> = {
  "high-risk":
    "Your governance framework requires immediate attention. Significant structural gaps present material risk to operations, investor confidence, and regulatory standing.",
  gaps:
    "Your business has established some governance foundations, but meaningful gaps remain. Addressing these will be essential ahead of any transaction, fundraise, or growth event.",
  strong:
    "Your governance is well-structured relative to your peer group. Targeted enhancements will position the business for institutional investment and operational scale.",
  "investor-grade":
    "Your governance framework reflects institutional maturity. You are well-positioned for due diligence, investor scrutiny, and the demands of sustained growth.",
};

export const BAND_COLOURS: Record<AssessmentScore["band"], string> = {
  "high-risk": "#C0392B",
  gaps: "#E67E22",
  strong: "#27AE60",
  "investor-grade": "#1A5276",
};
