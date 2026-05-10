import Anthropic from "@anthropic-ai/sdk";
import type { AssessmentSubmission, GeneratedReport } from "@/types/assessment";
import { sections } from "./questions";
import { BAND_DESCRIPTIONS } from "./scoring";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function buildPrompt(submission: AssessmentSubmission): string {
  const { answers, contact, score } = submission;

  const categoryDetails = score.categories
    .map((c) => {
      const section = sections.find((s) => s.id === c.sectionId);
      const questionAnswers = section?.questions.map((q) => {
        const answerValue = answers[q.id] ?? 0;
        const option = q.options.find((o) => o.value === answerValue);
        return `  - ${q.text}\n    Response: "${option?.label ?? "Not answered"}" (score: ${answerValue}/3)`;
      });
      return `${c.title} (Score: ${c.normalizedScore}/100, Weight: ${Math.round(c.weight * 100)}%):\n${questionAnswers?.join("\n")}`;
    })
    .join("\n\n");

  return `You are a senior governance consultant at a boutique advisory firm. You are writing a confidential governance assessment report for a client. The report should read as if written by a highly experienced human consultant — authoritative, precise, and board-level in tone.

CLIENT INFORMATION:
- Name: ${contact.name}
- Company: ${contact.company}
- Role: ${contact.role || "Senior Executive"}

ASSESSMENT RESULTS:
- Overall Governance Score: ${score.overall}/100
- Maturity Band: ${score.bandLabel}
- Band Description: ${BAND_DESCRIPTIONS[score.band]}

DETAILED CATEGORY RESPONSES:
${categoryDetails}

Write a professional governance assessment report with the following sections. Use clear, professional prose. Do NOT use bullet points in the Executive Summary. Do NOT use AI-generated language, clichés, or hollow phrases. Write as a senior partner would write to a board. Be specific, reference the actual scores and responses where relevant.

Structure your response as valid JSON with these exact keys:

{
  "executiveSummary": "3-4 paragraph executive summary. Professional, direct, references the overall score and key themes. No bullet points.",
  "categoryAnalysis": "Analysis of each of the 5 categories. For each: name, score, 2-3 sentence assessment of strengths and gaps. Professional prose.",
  "keyRisks": "3-5 key governance risks identified from the responses. Each risk should have a title and 2-sentence explanation. Format as numbered list in the text.",
  "investorReadiness": "2-3 paragraph assessment of investor readiness. Reference the investor readiness category score and overall governance posture. Direct and honest.",
  "recommendations": "5-7 prioritised recommendations. Each with a short title and 2-3 sentence explanation of what to do and why. Format as numbered list.",
  "nextSteps": "2 paragraph closing section on suggested immediate next steps. Mention Themis Partners subtly as able to assist. Professional and non-salesy."
}

Tone requirements:
- Board-level, professional, and measured
- Non-alarmist but honest about gaps
- Authoritative — do not hedge excessively
- Specific to the actual responses given
- Do not sound AI-generated
- UK English spelling and conventions
- No hollow phrases like "in today's complex business environment"`;
}

export async function generateReport(
  submission: AssessmentSubmission
): Promise<GeneratedReport> {
  const prompt = buildPrompt(submission);

  const message = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not extract JSON from Claude response");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    executiveSummary: parsed.executiveSummary,
    categoryAnalysis: parsed.categoryAnalysis,
    keyRisks: parsed.keyRisks,
    investorReadiness: parsed.investorReadiness,
    recommendations: parsed.recommendations,
    nextSteps: parsed.nextSteps,
    generatedAt: new Date().toISOString(),
  };
}
