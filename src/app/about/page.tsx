import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <SiteHeader />
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-10">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">About</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Research AI Guardrails Assistant</h1>
          <p className="text-sm text-neutral-700">
            An intentionally lightweight, local-first guide that applies policy, ethics, and privacy guardrails without relying on LLMs.
          </p>
        </div>
        <Card>
          <CardContent className="space-y-3 text-sm text-neutral-700">
            <p>
              This MVP helps researchers and staff decide if a workflow is allowed, needs caution, or should be stopped. It is rule-driven and ships with a
              transparent library of guardrails and examples inside the repository.
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Deterministic rules—no calls to external services.</li>
              <li>Session-based storage only; no analytics.</li>
              <li>Built with Next.js App Router, TypeScript, Tailwind, and shadcn-inspired components.</li>
            </ul>
            <p className="text-xs text-neutral-600">
              Disclaimer: This tool offers guidance, not legal advice. Confirm with your institution&apos;s policies and privacy/IRB officers.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
