"use client";
import { Button, Paper, Text, Textarea } from "@mantine/core";

import { useChat } from "ai/react";

export const metadata = {
  title: "KamousAI | Grammer Checker",
  description: "Check your grammer with KamousAI",
};

export default function GrammerCheckerPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
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
        <div className="pl-1 text-teal-100">
          {messages
            .filter((msg) => msg.role === "assistant")
            .map((msg, i) => (
              <Text key={i}>{msg.content}</Text>
            ))}
        </div>
      </Paper>
    </div>
  );
}
