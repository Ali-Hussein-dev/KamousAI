"use client";
import {
  ActionIcon,
  Button,
  Card,
  SegmentedControl,
  Text,
  Title,
} from "@mantine/core";
import { type Message } from "ai";
import { useChat } from "ai/react";
import { DynamicCustomTextarea } from "./Mantine/custom-textarea";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { CopyButton } from "./shared/copy-button";
import { Markdown } from "./shared/Markdown";
import * as React from "react";
import { ToolContainer } from "./tool-container";
import { ClearButton } from "./shared/clear-button";
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

const examples = [
  {
    label: "Describe someone",
    value: "A person who is silent and reserved in nature.",
  },
  {
    label: "Describe something",
    value: "Something is used to protect eyes from sun and dust.",
  },
  {
    label: "Describe someone with context",
    value:
      "A person who is very knowledgeable about or skilled in a particular area. (slang)",
  },
];
const Onboarding = ({ setInput }: { setInput: (s: string) => void }) => {
  return (
    <div className="mx-auto px-4 py-7">
      <Title order={3} className="mb-3 text-center">
        Try the following Examples
      </Title>
      <div className="mx-auto max-w-xl space-y-3 pt-1 flex-col-center">
        {examples.map((o, i) => (
          <Card
            classNames={{
              root: "hover:border-slate-500 border border-transparent cursor-pointer bg-slate-700 duration-300 w-full rounded-lg p-4",
            }}
            key={i}
            onClick={() => setInput(o.value)}
          >
            <Card.Section className="m-0 font-semibold">{o.label}</Card.Section>
            <Card.Section className="m-0 text-slate-300">
              {o.value}
            </Card.Section>
          </Card>
        ))}
      </div>
    </div>
  );
};
export const ReverseDictionary = () => {
  const [value, setValue] = React.useState("3");
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    setMessages,
  } = useChat({
    api: "/api/reverse-dictionary",
    onResponse: () => {
      setInput(input);
    },
    body: {
      // suggestions count
      count: value,
    },
  });
  return (
    <div className="space-y-4">
      <ToolContainer
        title="reverseDictionary"
        showRating={messages.length > 0 && (!isLoading || messages.length > 1)}
      >
        <form
          onSubmit={handleSubmit}
          className="mb-4 w-full gap-3 flex-col-end "
        >
          <DynamicCustomTextarea
            value={input}
            onChange={handleInputChange}
            placeholder="Enter the meaning here"
            cb={(e) =>
              // @ts-expect-error waiting for update from the libray maintainer link: https://github.com/vercel/ai/discussions/799
              handleSubmit(e)
            }
            loading={isLoading}
            rightSection={
              !!input ? (
                <ActionIcon
                  variant="subtle"
                  radius="lg"
                  onClick={() => setInput("")}
                >
                  <MdClear size="20" />
                </ActionIcon>
              ) : undefined
            }
          />
          <div className="w-full gap-3 flex-row-between ">
            <div className="">
              <p className="m-0">Max suggestions</p>
              <SegmentedControl
                value={value}
                onChange={setValue}
                data={[
                  { label: "3", value: "3" },
                  { label: "5", value: "5" },
                ]}
                color="#424e88"
                className="w-full"
              />
            </div>
            <div className="gap-3 flex-row-end">
              {isLoading ? (
                <ActionIcon
                  type="button"
                  onClick={stop}
                  radius="lg"
                  size="xl"
                  variant="light"
                >
                  <IoStopCircleOutline size="20" />
                </ActionIcon>
              ) : (
                <Button type="submit" radius="lg" disabled={!input}>
                  Get definition
                </Button>
              )}
            </div>
          </div>
        </form>
        <div hidden={messages.length < 1} className="space-y-2 pb-2 pt-5">
          {convertToShape(messages)
            .reverse()
            .map((arr, i) => (
              <div
                key={i}
                className="rounded-lg bg-slate-700/60 p-2 text-slate-200"
              >
                <div className="flex justify-between gap-2">
                  <div>
                    <Markdown>{arr[1]?.content || ""}</Markdown>
                    <Text
                      styles={{
                        root: {
                          color: "var(--mantine-color-dark-5)",
                        },
                      }}
                      className="first-letter:uppercase"
                      mb={4}
                    >
                      {arr[0]?.content || ""}
                    </Text>
                  </div>
                  <CopyButton text={arr[1]?.content ?? ""} />
                </div>
                <div className="h-[0.4px] w-full bg-slate-600" />
              </div>
            ))}
          <ClearButton
            isLoading={isLoading}
            visible={messages.length > 0}
            onClick={() => {
              setMessages([]);
              setInput("");
            }}
          />
        </div>
      </ToolContainer>
      <Onboarding setInput={setInput} />
    </div>
  );
};