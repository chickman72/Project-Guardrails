 "use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { statusColors, statusIconClasses, statusTextColor, cn } from "@/lib/utils";
import { EvaluationResult, Answers } from "@/lib/types";
import { formatScenarioSummary } from "@/lib/options";

type Props = {
  answers: Partial<Answers>;
  result: EvaluationResult;
};

export function ResultsPanel({ answers, result }: Props) {
  const [copied, setCopied] = useState(false);

  const tone = result.status === "green" ? "success" : result.status === "yellow" ? "warning" : "danger";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.checklistText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify({ answers, result }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "guardrails-result.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-2 border-black/60 shadow-md">
      <CardHeader className="gap-2 bg-neutral-50">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={cn("h-3 w-3 rounded-full border-2", statusIconClasses[result.status])} />
              <Badge tone={tone} className={statusTextColor[result.status]}>
                {result.status.toUpperCase()}
              </Badge>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">Recommendation</h3>
            <p className="text-sm text-neutral-600">Scenario: {formatScenarioSummary(answers)}</p>
          </div>
          <div
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              statusColors[result.status],
              statusTextColor[result.status]
            )}
          >
            {result.status === "green"
              ? "Proceed with approved tools"
              : result.status === "yellow"
                ? "Caution: verify constraints"
                : "High risk: stop and adjust"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <h4 className="text-sm font-semibold text-neutral-700">Approved tool recommendations</h4>
          <ul className="space-y-2">
            {result.toolRecommendations.map((tool, idx) => (
              <li key={idx} className="rounded-lg border border-border bg-white px-3 py-2">
                <p className="font-semibold">{tool.name}</p>
                <p className="text-sm text-neutral-600">{tool.why}</p>
              </li>
            ))}
          </ul>
          <div>
            <h4 className="text-sm font-semibold text-neutral-700">Rationale</h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-700">
              {result.rationale.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="space-y-3">
          <h4 className="text-sm font-semibold text-neutral-700">Safer alternative workflow</h4>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-700">
            {result.saferWorkflowSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-neutral-700">Checklist (copy-friendly)</h4>
              <div className="space-x-2">
                <Button variant="subtle" size="sm" onClick={handleCopy}>
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  Save as JSON
                </Button>
              </div>
            </div>
            <pre className="h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-neutral-50 p-3 text-xs text-neutral-800">{result.checklistText}</pre>
          </div>
        </section>
      </CardContent>
      {result.matchedRules.length ? (
        <CardFooter className="bg-neutral-50 text-xs text-neutral-600">
          Matched rules: {result.matchedRules.join(" | ")}
        </CardFooter>
      ) : null}
    </Card>
  );
}
