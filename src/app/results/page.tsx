"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ResultsPanel } from "@/components/results-panel";
import { rehydrateAssistantStore, useAssistantStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ResultsPage() {
  const { answers, result } = useAssistantStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const maybe = rehydrateAssistantStore();
    if (maybe instanceof Promise) {
      maybe.finally(() => setHydrated(true));
    } else {
      setHydrated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Results</p>
            <h1 className="text-3xl font-semibold text-neutral-900">Latest assistant decision</h1>
            <p className="text-sm text-neutral-700">Stored in session only. Refresh or Start over to clear.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/assistant">Back to assistant</Link>
          </Button>
        </div>

        {!hydrated ? (
          <div className="text-neutral-600">Loading...</div>
        ) : result ? (
          <ResultsPanel answers={answers} result={result} />
        ) : (
          <Card>
            <CardContent className="space-y-3">
              <p className="text-lg font-semibold text-neutral-900">No results yet</p>
              <p className="text-sm text-neutral-700">Complete the assistant flow to generate a recommendation.</p>
              <Button asChild>
                <Link href="/assistant">Start the assistant</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
