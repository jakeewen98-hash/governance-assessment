import PDFDocument from "pdfkit";
import type { AssessmentSubmission, GeneratedReport } from "@/types/assessment";
import { BAND_COLOURS } from "./scoring";

// A4 in points
const W = 595.28;
const H = 841.89;
const M = 56; // margin
const CW = W - M * 2; // content width
const CT = M + 34; // content top (below page header line)
const CB = H - M - 28; // content bottom (above footer line)

type Doc = PDFKit.PDFDocument;

function barColour(score: number): string {
  if (score >= 70) return "#27AE60";
  if (score >= 40) return "#E67E22";
  return "#C0392B";
}

function hex(colour: string): string {
  return colour;
}

// ── Per-page chrome ────────────────────────────────────────────────────────

function pageHeader(doc: Doc): void {
  doc
    .fillColor("#94A3B8")
    .font("Helvetica")
    .fontSize(9)
    .text("THEMIS PARTNERS", M, M + 4);
  doc
    .fillColor("#94A3B8")
    .fontSize(7.5)
    .text("STRICTLY CONFIDENTIAL", M, M + 6, {
      width: CW,
      align: "right",
      lineBreak: false,
    });
  doc
    .moveTo(M, M + 20)
    .lineTo(W - M, M + 20)
    .strokeColor("#E2E8F0")
    .lineWidth(0.5)
    .stroke();
}

function pageFooter(doc: Doc, pageNum: number, company: string): void {
  const fy = H - M - 12;
  doc
    .moveTo(M, fy - 6)
    .lineTo(W - M, fy - 6)
    .strokeColor("#E2E8F0")
    .lineWidth(0.5)
    .stroke();
  doc
    .fillColor("#94A3B8")
    .font("Helvetica")
    .fontSize(7.5)
    .text(`Governance Readiness Assessment — ${company}`, M, fy, {
      width: CW / 2,
      lineBreak: false,
    });
  doc
    .fillColor("#94A3B8")
    .fontSize(7.5)
    .text(
      `Themis Partners  |  themis-partners.co.uk  |  Page ${pageNum}`,
      M,
      fy,
      { width: CW, align: "right", lineBreak: false }
    );
}

// ── Text helpers ────────────────────────────────────────────────────────────

function sectionLabel(doc: Doc, text: string, y: number): number {
  doc
    .fillColor("#8B6C3E")
    .font("Helvetica")
    .fontSize(8)
    .text(text, M, y, { lineBreak: false });
  return y + 16;
}

function sectionTitle(doc: Doc, text: string, y: number): number {
  doc
    .fillColor("#0F172A")
    .font("Helvetica-Bold")
    .fontSize(18)
    .text(text, M, y, { width: CW });
  return y + 32;
}

function dividerLine(doc: Doc, y: number): number {
  doc
    .moveTo(M, y)
    .lineTo(W - M, y)
    .strokeColor("#E2E8F0")
    .lineWidth(0.5)
    .stroke();
  return y + 20;
}

// Writes flowing body text, adding new pages as needed.
// Returns the updated y position.
function bodyText(
  doc: Doc,
  text: string,
  y: number,
  pageCounter: { n: number },
  company: string
): number {
  const paragraphs = text.split("\n\n").filter((p) => p.trim());

  for (const para of paragraphs) {
    doc.font("Helvetica").fontSize(9.5);
    const ph = doc.heightOfString(para.trim(), { width: CW, lineGap: 3 });

    if (y + ph > CB) {
      pageCounter.n += 1;
      doc.addPage();
      pageHeader(doc);
      pageFooter(doc, pageCounter.n, company);
      y = CT;
    }

    doc
      .fillColor("#334155")
      .font("Helvetica")
      .fontSize(9.5)
      .text(para.trim(), M, y, { width: CW, lineGap: 3 });

    y += ph + 10;
  }

  return y;
}

// ── Main export ─────────────────────────────────────────────────────────────

export function generatePDF(
  submission: AssessmentSubmission,
  report: GeneratedReport
): Promise<Buffer> {
  const { contact, score } = submission;
  const bandColour = BAND_COLOURS[score.band];
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return new Promise((resolve, reject) => {
    // bufferPages lets us switchToPage() at the end to stamp footers correctly
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: M, bottom: M, left: M, right: M },
      bufferPages: true,
      info: {
        Title: `Governance Assessment — ${contact.company}`,
        Author: "Themis Partners",
        Subject: "Governance Readiness Assessment Report",
      },
    }) as Doc & {
      bufferedPageRange(): { start: number; count: number };
      switchToPage(n: number): void;
      flushPages(): void;
    };

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // ── Cover (page 0 in buffer) ──────────────────────────────────────────
    doc.rect(0, 0, W, H).fill("#0F172A");

    doc
      .fillColor("#8B6C3E")
      .font("Helvetica")
      .fontSize(10)
      .text("THEMIS PARTNERS", M, 80, { lineBreak: false });

    doc
      .fillColor("#FFFFFF")
      .font("Helvetica-Bold")
      .fontSize(30)
      .text("Governance Readiness\nAssessment", M, 156, { lineGap: 6 });

    doc
      .fillColor("#94A3B8")
      .font("Helvetica")
      .fontSize(13)
      .text(
        "A confidential diagnostic of your governance maturity,\nprepared for the exclusive use of the recipient.",
        M,
        236,
        { lineGap: 4 }
      );

    doc
      .moveTo(M, 306)
      .lineTo(W - M, 306)
      .strokeColor("#334155")
      .lineWidth(0.5)
      .stroke();

    let metaY = 326;
    const metaRows: [string, string][] = [
      ["Prepared for", `${contact.name}, ${contact.company}`],
      ["Date issued", dateStr],
      ["Overall score", `${score.overall} / 100`],
    ];
    for (const [lbl, val] of metaRows) {
      doc
        .fillColor("#64748B")
        .font("Helvetica")
        .fontSize(9)
        .text(lbl, M, metaY, { width: 90, lineBreak: false });
      doc
        .fillColor("#CBD5E1")
        .fontSize(9)
        .text(val, M + 100, metaY, {
          width: CW - 100,
          lineBreak: false,
        });
      metaY += 20;
    }

    // Band badge
    const badgeY = metaY + 12;
    doc.font("Helvetica-Bold").fontSize(10);
    const badgeW = doc.widthOfString(score.bandLabel) + 24;
    doc.roundedRect(M, badgeY, badgeW, 24, 4).fill(bandColour);
    doc
      .fillColor("#FFFFFF")
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(score.bandLabel, M + 12, badgeY + 7, { lineBreak: false });

    doc
      .fillColor("#475569")
      .font("Helvetica")
      .fontSize(8)
      .text(
        "This report is confidential and prepared solely for the use of the named recipient.\nThemis Partners Limited   |   themis-partners.co.uk",
        M,
        H - 68,
        { lineGap: 3 }
      );

    // ── Content pages ─────────────────────────────────────────────────────
    // pageCounter.n tracks the logical content page number (footers only go
    // on content pages, starting at 1). Cover gets no footer.
    const pc = { n: 0 };

    function newSection(): number {
      pc.n += 1;
      doc.addPage();
      pageHeader(doc);
      pageFooter(doc, pc.n, contact.company);
      return CT;
    }

    // Page 1 (content): Executive Summary + Score overview
    let y = newSection();

    y = sectionLabel(doc, "SECTION 01", y);
    y = sectionTitle(doc, "Executive Summary", y);
    y = bodyText(doc, report.executiveSummary, y, pc, contact.company);
    y = dividerLine(doc, y);
    y = sectionLabel(doc, "SECTION 02", y);
    y = sectionTitle(doc, "Governance Maturity Score", y);

    // Overall score box
    doc.roundedRect(M, y, CW, 68, 4).fill("#0F172A");
    doc
      .fillColor("#FFFFFF")
      .font("Helvetica-Bold")
      .fontSize(42)
      .text(String(score.overall), M + 20, y + 8, { lineBreak: false });
    doc
      .fillColor("#94A3B8")
      .font("Helvetica")
      .fontSize(9)
      .text("Overall governance score", M + 90, y + 14, { lineBreak: false });
    doc
      .fillColor("#FFFFFF")
      .font("Helvetica-Bold")
      .fontSize(13)
      .text(score.bandLabel, M + 90, y + 32, { lineBreak: false });
    y += 80;

    // Category bars
    for (const cat of score.categories) {
      doc
        .fillColor("#1E293B")
        .font("Helvetica")
        .fontSize(8.5)
        .text(cat.title, M, y, { width: CW - 50, lineBreak: false });
      doc
        .fillColor("#0F172A")
        .font("Helvetica-Bold")
        .fontSize(8.5)
        .text(`${cat.normalizedScore}%`, M, y, {
          width: CW,
          align: "right",
          lineBreak: false,
        });
      y += 13;
      doc.roundedRect(M, y, CW, 4, 2).fill("#E2E8F0");
      const fw = Math.max(4, (cat.normalizedScore / 100) * CW);
      doc.roundedRect(M, y, fw, 4, 2).fill(barColour(cat.normalizedScore));
      y += 16;
    }

    // Page 2 (content): Category Analysis + Key Risks
    y = newSection();
    y = sectionLabel(doc, "SECTION 03", y);
    y = sectionTitle(doc, "Category Analysis", y);
    y = bodyText(doc, report.categoryAnalysis, y, pc, contact.company);
    y = dividerLine(doc, y);
    y = sectionLabel(doc, "SECTION 04", y);
    y = sectionTitle(doc, "Key Governance Risks", y);
    y = bodyText(doc, report.keyRisks, y, pc, contact.company);

    // Page 3 (content): Investor Readiness + Recommendations
    y = newSection();
    y = sectionLabel(doc, "SECTION 05", y);
    y = sectionTitle(doc, "Investor Readiness Assessment", y);
    y = bodyText(doc, report.investorReadiness, y, pc, contact.company);
    y = dividerLine(doc, y);
    y = sectionLabel(doc, "SECTION 06", y);
    y = sectionTitle(doc, "Prioritised Recommendations", y);
    y = bodyText(doc, report.recommendations, y, pc, contact.company);

    // Page 4 (content): Next Steps + CTA
    y = newSection();
    y = sectionLabel(doc, "SECTION 07", y);
    y = sectionTitle(doc, "Suggested Next Steps", y);
    y = bodyText(doc, report.nextSteps, y, pc, contact.company);
    y = dividerLine(doc, y);

    // CTA box
    const ctaBody =
      "Governance issues rarely become cheaper over time.\n\nThemis Partners helps private and PE-backed businesses implement governance structures that scale with growth, investors, and operational complexity. Our team works alongside management and boards to build frameworks that are both rigorous and practical.\n\nTo discuss the findings of this report, book a confidential consultation with one of our senior advisers.";

    doc.font("Helvetica").fontSize(9.5);
    const ctaBodyH = doc.heightOfString(ctaBody, {
      width: CW - 40,
      lineGap: 3,
    });
    const ctaH = ctaBodyH + 68;

    if (y + ctaH > CB) {
      y = newSection();
    }

    doc.rect(M, y, CW, ctaH).fill("#F8FAFC");
    doc.rect(M, y, 3, ctaH).fill("#8B6C3E");

    doc
      .fillColor("#0F172A")
      .font("Helvetica-Bold")
      .fontSize(13)
      .text("Speak with a Governance Specialist", M + 20, y + 14, {
        width: CW - 40,
      });
    doc
      .fillColor("#475569")
      .font("Helvetica")
      .fontSize(9.5)
      .text(ctaBody, M + 20, y + 36, { width: CW - 40, lineGap: 3 });
    doc
      .fillColor("#8B6C3E")
      .font("Helvetica-Bold")
      .fontSize(9.5)
      .text(
        "themis-partners.co.uk   |   hello@themis-partners.co.uk",
        M + 20,
        y + ctaH - 20,
        { lineBreak: false }
      );

    // ── Stamp footers on any overflow pages created by bodyText ──────────
    // bufferPages lets us revisit pages that were added mid-flow.
    // We already stamped footers for the main section pages above;
    // the only pages that might be missing footers are overflow pages.
    // Re-stamp all content pages to be safe (idempotent at same coords).
    const range = doc.bufferedPageRange();
    let contentPage = 0;
    for (let i = range.start; i < range.start + range.count; i++) {
      if (i === range.start) continue; // skip cover
      contentPage += 1;
      doc.switchToPage(i);
      pageFooter(doc, contentPage, contact.company);
    }

    doc.flushPages();
    doc.end();
  });
}
