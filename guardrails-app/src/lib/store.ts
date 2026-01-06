import { Answers, EvaluationResult } from "./types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const fallbackStorage: Storage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  key: () => null,
  clear: () => undefined,
  length: 0,
};

type AssistantStore = {
  answers: Partial<Answers>;
  result?: EvaluationResult;
  setAnswer: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  setAnswers: (next: Partial<Answers>) => void;
  setResult: (result: EvaluationResult) => void;
  reset: () => void;
};

const initialAnswers: Partial<Answers> = {};

export const useAssistantStore = create<AssistantStore>()(
  persist(
    (set) => ({
      answers: initialAnswers,
      setAnswer: (key, value) =>
        set((state) => ({
          answers: { ...state.answers, [key]: value },
        })),
      setAnswers: (next) =>
        set((state) => ({
          answers: { ...state.answers, ...next },
        })),
      setResult: (result) => set({ result }),
      reset: () => set({ answers: initialAnswers, result: undefined }),
    }),
    {
      name: "guardrails-assistant",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? sessionStorage : fallbackStorage)),
      skipHydration: true,
    }
  )
);

export const rehydrateAssistantStore = () => useAssistantStore.persist?.rehydrate?.();
