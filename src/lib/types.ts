export type DataType =
  | "public"
  | "draft"
  | "copyrighted"
  | "student_records"
  | "human_subjects"
  | "phi"
  | "proprietary"
  | "credentials";

export type Destination =
  | "copilot"
  | "local"
  | "consumer_chatbot"
  | "third_party"
  | "not_sure_destination";

export type Intent =
  | "brainstorm"
  | "edit"
  | "summarize"
  | "analyze"
  | "code"
  | "create_visuals"
  | "other";

export type Context =
  | "no_irb"
  | "irb_approved"
  | "irb_pending"
  | "contract_restrictions"
  | "not_sure_context";

export type DeidStatus = "deidentified" | "limited" | "identifiable" | "not_sure_deid";
export type CopyrightPermission =
  | "has_permission"
  | "fair_use_uncertain"
  | "no_permission"
  | "not_sure_permission";

export type Status = "green" | "yellow" | "red";

export interface Answers {
  dataType: DataType;
  destination: Destination;
  intent: Intent;
  context: Context;
  deidentification?: DeidStatus;
  copyrightPermission?: CopyrightPermission;
}

export type ToolRecommendation = {
  name: string;
  why: string;
};

export type RuleConditions = Partial<{
  [K in keyof Answers]: Answers[K] | Answers[K][];
}>;

export interface Rule {
  id: string;
  title: string;
  description?: string;
  status: Status;
  conditions: RuleConditions;
  tags: string[];
  rationale: string[];
  recommendedTools: ToolRecommendation[];
  saferWorkflow: string[];
}

export interface EvaluationResult {
  status: Status;
  toolRecommendations: ToolRecommendation[];
  rationale: string[];
  saferWorkflowSteps: string[];
  checklistText: string;
  matchedRules: string[];
}

export interface ExampleCase {
  id: string;
  title: string;
  answers: Answers;
  expectedStatus: Status;
  notes?: string;
}
