"use client";
import { ActionIcon, Button, Checkbox } from "@mantine/core";
import { useChat } from "ai/react";
import { IoCopy } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import * as React from "react";
import { DynamicCustomTextarea } from "@/components/Mantine/custom-textarea";
import { Markdown } from "@/components/Markdown";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
export default function GrammerCheckerPage() {
  const [withExplanation, setWithExplanation] = React.useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
    stop,
  } = useChat({
    api: "/api/grammer-checker",
    onResponse: () => {
      setInput(input);
    },
    body: {
      withExplanation,
    },
  });

  return (
    <section className="w-full rounded-lg bg-slate-800 px-3 py-6">
      <form className="gap-4 flex-col-end" onSubmit={handleSubmit}>
        <DynamicCustomTextarea
          value={input}
          onChange={handleInputChange}
          placeholder="e.g I has an pen"
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
        <div className="w-full flex-row-between">
          <Checkbox
            value={""}
            label="With explanation"
            checked={withExplanation}
            onChange={() => setWithExplanation(!withExplanation)}
          />
          <div className="gap-3 flex-row-start">
            {isLoading && (
              <ActionIcon
                type="button"
                onClick={stop}
                radius="lg"
                size="lg"
                variant="light"
              >
                <IoStopCircleOutline size="17" />
              </ActionIcon>
            )}
            <Button
              loading={isLoading}
              type="submit"
              radius="lg"
              w="6rem"
              disabled={!input}
            >
              Check
            </Button>
          </div>
        </div>
      </form>
      <div
        hidden={messages.length < 1}
        className="mt-4 space-y-2 rounded-lg px-1 py-4"
      >
        {messages
          .filter((msg) => msg.role === "assistant")
          .reverse()
          .map((msg, i) => (
            <div
              className="flex items-start justify-between gap-2 rounded bg-slate-700/60 px-3 pb-2 pt-4 text-slate-200"
              key={i}
            >
              <Markdown>{msg.content}</Markdown>
              <ActionIcon
                radius="md"
                type="button"
                variant="light"
                onClick={() => {
                  navigator.clipboard.writeText(msg.content);
                }}
              >
                <IoCopy />
              </ActionIcon>
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
    </section>
  );
}
