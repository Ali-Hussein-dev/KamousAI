"use client";
import { ActionIcon, Button, Paper, Text, Textarea } from "@mantine/core";
import { useChat } from "ai/react";
import { IoCopy } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";

export default function GrammerCheckerPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/grammer-checker",
  });
  return (
    <div className="h-full w-full">
      <Paper p="lg" className="mx-auto max-w-2xl border" shadow="sm" bg="dark">
        <form className="gap-4 flex-col-end" onSubmit={handleSubmit}>
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="e.g I has an pen"
            label="Enter text for correction"
            className="w-full"
          />
          <Button loading={isLoading} type="submit" radius="lg">
            Check
          </Button>
        </form>
        <div className="space-y-3 px-1 pt-4 text-teal-100">
          {messages
            .filter((msg) => msg.role === "assistant")
            .map((msg, i) => (
              <div className="group mb-3 gap-2 flex-row-between" key={i}>
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
              rightSection={<AiOutlineClear />}
              onClick={() => setMessages([])}
            >
              Clear
            </Button>
          )}
        </div>
      </Paper>
    </div>
  );
}
