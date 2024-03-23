"use client";
import { DynamicCustomTextarea } from "@/components/Mantine/custom-textarea";
import { ActionIcon, Button, SegmentedControl } from "@mantine/core";
import { useChat } from "ai/react";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import * as React from "react";
import { ToolContainer } from "@/components/tool-container";
import { TextCard } from "@/components/shared/text-card";
import { ClearButton } from "@/components/shared/clear-button";
//======================================
const SummarizerPage = () => {
  const [value, setValue] = React.useState("paragraph");
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    setMessages,
  } = useChat({
    api: "/api/summarizer",
    onResponse: () => {
      setInput(input);
    },
    body: { mode: value },
  });
  return (
    <ToolContainer
      title="summarizer"
      showRating={messages.length > 0 && (!isLoading || messages.length > 1)}
    >
      <form onSubmit={handleSubmit} className="mb-4 w-full gap-3 flex-col-end ">
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
                onClick={() => setInput("")}
              >
                <MdClear size="20" />
              </ActionIcon>
            ) : undefined
          }
        />
        <div className="w-full gap-3 flex-row-between ">
          <SegmentedControl
            value={value}
            onChange={setValue}
            data={[
              { label: "Paragraph", value: "paragraph" },
              { label: "Bullet points", value: "bullet points" },
            ]}
            color="#424e88"
          />
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
              <Button
                loading={isLoading}
                type="submit"
                radius="lg"
                // w="7rem"
                disabled={!input}
                data-umami-event="summarizer"
              >
                Summarize
              </Button>
            )}
          </div>
        </div>
      </form>
      <div
        hidden={messages.length < 1}
        className="space-y-2 rounded-lg pt-5 text-slate-300"
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
};
export default SummarizerPage;
