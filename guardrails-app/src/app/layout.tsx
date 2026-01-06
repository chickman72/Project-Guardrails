import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Is this allowed? Research AI Guardrails Assistant",
  description:
    "Chat-style guide that applies policy, ethics, and privacy guardrails for research AI tooling. Local-first and deterministic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
