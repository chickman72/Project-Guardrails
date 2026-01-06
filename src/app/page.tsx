import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const highlights = [
    "Deterministic, local-first evaluator (no external calls)",
    "3–6 guided questions with policy-aware routing",
    "Instant Green / Yellow / Red plus safer workflow",
    "Copy-ready checklist for email/IRB notes",
    "Browsable rules + examples for transparency",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-amber-50 text-neutral-900">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 pb-16 pt-12">
        <section className="gradient-surface relative overflow-hidden rounded-2xl border border-border px-8 py-12 shadow-lg">
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="pointer-events-none absolute left-10 top-10 h-32 w-32 rounded-full bg-success blur-3xl" />
            <div className="pointer-events-none absolute right-10 top-6 h-32 w-32 rounded-full bg-warning blur-3xl" />
          </div>
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <Badge tone="warning">Policy · Ethics · Privacy</Badge>
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                “Is this allowed?” Research AI Guardrails Assistant
              </h1>
              <p className="text-lg text-neutral-700">
                A chat-style guide that quickly checks if your research AI workflow is Green, Yellow, or Red—and offers safer alternatives with approved tools.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/assistant">Start the assistant</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/library">Browse rules & examples</Link>
                </Button>
              </div>
              <p className="text-xs text-neutral-600">
                Local-first. No analytics. Answers stay on your device; evaluation runs in-app.
              </p>
            </div>
            <Card className="w-full max-w-sm">
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">Sample output</span>
                  <Badge tone="warning">Yellow</Badge>
                </div>
                <p className="text-sm font-semibold text-neutral-900">Human data, IRB pending</p>
                <ul className="list-disc space-y-2 pl-4 text-sm text-neutral-700">
                  <li>Stop external uploads until IRB is approved.</li>
                  <li>Use local/offline tools or synthetic data.</li>
                  <li>Document protocol and de-identification steps.</li>
                </ul>
                <div className="rounded-lg border border-border bg-neutral-50 p-3 text-xs text-neutral-700">
                  Checklist: status YELLOW. Destination not approved. Use local tools; log rationale in IRB notes.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          {highlights.map((text) => (
            <Card key={text}>
              <CardContent className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-neutral-900" />
                <p className="text-sm font-semibold text-neutral-800">{text}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
