import { z } from "zod";

export const answersSchema = z.object({
  dataType: z.enum([
    "public",
    "draft",
    "copyrighted",
    "student_records",
    "human_subjects",
    "phi",
    "proprietary",
    "credentials",
  ]),
  destination: z.enum([
    "copilot",
    "local",
    "consumer_chatbot",
    "third_party",
    "not_sure_destination",
  ]),
  intent: z.enum(["brainstorm", "edit", "summarize", "analyze", "code", "create_visuals", "other"]),
  context: z.enum(["no_irb", "irb_approved", "irb_pending", "contract_restrictions", "not_sure_context"]),
  deidentification: z
    .enum(["deidentified", "limited", "identifiable", "not_sure_deid"])
    .optional(),
  copyrightPermission: z
    .enum(["has_permission", "fair_use_uncertain", "no_permission", "not_sure_permission"])
    .optional(),
});

export type AnswersInput = z.infer<typeof answersSchema>;
