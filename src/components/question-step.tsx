import { OptionItem, OptionCard } from "./question-options";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

type QuestionStepProps<T extends string> = {
  title: string;
  description?: string;
  options: OptionItem<T>[];
  value?: T;
  onSelect: (val: T) => void;
  index: number;
  total: number;
};

export function QuestionStep<T extends string>({ title, description, options, value, onSelect, index, total }: QuestionStepProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white font-semibold">{index + 1}</div>
        <div className="space-y-2">
          <Badge className="w-fit" tone="default">
            Question {index + 1} of {total}
          </Badge>
          <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
          {description ? <p className="text-sm text-neutral-600">{description}</p> : null}
        </div>
      </div>
      <Card>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {options.map((opt) => (
            <OptionCard key={opt.value} option={opt} selected={opt.value === value} onSelect={onSelect} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
