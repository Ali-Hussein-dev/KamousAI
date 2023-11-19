"use client";
import { ActionIcon, Button, Text, Textarea } from "@mantine/core";
import { useChat } from "ai/react";
import { IoCopy } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import * as React from 'react'

export default function GrammerCheckerPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput
  } = useChat({
    api: "/api/grammer-checker",
    onResponse: () => {
      setInput(input)
    },
  });
  return (
    <section className="w-full rounded-lg bg-slate-800 px-3 py-6">
      <form className="gap-4 flex-col-end" onSubmit={handleSubmit}>
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="e.g I has an pen"
          // label="Enter text for correction"
          className="w-full"
          classNames={{
            input:
              "!bg-transparent !border-slate-600 focus:!border-slate-500 duration-200 !text-slate-400 focus:!text-slate-300 !font-medium",
            wrapper: "!bg-transparent",
          }}
          autosize
          minRows={4}
        />
        <Button loading={isLoading} type="submit" radius="lg">
          Check
        </Button>
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
              className="flex items-start justify-between gap-2 rounded bg-slate-700/60 px-3 py-4 text-slate-200"
              key={i}
            >
              <Text>{msg.content}</Text>
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
