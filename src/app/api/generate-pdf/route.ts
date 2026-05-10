import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";
import type { AssessmentSubmission, GeneratedReport } from "@/types/assessment";

export async function POST(request: NextRequest) {
  try {
    const { submission, report }: {
      submission: AssessmentSubmission;
      report: GeneratedReport;
    } = await request.json();

    if (!submission || !report) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const pdfBuffer = await generatePDF(submission, report);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Themis-Governance-Assessment.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
