"use client";
import * as React from "react";
import { useChat } from "ai/react";
import { ActionIcon, Button } from "@mantine/core";
import { MdClear } from "react-icons/md";
import { IoStopCircleOutline } from "react-icons/io5";
import { useTextOptimizer } from "@/hooks/use-text-optimizer";
import { ToolContainer } from "../tool-container";
import { DynamicCustomTextarea } from "../Mantine/custom-textarea";
import { TonesSelect } from "./customize-paraphraser";
import { TextCard } from "../shared/text-card";
import { ClearButton } from "../shared/clear-button";
import { useQueryParaphraser } from "@/hooks/use-query-paraphraser";

//======================================
export const ParaphraserMain = () => {
  // tones select
  const [selected, setSelected] = React.useState<string[]>([]);

  const history = useTextOptimizer((s) => s.history);
  const setHistory = useTextOptimizer((s) => s.setHistory);
  const { data } = useQueryParaphraser();
  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/text-optimizer",
    initialMessages: history,
    onResponse: () => {
      setInput(input);
    },
    onFinish: (d) => {
      setHistory([...history.slice(-5), d]);
    },
    body: {
      tones: selected.join(", "),
      temperature: data?.configs?.temperature ?? 1,
    },
  });
  return (
    <ToolContainer
      title="paraphraser"
      showRating={messages.length > 0 && (!isLoading || messages.length > 1)}
    >
      {/* //---------------------------------------------------INPUT AREA */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <DynamicCustomTextarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter text"
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
                size="lg"
                onClick={() => setInput("")}
              >
                <MdClear size="20" />
              </ActionIcon>
            ) : undefined
          }
        />
        <div className="w-full gap-2 pb-2 flex-row-between">
          {/* //---------------------------------------------------CUSTOMIZATION */}
          <TonesSelect
            selected={selected}
            setSelected={setSelected}
            tones={data?.configs?.tones ?? []}
          />
          <div className="gap-3 flex-row-start">
            {isLoading ? (
              <ActionIcon
                type="button"
                onClick={stop}
                radius="lg"
                size="lg"
                variant="light"
              >
                <IoStopCircleOutline size="20" />
              </ActionIcon>
            ) : (
              <Button
                loading={isLoading}
                type="submit"
                radius="lg"
                w="fit-content"
                disabled={!input}
                data-umami-event="paraphraser"
              >
                Improve writing
              </Button>
            )}
          </div>
        </div>
      </form>
      {/* //---------------------------------------------------OUTPUT AREA */}
      <div hidden={messages.length < 2} className="px-1 py-4">
        {messages
          .filter((msg) => msg.role === "assistant")
          .reverse()
          .map((msg, i) => (
            <TextCard
              key={i}
              content={msg.content}
              // drop={() => {
              //   const modified = history;
              //   modified.splice(i, 1);
              //   console.log({ i, original: modified });
              //   setHistory(modified);
              //   setMessages(modified);
              // }}
            />
          ))}
        <ClearButton
          isLoading={isLoading}
          visible={messages.length > 0}
          onClick={() => {
            setMessages([]);
            setHistory([]);
          }}
        />
      </div>
    </ToolContainer>
  );
};
