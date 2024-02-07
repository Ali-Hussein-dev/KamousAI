"use client";
import { Button, Title } from "@mantine/core";

const examples = {
  reverseDictionary: [
    { label: "A person with so much interest in computers", value: "" },
    { label: "A tool used for protecting phone from being broken", value: "" },
  ],
  summarizer: [{ label: "", value: "" }],
  grammarCorrector: [{ label: "", value: "" }],
  paraphraser: [{ label: "", value: "" }],
};
export const ToolExamples = ({
  setInput,
  listName,
}: {
  setInput: (s: string) => void;
  listName?: keyof typeof examples;
}) => {
  if (!listName) return;
  return (
    <div className="animate-in mb-6 w-full gap-4 rounded-2xl px-3 pb-5 pt-10 flex-col-center">
      <Title order={2} className="text-lg md:text-xl">
        Try the following examples
      </Title>
      {examples[listName].map((o, i) => (
        <Button
          key={i}
          onClick={() => setInput(o.label)}
          size="lg"
          variant="light"
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
};
