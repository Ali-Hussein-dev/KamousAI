"use client";
import { CopyButton } from "@/components/copy-button";
import { DynamicCustomTextarea } from "@/components/Mantine/custom-textarea";
import { Markdown } from "@/components/Markdown";
import { ActionIcon, Button } from "@mantine/core";
import { useChat } from "ai/react";
import { AiOutlineClear } from "react-icons/ai";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";

//======================================
const SummarizerPage = () => {
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
  });
  return (
    <section className="w-full rounded-lg bg-slate-800 px-3 py-6">
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
            // w="7rem"
            disabled={!input}
          >
            Summarize
          </Button>
        </div>
      </form>

      <div
        hidden={messages.length < 1}
        className="space-y-2 rounded-lg bg-slate-800 pt-5 text-slate-300"
      >
        {messages
          .filter((msg) => msg.role === "assistant")
          .reverse()
          .map((msg, i) => (
            <div key={i} className="">
              <div
                className="flex items-start justify-between gap-2 rounded bg-slate-700/60 px-3 pb-2 pt-4 text-slate-200"
                key={i}
              >
                <Markdown>{msg.content}</Markdown>
                <CopyButton text={msg.content} />
              </div>
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
};
export default SummarizerPage;
