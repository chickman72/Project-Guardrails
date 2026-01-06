import { NextResponse } from "next/server";
import { answersSchema } from "@/lib/schema";
import { evaluateAnswers } from "@/lib/evaluator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = answersSchema.parse(body);
    const result = evaluateAnswers(parsed);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
