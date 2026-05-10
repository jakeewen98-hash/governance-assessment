import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/lib/claude";
import { generatePDF } from "@/lib/pdf";
import type { AssessmentSubmission } from "@/types/assessment";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const submission: AssessmentSubmission = await request.json();

    if (!submission.answers || !submission.contact || !submission.score) {
      return NextResponse.json(
        { error: "Invalid submission data" },
        { status: 400 }
      );
    }

    // 1. Generate AI report
    const report = await generateReport(submission);

    // 2. Generate PDF (non-blocking — log error but don't fail the request)
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await generatePDF(submission, report);
    } catch (pdfErr) {
      console.error("[PDF] Generation failed:", pdfErr);
    }

    // 3. Send email if Resend is configured
    if (process.env.RESEND_API_KEY && pdfBuffer) {
      try {
        await sendReportEmail(submission, pdfBuffer);
      } catch (emailErr) {
        console.error("[Email] Send failed:", emailErr);
      }
    } else if (!process.env.RESEND_API_KEY) {
      console.info("[Email] Skipped — RESEND_API_KEY not configured");
    } else if (!pdfBuffer) {
      console.info("[Email] Skipped — PDF generation failed");
    }

    return NextResponse.json({ report });
  } catch (err) {
    console.error("[ReportAPI] Fatal error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate report" },
      { status: 500 }
    );
  }
}

async function sendReportEmail(
  submission: AssessmentSubmission,
  pdfBuffer: Buffer
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { contact, score } = submission;

  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const filename = `Themis-Governance-Assessment-${contact.company.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #1e293b; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #0f172a; padding: 32px 40px; }
    .firm { color: #8b6c3e; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; }
    .body { padding: 40px; }
    .greeting { font-size: 22px; font-weight: 600; color: #0f172a; margin-bottom: 16px; }
    p { font-size: 14px; line-height: 1.7; color: #475569; margin-bottom: 16px; }
    .score-box { background: #f1f5f9; border-radius: 8px; padding: 24px 28px; margin: 24px 0; }
    .score-label { font-size: 11px; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
    .score-num { font-size: 44px; font-weight: 700; color: #0f172a; line-height: 1; }
    .score-band { font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 6px; }
    .cta { background: #0f172a; border-radius: 8px; padding: 28px 32px; margin-top: 24px; text-align: center; }
    .cta p { color: #94a3b8; font-size: 13px; line-height: 1.6; }
    .cta a { display: inline-block; background: #fff; color: #0f172a; padding: 13px 28px; border-radius: 6px; font-weight: 600; font-size: 13px; text-decoration: none; margin-top: 16px; }
    .footer { padding: 20px 40px; border-top: 1px solid #e2e8f0; }
    .footer p { font-size: 11px; color: #94a3b8; line-height: 1.6; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="firm">Themis Partners</div>
    </div>
    <div class="body">
      <div class="greeting">Dear ${contact.name},</div>
      <p>Thank you for completing the Themis Partners Governance Readiness Assessment. Your confidential governance diagnostic report is attached to this email.</p>
      <div class="score-box">
        <div class="score-label">Overall Governance Score</div>
        <div class="score-num">${score.overall}</div>
        <div class="score-band">${score.bandLabel}</div>
      </div>
      <p>Your report contains a full executive summary, category analysis, key governance risks, investor readiness assessment, and prioritised recommendations — prepared specifically for <strong>${contact.company}</strong>.</p>
      <p>We recommend reviewing the findings with your board and using the prioritised recommendations as the basis for a governance improvement roadmap.</p>
      <div class="cta">
        <p>Governance issues rarely become cheaper over time. Themis Partners can help you address the findings in this report with practical, scalable solutions.</p>
        <a href="https://themis-partners.co.uk/contact">Book a Consultation</a>
      </div>
    </div>
    <div class="footer">
      <p>Themis Partners Limited&nbsp;&nbsp;·&nbsp;&nbsp;hello@themis-partners.co.uk&nbsp;&nbsp;·&nbsp;&nbsp;themis-partners.co.uk<br>
      This report is confidential and prepared solely for the named recipient. ${dateStr}</p>
    </div>
  </div>
</body>
</html>`;

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "Themis Partners <reports@themis-partners.co.uk>";

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: contact.email,
    subject: `Your Governance Assessment — ${contact.company}`,
    html,
    attachments: [
      {
        filename,
        content: pdfBuffer,
      },
    ],
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
