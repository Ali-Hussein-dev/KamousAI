"use client";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { Button, Text } from "@mantine/core";
import { type Message } from "ai";
import { useChat } from "ai/react";
import { CustomTextarea } from "./Mantine/custom-textarea";

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
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: "/api/reverse-dictionary",
    onResponse: () => {
      setInput(input);
    },
  });
  return (
    <section className="w-full rounded-lg bg-slate-800 px-3 py-6">
      <form onSubmit={handleSubmit} className="mb-4 w-full gap-3 flex-col-end ">
        <CustomTextarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter the meaning here"
        />
        <Button type="submit" radius="lg" loading={isLoading}>
          Submit
        </Button>
      </form>
      <div
        hidden={messages.length < 1}
        className="space-y-2 rounded-lg bg-slate-800 px-4 pb-6 pt-5 text-slate-300"
      >
        {convertToShape(messages)
          .reverse()
          .map((arr, i) => (
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
    </section>
  );
};
