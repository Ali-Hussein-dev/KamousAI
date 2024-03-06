"use client";
import { ActionIcon, Button, Checkbox } from "@mantine/core";
import { useChat } from "ai/react";
import * as React from "react";
import { DynamicCustomTextarea } from "@/components/Mantine/custom-textarea";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { ToolContainer } from "@/components/tool-container";
import { TextCard } from "@/components/shared/text-card";
import { ClearButton } from "@/components/shared/clear-button";
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
    <ToolContainer
      title="grammarCorrector"
      showRating={messages.length > 0 && (!isLoading || messages.length > 1)}
    >
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
            label="With explanation (beta)"
            checked={withExplanation}
            onChange={() => setWithExplanation(!withExplanation)}
          />
          <div className="gap-3 flex-row-start">
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
              <Button
                loading={isLoading}
                type="submit"
                radius="lg"
                w="6rem"
                disabled={!input}
              >
                Check
              </Button>
            )}
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
            <TextCard key={i} content={msg.content} />
          ))}
        <ClearButton
          isLoading={isLoading}
          visible={messages.length > 0}
          onClick={() => setMessages([])}
        />
      </div>
    </ToolContainer>
  );
}
