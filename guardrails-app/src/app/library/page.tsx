import rules from "@/data/rules.json";
import examples from "@/data/examples.json";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Status } from "@/lib/types";

const toneMap: Record<Status, "success" | "warning" | "danger"> = {
  green: "success",
  yellow: "warning",
  red: "danger",
};

export default function LibraryPage() {
  const ruleList = rules as any[];
  const exampleList = examples as any[];

  return (
    <div className="min-h-screen bg-neutral-50">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-10">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Transparency</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Rules & Examples Library</h1>
          <p className="text-sm text-neutral-700">
            The evaluator uses deterministic rules stored in this repository. Update these JSON files to add or edit guardrails.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">Rules ({ruleList.length})</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {ruleList.map((rule) => (
              <Card key={rule.id}>
                <CardHeader className="gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">{rule.id}</p>
                    <Badge tone={toneMap[rule.status as Status]}>{(rule.status as string).toUpperCase()}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">{rule.title}</h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {rule.tags?.map((tag: string) => (
                      <span key={tag} className="rounded-full bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-neutral-700">
                  <p className="font-semibold">Conditions</p>
                  <pre className="overflow-auto rounded-md bg-neutral-50 p-3 text-xs">{JSON.stringify(rule.conditions, null, 2)}</pre>
                  <p className="font-semibold">Rationale</p>
                  <ul className="list-disc space-y-1 pl-4">
                    {rule.rationale.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <p className="font-semibold">Safer workflow</p>
                  <ul className="list-decimal space-y-1 pl-4">
                    {rule.saferWorkflow.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">Examples ({exampleList.length})</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {exampleList.map((ex) => (
              <Card key={ex.id}>
                <CardHeader className="gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">{ex.id}</p>
                    <Badge tone={toneMap[ex.expectedStatus as Status]}>{(ex.expectedStatus as string).toUpperCase()}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">{ex.title}</h3>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-neutral-700">
                  <p className="font-semibold">Answers</p>
                  <pre className="overflow-auto rounded-md bg-neutral-50 p-3 text-xs">{JSON.stringify(ex.answers, null, 2)}</pre>
                  {ex.notes ? <p className="text-xs text-neutral-600">Notes: {ex.notes}</p> : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
