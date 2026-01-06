"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { QuestionStep } from "@/components/question-step";
import { ResultsPanel } from "@/components/results-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  contextOptions,
  copyrightOptions,
  dataTypeOptions,
  deidOptions,
  destinationOptions,
  intentOptions,
} from "@/lib/options";
import { rehydrateAssistantStore, useAssistantStore } from "@/lib/store";
import { Answers, EvaluationResult } from "@/lib/types";
import { cn } from "@/lib/utils";

type QuestionConfig = {
  id: keyof Answers;
  title: string;
  description?: string;
  options:
    | typeof dataTypeOptions
    | typeof destinationOptions
    | typeof intentOptions
    | typeof contextOptions
    | typeof deidOptions
    | typeof copyrightOptions;
  condition?: (answers: Partial<Answers>) => boolean;
};

const questionConfig: QuestionConfig[] = [
  {
    id: "dataType",
    title: "What type of data or content are you planning to use?",
    description: "Pick the best fit. This drives privacy and copyright guardrails.",
    options: dataTypeOptions,
  },
  {
    id: "destination",
    title: "Where will you send or paste this data?",
    description: "Choose the target tool or environment.",
    options: destinationOptions,
  },
  {
    id: "intent",
    title: "What do you want the AI to do?",
    options: intentOptions,
  },
  {
    id: "context",
    title: "IRB / funding / contract context?",
    description: "If human subjects are involved, select the IRB status.",
    options: contextOptions,
  },
  {
    id: "deidentification",
    title: "De-identification status",
    description: "If human or PHI data, what level of identifiers remain?",
    options: deidOptions,
    condition: (answers) => answers.dataType === "human_subjects" || answers.dataType === "phi",
  },
  {
    id: "copyrightPermission",
    title: "Copyright permission",
    description: "If copyrighted content, do you have permission or a license?",
    options: copyrightOptions,
    condition: (answers) => answers.dataType === "copyrighted",
  },
];

export default function AssistantPage() {
  const { answers, result, setAnswer, setAnswers, setResult, reset } = useAssistantStore();
  const [hydrated, setHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const maybe = rehydrateAssistantStore();
    if (maybe instanceof Promise) {
      maybe.finally(() => setHydrated(true));
    } else {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!answers.dataType || (answers.dataType !== "human_subjects" && answers.dataType !== "phi")) {
      setAnswers({ deidentification: undefined });
    }
    if (!answers.dataType || answers.dataType !== "copyrighted") {
      setAnswers({ copyrightPermission: undefined });
    }
  }, [answers.dataType, setAnswers]);

  const visibleQuestions = useMemo(
    () => questionConfig.filter((q) => (q.condition ? q.condition(answers) : true)),
    [answers]
  );

  useEffect(() => {
    if (currentIndex > visibleQuestions.length - 1) {
      setCurrentIndex(Math.max(visibleQuestions.length - 1, 0));
    }
  }, [visibleQuestions.length, currentIndex]);

  const currentQuestion = visibleQuestions[currentIndex];
  const total = visibleQuestions.length;

  const goBack = () => {
    setError(null);
    setCurrentIndex((idx) => Math.max(idx - 1, 0));
  };

  const startOver = () => {
    reset();
    setCurrentIndex(0);
    setError(null);
  };

  const evaluate = async () => {
    setIsEvaluating(true);
    setError(null);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) {
        throw new Error("Failed to evaluate answers");
      }
      const data = (await res.json()) as EvaluationResult;
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    const currentValue = answers[currentQuestion.id];
    if (!currentValue) {
      setError("Please select an option before continuing.");
      return;
    }
    setError(null);
    if (currentIndex === total - 1) {
      const missingIndex = visibleQuestions.findIndex((q) => !answers[q.id]);
      if (missingIndex >= 0) {
        setError("Please answer all required questions.");
        setCurrentIndex(missingIndex);
        return;
      }
      void evaluate();
      return;
    }
    setCurrentIndex((idx) => Math.min(idx + 1, total - 1));
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-neutral-600">
        Loading assistant...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-10">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Guided chat · 3–6 questions</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Answer a few questions to get an allowed/allowed-with-guardrails decision.</h1>
          <p className="text-sm text-neutral-700">
            Local-first evaluator. Your answers stay in this session. Use Back or Start over at any time.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <section className="space-y-4">
            {currentQuestion ? (
              <QuestionStep
                key={currentQuestion.id}
                index={currentIndex}
                total={total}
                title={currentQuestion.title}
                description={currentQuestion.description}
                options={currentQuestion.options as any}
                value={answers[currentQuestion.id] as string | undefined}
                onSelect={(val) => setAnswer(currentQuestion.id as keyof Answers, val as any)}
              />
            ) : (
              <Card>
                <CardContent className="space-y-3">
                  <p className="text-lg font-semibold">All questions answered</p>
                  <p className="text-sm text-neutral-600">Hit Evaluate to see guidance.</p>
                  <Button onClick={evaluate}>Evaluate</Button>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleNext} disabled={!currentQuestion || isEvaluating}>
                {currentIndex === total - 1 ? "Evaluate" : "Next"}
              </Button>
              <Button variant="outline" onClick={goBack} disabled={currentIndex === 0}>
                Back
              </Button>
              <Button variant="ghost" onClick={startOver}>
                Start over
              </Button>
              {isEvaluating ? <span className="text-sm text-neutral-600">Evaluating...</span> : null}
              {error ? <span className="text-sm text-danger">{error}</span> : null}
            </div>

            {result ? (
              <div className="space-y-3">
                <ResultsPanel answers={answers} result={result} />
                <div className="flex items-center gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/results">Open results page</Link>
                  </Button>
                  <p className="text-xs text-neutral-600">Results are saved for this session.</p>
                </div>
              </div>
            ) : null}
          </section>
          <aside className="space-y-3">
            <Card>
              <CardContent className="space-y-2">
                <p className="text-sm font-semibold text-neutral-800">Progress</p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className={cn("h-full bg-neutral-900 transition-all")}
                    style={{ width: `${Math.max(((currentIndex + 1) / total) * 100, 16)}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-600">
                  {currentIndex + 1} of {total} questions shown (conditional questions appear when needed)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2">
                <p className="text-sm font-semibold text-neutral-800">Your selections</p>
                <ul className="space-y-1 text-sm text-neutral-700">
                  {visibleQuestions.map((q) => (
                    <li key={q.id} className="flex items-start justify-between gap-2">
                      <span>{q.title}</span>
                      <span className="font-semibold">{answers[q.id] ? (q.options as any).find((o: any) => o.value === answers[q.id])?.label ?? "—" : "—"}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-neutral-500">
                  Answers persist in this tab via session storage. No analytics or external calls.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2">
                <p className="text-sm font-semibold text-neutral-800">Need a refresher?</p>
                <ul className="list-disc space-y-1 pl-4 text-xs text-neutral-600">
                  <li>PHI or credentials → keep offline.</li>
                  <li>Copyright without permission → avoid consumer chatbots.</li>
                  <li>IRB pending + identifiable → stop until approved.</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
