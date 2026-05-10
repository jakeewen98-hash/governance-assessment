import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Governance Readiness Assessment | Themis Partners",
  description:
    "Assess your organisation's governance maturity with the Themis Partners Governance Readiness Assessment. Receive a confidential, AI-generated diagnostic report.",
  openGraph: {
    title: "Governance Readiness Assessment | Themis Partners",
    description:
      "Assess your governance maturity and receive a confidential diagnostic report from Themis Partners.",
    siteName: "Themis Partners",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
