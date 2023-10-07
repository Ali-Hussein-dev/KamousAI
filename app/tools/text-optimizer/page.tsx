"use client";
import { Checkbox, Menu, ActionIcon, Button, Textarea } from "@mantine/core";
import { IoCopy } from "react-icons/io5";
import { useChat } from "ai/react";
import { TbChevronDown } from "react-icons/tb";
import * as React from "react";
import { type Message } from "ai";
import { AiOutlineClear } from "react-icons/ai";

const instuctionPrompt =
  "Fix, rephrase and optimize the following text to make it ";
const options = [
  {
    label: "Standard",
    value: "standard",
  },
  {
    label: "Friendly",
    value: "friendly",
  },
  {
    label: "Formal",
    value: "formal",
  },
  {
    label: "Informal",
    value: "informal",
  },
  {
    label: "Casual",
    value: "casual",
  },
];

//======================================
const TextToneOptionsMenu = ({
  setMessages,
  messages,
}: {
  setMessages: (m: Message[]) => void;
  messages: Message[];
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <Menu
      shadow="lg"
      width={170}
      position="bottom-start"
      closeOnItemClick={false}
    >
      <Menu.Target>
        <Button radius="lg" rightSection={<TbChevronDown />} variant="light">
          Select text tone
        </Button>
      </Menu.Target>
      <Menu.Dropdown p={5}>
        <Checkbox.Group
          value={selected}
          onChange={(value) => {
            setSelected(value);
            const content = instuctionPrompt + value.join(" ");
            const instruction: Message = {
              id: "instruction",
              role: "system",
              content,
            };
            const filtered = messages.filter((msg) => msg.role !== "system");
            setMessages([instruction, ...filtered]);
          }}
        >
          {options.map((item) => (
            <Menu.Item key={item.label} p="xs">
              <Checkbox
                key={item.label}
                value={item.value}
                label={item.label}
                classNames={{
                labelWrapper: "w-full",
              }}
            />
            </Menu.Item>
          ))}
        </Checkbox.Group>
      </Menu.Dropdown>
    </Menu>
  );
};

export default function TextOptimizer() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/text-optimizer",
    initialMessages: [
      {
        role: "system",
        content: `${instuctionPrompt} standard`,
        id: "instruction-4040",
      },
    ],
  });
  return (
    <section className="mx-auto max-w-2xl rounded-lg bg-slate-600 px-4 py-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter text here"
          autosize
          minRows={3}
        />
        <div className="w-full gap-2 pb-2 flex-row-between">
          <TextToneOptionsMenu setMessages={setMessages} messages={messages} />
          <Button type="submit" radius="lg" loading={isLoading}>
            Optimize
          </Button>
        </div>
      </form>
      <div
        hidden={messages.length < 2}
        className="mt-4 space-y-3 rounded-lg bg-slate-700 px-3 py-4"
      >
        {messages
          .filter((msg) => msg.role === "assistant")
          .map((msg, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-2 rounded-sm py-1 pb-1 text-slate-300"
            >
              {msg.content}
              <ActionIcon
                onClick={() => {
                  navigator.clipboard.writeText(msg.content);
                }}
                variant="light"
                radius="md"
              >
                <IoCopy />
              </ActionIcon>
            </div>
          ))}
        {messages.length > 1 && (
          <Button
            variant="light"
            opacity={isLoading ? 0 : 1}
            color="red"
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
