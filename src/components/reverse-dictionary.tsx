"use client";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { Button, Text, Textarea } from "@mantine/core";
import { type Message } from "ai";
import { useChat } from "ai/react";

// convert array to [1,2,3,4] --> [[1,2],[3,4]]
function convertToShape(a: Message[]) {
  const result = [];
  for (let i = 0; i < a.length; i += 2) {
    let pair = [];
    const isLastElement = i === a.length - 1;
    if (isLastElement) {
      pair = [a[i]];
    } else {
      pair = [a[i], a[i + 1]];
    }
    result.push(pair);
  }
  return result;
}
export const ReverseDictionary = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/reverse-dictionary",
    });
  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="mb-4 gap-3 flex-col-end">
        <Textarea
          label="Use when you know the meaning but not the word"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter the meaning here"
          minRows={5}
          className="w-full"
          styles={{
            input: {
               border: "1px solid var(--mantine-color-dark-5)"
            }
          }}
        />
        <Button type="submit" radius="lg" loading={isLoading}>
          Submit
        </Button>
      </form>
      <div
        hidden={messages.length < 1}
        className="space-y-2 rounded-lg bg-slate-800 px-4 pb-6 pt-5 text-slate-300"
      >
        {convertToShape(messages).map((arr, i) => (
          <div key={i}>
            {capitalizeFirstLetter(arr[1]?.content || "")}
            <Text
              styles={{
                root: {
                  color: "var(--mantine-color-dark-5)",
                },
              }}
              mb={4}
            >
              {capitalizeFirstLetter(arr[0]?.content || "")}
            </Text>
            <div className="h-[0.4px] w-full bg-slate-600" />
          </div>
        ))}
      </div>
    </div>
  );
};
