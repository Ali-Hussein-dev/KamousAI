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
    <div className="mx-auto w-full rounded-lg bg-slate-600 px-4 py-6">
      <form className="gap-4 flex-col-end" onSubmit={handleSubmit}>
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="e.g I has an pen"
          label="Enter text for correction"
          className="w-full"
          autosize
          minRows={3}
        />
        <Button loading={isLoading} type="submit" radius="lg">
          Check
        </Button>
      </form>
      <div
        hidden={messages.length < 1}
        className="mt-4 space-y-3 rounded-lg bg-slate-700 px-3 py-4"
      >
        {messages
          .filter((msg) => msg.role === "assistant")
          .map((msg, i) => (
            <div
              className="group mb-3 flex items-start justify-between gap-2"
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
    </div>
  );
}
