"use client";
import { ActionIcon, Button, SegmentedControl, Text } from "@mantine/core";
import { type Message } from "ai";
import { useChat } from "ai/react";
import { DynamicCustomTextarea } from "./Mantine/custom-textarea";
import { AiOutlineClear } from "react-icons/ai";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { CopyButton } from "./copy-button";
import { Markdown } from "./Markdown";
import * as React from "react";
import { ToolContainer } from "./tool-container";
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
    <ToolContainer title="reverseDictionary">
      <form onSubmit={handleSubmit} className="mb-4 w-full gap-3 flex-col-end ">
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
      <div
        hidden={messages.length < 1}
        className="space-y-2 rounded-lg bg-slate-800 pt-5 text-slate-300"
      >
        {convertToShape(messages)
          .reverse()
          .map((arr, i) => (
            <div key={i} className="">
              <div className="flex justify-between gap-2">
                <div className="">
                  {/* <p className="my-0 first-letter:uppercase">
                    {arr[1]?.content || ""}
                  </p> */}
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
                <CopyButton text={"msg.content"} />
              </div>
              <div className="h-[0.4px] w-full bg-slate-600" />
            </div>
          ))}
        {messages.length > 0 && (
          <Button
            variant="light"
            color="red"
            opacity={isLoading ? 0 : 1}
            leftSection={<AiOutlineClear />}
            onClick={() => setMessages([])}
          >
            Clear
          </Button>
        )}
      </div>
    </ToolContainer>
  );
};