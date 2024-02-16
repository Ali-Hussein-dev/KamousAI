"use client";
import { Checkbox, Menu, ActionIcon, Button } from "@mantine/core";
import { useChat } from "ai/react";
import { TbChevronDown } from "react-icons/tb";
import * as React from "react";
import { AiOutlineClear } from "react-icons/ai";
import { DynamicCustomTextarea } from "@/components/Mantine/custom-textarea";
import { CustomMenu } from "@/components/Mantine/custom-menu";
import { Markdown } from "@/components/Markdown";
import { useTextOptimizer } from "@/hooks/use-text-optimizer";
import { CustomTones } from "@/components/custom-tones";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { CopyButton } from "@/components/copy-button";
import { ToolContainer } from "@/components/tool-container";

//======================================
const TextToneOptionsMenu = ({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: (s: string[]) => void;
}) => {
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
  const history = useTextOptimizer((s) => s.history);
  const setHistory = useTextOptimizer((s) => s.setHistory);
  const [selected, setSelected] = React.useState<string[]>([]);
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
    initialMessages: history,
    onResponse: () => {
      setInput(input);
    },
    onFinish: (d) => {
      setHistory([...history.slice(-5), d]);
    },
    body: {
      tones: selected.join(", "),
    },
  });
  return (
    <ToolContainer
      title="paraphraser"
      showRating={messages.length > 0 && (!isLoading || messages.length > 1)}
    >
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
                onClick={() => setInput("")}
              >
                <MdClear size="20" />
              </ActionIcon>
            ) : undefined
          }
        />
        <div className="w-full gap-2 pb-2 flex-row-between">
          <TextToneOptionsMenu selected={selected} setSelected={setSelected} />
          <div className="gap-3 flex-row-start">
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
                w="fit-content"
                disabled={!input}
              >
                Paraphrase
              </Button>
            )}
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
              <CopyButton text={msg.content} />
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
    </ToolContainer>
  );
}
