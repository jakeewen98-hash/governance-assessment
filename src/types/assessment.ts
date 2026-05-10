export type QuestionType = "single" | "boolean" | "scale";

export interface QuestionOption {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  weight?: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  weight: number;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: number;
}

export type Answers = Record<string, number>;

export interface CategoryScore {
  sectionId: string;
  title: string;
  rawScore: number;
  maxScore: number;
  normalizedScore: number;
  weight: number;
  weightedScore: number;
}

export interface AssessmentScore {
  overall: number;
  band: "high-risk" | "gaps" | "strong" | "investor-grade";
  bandLabel: string;
  categories: CategoryScore[];
}

export interface ContactInfo {
  name: string;
  company: string;
  email: string;
  role?: string;
}

export interface AssessmentSubmission {
  answers: Answers;
  contact: ContactInfo;
  score: AssessmentScore;
}

export interface ReportSection {
  title: string;
  content: string;
}

export interface GeneratedReport {
  executiveSummary: string;
  categoryAnalysis: string;
  keyRisks: string;
  investorReadiness: string;
  recommendations: string;
  nextSteps: string;
  generatedAt: string;
}
