import rulesData from "@/data/rules.json";
import { formatScenarioSummary, labelLookup } from "./options";
import { Answers, EvaluationResult, Rule, RuleConditions, Status, ToolRecommendation } from "./types";

const severityRank: Record<Status, number> = { green: 0, yellow: 1, red: 2 };

const rules: Rule[] = rulesData as Rule[];

function valueMatches<T extends string>(ruleValue: T | T[] | undefined, answerValue: T | undefined) {
  if (!ruleValue) return true;
  if (!answerValue) return false;
  return Array.isArray(ruleValue) ? ruleValue.includes(answerValue) : ruleValue === answerValue;
}

function ruleMatches(rule: Rule, answers: Answers) {
  return (Object.keys(rule.conditions) as (keyof RuleConditions)[]).every((key) => {
    const ruleValue = rule.conditions[key];
    const answerValue = answers[key];
    return valueMatches(ruleValue as string | string[] | undefined, answerValue as string | undefined);
  });
}

function pickStatus(matches: Rule[]) {
  return matches.reduce<Status>((current, rule) => {
    return severityRank[rule.status] > severityRank[current] ? rule.status : current;
  }, "green");
}

function mergeUnique(items: string[]) {
  return Array.from(new Set(items));
}

function buildChecklist(answers: Answers, result: Omit<EvaluationResult, "checklistText">): string {
  const scenario = formatScenarioSummary(answers);
  const doDont = [
    `Status: ${result.status.toUpperCase()}`,
    `Approved tools: ${result.toolRecommendations.map((t) => t.name).join(", ") || "None"}`,
    "Do: keep only the minimum data needed; document approvals",
    "Don't: paste identifiers or credentials into unapproved tools",
  ];

  const notes = [
    "Notes for email/IRB:",
    "- What data was shared? (type/volume)",
    "- Which tool and why?",
    "- Protocol or contract references (if any)",
    "- Any de-identification steps taken",
  ];

  return [
    "Is this allowed? Research AI Guardrails Assistant",
    `Scenario: ${scenario}`,
    `Status: ${result.status.toUpperCase()}`,
    "",
    "Recommended tools:",
    ...result.toolRecommendations.map((t, idx) => `${idx + 1}. ${t.name} — ${t.why}`),
    "",
    "Do / Don't:",
    ...doDont,
    "",
    "Safer workflow:",
    ...result.saferWorkflowSteps.map((step, idx) => `${idx + 1}. ${step}`),
    "",
    ...notes,
  ].join("\n");
}

export function evaluateAnswers(answers: Answers): EvaluationResult {
  const matchingRules = rules.filter((rule) => ruleMatches(rule, answers));
  const status = matchingRules.length ? pickStatus(matchingRules) : "yellow";

  const rationale = mergeUnique(
    matchingRules.flatMap((rule) => rule.rationale.length ? rule.rationale : [`Rule ${rule.id} matched`])
  );
  const saferWorkflowSteps = mergeUnique(matchingRules.flatMap((rule) => rule.saferWorkflow));
  const toolRecommendations: ToolRecommendation[] = matchingRules.flatMap((rule) => rule.recommendedTools);
  const matchedRules = matchingRules.map((r) => `${r.id}: ${r.title}`);

  const result = {
    status,
    toolRecommendations: toolRecommendations.length ? toolRecommendations : [{ name: "Local/offline tool", why: "Default safest path" }],
    rationale: rationale.length ? rationale : ["No specific rules matched; defaulting to caution"],
    saferWorkflowSteps: saferWorkflowSteps.length
      ? saferWorkflowSteps
      : ["Use sample/non-sensitive data", "Confirm approvals before sharing", "Prefer enterprise tools when unsure"],
    matchedRules,
  };

  const checklistText = buildChecklist(answers, result);
  return { ...result, checklistText };
}

export function humanizeAnswer(key: keyof Answers, value?: string) {
  if (!value) return "";
  return labelLookup[value] ?? value;
}
