import { Answers, Context, CopyrightPermission, DataType, DeidStatus, Destination, Intent } from "./types";

type Option<T extends string> = { value: T; label: string; helper?: string };

export const dataTypeOptions: Option<DataType>[] = [
  { value: "public", label: "Public / Non-sensitive" },
  { value: "draft", label: "Unpublished manuscript or draft" },
  { value: "copyrighted", label: "Copyrighted content" },
  { value: "student_records", label: "Student record data (FERPA-like)" },
  { value: "human_subjects", label: "Human subjects data (potentially identifiable)" },
  { value: "phi", label: "PHI / clinical data" },
  { value: "proprietary", label: "Proprietary/contractual or NDA data" },
  { value: "credentials", label: "Credentials / secrets (passwords, API keys)" }
];

export const destinationOptions: Option<Destination>[] = [
  { value: "copilot", label: "Microsoft Copilot (enterprise/work account)" },
  { value: "local", label: "Local/offline tool (no cloud upload)" },
  { value: "consumer_chatbot", label: "Consumer AI chatbot (public ChatGPT/Gemini)" },
  { value: "third_party", label: "Third-party web app / unknown vendor" },
  { value: "not_sure_destination", label: "Not sure" }
];

export const intentOptions: Option<Intent>[] = [
  { value: "brainstorm", label: "Brainstorm / outline" },
  { value: "edit", label: "Edit for clarity / grammar" },
  { value: "summarize", label: "Summarize content I provide" },
  { value: "analyze", label: "Analyze dataset/text for insights" },
  { value: "code", label: "Generate code/scripts" },
  { value: "create_visuals", label: "Create images/slides" },
  { value: "other", label: "Other" }
];

export const contextOptions: Option<Context>[] = [
  { value: "no_irb", label: "Not human subjects / no IRB needed" },
  { value: "irb_approved", label: "Human subjects, IRB approved" },
  { value: "irb_pending", label: "Human subjects, IRB pending/not approved" },
  { value: "contract_restrictions", label: "Grant/contract restrictions apply (NDA/DUA)" },
  { value: "not_sure_context", label: "Not sure" }
];

export const deidOptions: Option<DeidStatus>[] = [
  { value: "deidentified", label: "Fully de-identified" },
  { value: "limited", label: "Limited data set" },
  { value: "identifiable", label: "Identifiable" },
  { value: "not_sure_deid", label: "Not sure" }
];

export const copyrightOptions: Option<CopyrightPermission>[] = [
  { value: "has_permission", label: "I have permission / license" },
  { value: "fair_use_uncertain", label: "Fair use uncertain" },
  { value: "no_permission", label: "No permission" },
  { value: "not_sure_permission", label: "Not sure" }
];

export const labelLookup: Record<string, string> = {
  ...Object.fromEntries(dataTypeOptions.map((o) => [o.value, o.label])),
  ...Object.fromEntries(destinationOptions.map((o) => [o.value, o.label])),
  ...Object.fromEntries(intentOptions.map((o) => [o.value, o.label])),
  ...Object.fromEntries(contextOptions.map((o) => [o.value, o.label])),
  ...Object.fromEntries(deidOptions.map((o) => [o.value, o.label])),
  ...Object.fromEntries(copyrightOptions.map((o) => [o.value, o.label]))
};

export const questionOrder = ["dataType", "destination", "intent", "context", "deidentification", "copyrightPermission"] as const;

export function formatScenarioSummary(answers: Partial<Answers>) {
  const parts: string[] = [];
  if (answers.dataType) parts.push(`Data: ${labelLookup[answers.dataType] ?? answers.dataType}`);
  if (answers.destination) parts.push(`Destination: ${labelLookup[answers.destination] ?? answers.destination}`);
  if (answers.intent) parts.push(`Intent: ${labelLookup[answers.intent] ?? answers.intent}`);
  if (answers.context) parts.push(`Context: ${labelLookup[answers.context] ?? answers.context}`);
  if (answers.deidentification) parts.push(`De-identification: ${labelLookup[answers.deidentification] ?? answers.deidentification}`);
  if (answers.copyrightPermission)
    parts.push(`Copyright permission: ${labelLookup[answers.copyrightPermission] ?? answers.copyrightPermission}`);
  return parts.join(" | ");
}
