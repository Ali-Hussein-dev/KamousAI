"use client";
import { Checkbox, Menu, ActionIcon, Button } from "@mantine/core";
import { IoCopy } from "react-icons/io5";
import { useChat } from "ai/react";
import { TbChevronDown } from "react-icons/tb";
import * as React from "react";
import { type Message } from "ai";
import { AiOutlineClear } from "react-icons/ai";
import { useInputFocus } from "@/hooks/use-input-focus";
import { DynamicCustomTextarea } from "@/components/Mantine/custom-textarea";
import { CustomMenu } from "@/components/Mantine/custom-menu";
import { Markdown } from "@/components/Markdown";
import { useTextOptimizer } from "@/hooks/use-text-optimizer";
import { CustomTones } from "@/components/custom-tones";
import { IoStopCircleOutline } from "react-icons/io5";

const makeInstruction = (tones: string) => `
  Fix, optimize the following text to make it ${tones}, use the same language, don't answer questions, don't explain it, use more suitable synonyms if needed or as required.
  here is some expample:

  example 2:
  input: einen Fehler machen
  output: einen Fehler begehen
  text:
`;

//======================================
const TextToneOptionsMenu = ({
  setMessages,
  messages,
}: {
  setMessages: (m: Message[]) => void;
  messages: Message[];
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const tones = useTextOptimizer((s) => s.tones);
  return (
    <CustomMenu width={"210"} position="bottom-start" closeOnItemClick={false}>
      <Menu.Target>
        <Button
          radius="lg"
          pl="0"
          // left={{}}
          leftSection={<CustomTones />}
          rightSection={<TbChevronDown />}
          variant="light"
        >
          Text tone {selected.length > 0 && `(${selected.length})`}
        </Button>
      </Menu.Target>
      <Menu.Dropdown p={5} mah="300px" className="!overflow-y-auto">
        <Checkbox.Group
          value={selected}
          onChange={(value) => {
            setSelected(value);
            const content = makeInstruction(value.join(" "));
            console.log("🚀 ", content);
            const instruction: Message = {
              id: "instruction",
              role: "system",
              content,
            };
            const filtered = messages.filter((msg) => msg.role !== "system");
            setMessages([instruction, ...filtered]);
          }}
        >
          {tones.map((item) => (
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
    </CustomMenu>
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
    setInput,
  } = useChat({
    api: "/api/text-optimizer",
    initialMessages: [
      {
        role: "system",
        content: makeInstruction("standard"),
        id: "instruction-4040",
      },
    ],
    onResponse: () => {
      setInput(input);
    },
  });
  const { inputRef } = useInputFocus<HTMLTextAreaElement>();
  return (
    <section className="w-full rounded-lg bg-slate-800 px-3 py-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <DynamicCustomTextarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          placeholder="Enter text to optimize"
        />
        <div className="w-full gap-2 pb-2 flex-row-between">
          <TextToneOptionsMenu setMessages={setMessages} messages={messages} />
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
              w="6rem"
              disabled={!input}
            >
              Optimize
            </Button>
          </div>
        </div>
      </form>
      <div
        hidden={messages.length < 2}
        className="mt-4 space-y-2 rounded-lg px-1 py-4"
      >
        {messages
          .filter((msg) => msg.role === "assistant")
          .reverse()
          .map((msg, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-2 rounded bg-slate-700/60 px-3 py-4 text-slate-200"
            >
              <Markdown>{msg.content}</Markdown>
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
