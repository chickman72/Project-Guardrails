/// <reference types="vitest" />
import { describe, expect, it } from "vitest";
import examples from "@/data/examples.json";
import { evaluateAnswers } from "./evaluator";
import { ExampleCase } from "./types";

describe("evaluateAnswers", () => {
  const exampleCases = examples as ExampleCase[];

  it("matches seeded examples", () => {
    exampleCases.forEach((example) => {
      const result = evaluateAnswers(example.answers as any);
      expect(result.status).toBe(example.expectedStatus);
    });
  });

  it("returns checklist text and matched rules", () => {
    const sample = exampleCases[0];
    const result = evaluateAnswers(sample.answers as any);
    expect(result.checklistText).toContain("Scenario:");
    expect(result.matchedRules.length).toBeGreaterThan(0);
  });
});
