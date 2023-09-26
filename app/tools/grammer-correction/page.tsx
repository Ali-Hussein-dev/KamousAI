"use client";
import { ActionIcon, Button, Paper, Text, Textarea } from "@mantine/core";

import { useChat } from "ai/react";
import { IoCopy } from "react-icons/io5";

export default function GrammerCheckerPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
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
            placeholder="example text"
            label="Enter text to be corrected"
            className="w-full"
          />
          <Button type="submit" radius="lg">
            Check
          </Button>
        </form>
        <div className="px-1 pt-4 text-teal-100 space-y-3">
          {messages
            .filter((msg) => msg.role === "assistant")
            .map((msg, i) => (
              <div className="group gap-2 flex-row-between" key={i}>
                <Text>{msg.content}</Text>
                <ActionIcon
                  radius="md"
                  type="button"
                  variant="light"
                  // className="!hidden group-hover:inline-block"
                  onClick={() => {
                    navigator.clipboard.writeText(msg.content);
                  }}
                >
                  <IoCopy />
                </ActionIcon>
              </div>
            ))}
        </div>
      </Paper>
    </div>
  );
}
