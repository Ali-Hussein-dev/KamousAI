"use client";
import { ActionIcon, Badge, Loader, Autocomplete } from "@mantine/core";
import LanguagesMenu from "./languages-menu";
import { MdClear } from "react-icons/md";
import { BsFillSendFill, BsStopCircle } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import * as React from "react";
import { useHistoryStore } from "@/hooks/use-history-store";
import { cn } from "@/utils/helpers";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CustomTextarea } from "../Mantine/custom-textarea";

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  complete: (v: string) => void;
  stop: () => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  context: string;
  setContext: React.Dispatch<React.SetStateAction<string>>;
};
export const DictionarySearchbar = (props: Props) => {
  const {
    input,
    setInput,
    handleSubmit,
    stop,
    isLoading,
    inputRef,
    complete,
    context,
    setContext,
  } = props;
  const history = useHistoryStore((s) => s.lexicalEntries);
  const list = React.useMemo(
    () =>
      Object.values(history)
        .slice(-10)
        .map((o) => o?.term),
    [history]
  );
  const onChange = (value: string) => {
    setInput(value);
  };
  const onOptionSubmit = (value: string) => {
    setInput(value);
    if (!value) return;
    else {
      complete(value);
    }
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      !!input && complete(input);
    }
  };
  const [isContextOpen, setIsContextOpen] = React.useState(false);
  return (
    <form
      className="mb-6 w-full overflow-hidden rounded-2xl border border-solid border-slate-600 duration-300 focus-within:bg-slate-800/50 focus-within:shadow-2xl"
      onSubmit={handleSubmit}
    >
      <Autocomplete
        ref={inputRef}
        value={input}
        data={[...new Set(list)]}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onOptionSubmit={onOptionSubmit}
        placeholder="Enter your words..."
        size="xl"
        leftSectionPointerEvents="all"
        rightSectionWidth="auto"
        autoComplete="off"
        classNames={{
          input: "!bg-transparent !pl-[4rem] !border-0 !text-base",
          dropdown:
            "!bg-slate-800 !rounded-2xl !border-b-2 !border-0 !border-slate-300 !shadow-lg mt-2",
          option: "!rounded-2xl capitalize",
        }}
        leftSection={
          <div className="h-full w-full rounded-l-xl">
            {isLoading ? (
              <div className="center h-full w-full">
                <Loader color="white" size="sm" variant="dots" />
              </div>
            ) : (
              <LanguagesMenu />
            )}
          </div>
        }
        rightSection={
          <div className="gap-x-2 pr-1 flex-row-start">
            {input ? (
              <>
                <ActionIcon
                  size="xl"
                  onClick={() => setInput("")}
                  radius="xl"
                  variant="outline"
                >
                  <MdClear size="20" />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  onClick={() => setIsContextOpen(!isContextOpen)}
                  radius="md"
                  variant="light"
                  pos="relative"
                  className="overflow-visible"
                >
                  {!!context && (
                    <span className="absolute right-0 top-0 isolate z-10 inline-flex size-3 -translate-y-1 translate-x-1 rounded-full bg-primary-600"></span>
                  )}
                  <FaClipboardQuestion />
                </ActionIcon>
              </>
            ) : (
              <Badge
                bg="transparent"
                c="gray"
                h="100%"
                fw={400}
                className={cn(
                  "hidden",
                  !!input || isLoading ? "hidden" : "md:inline-block"
                )}
              >
                {navigator.userAgent.includes("Mac") ? "cmd+K" : "ctrl+K"}
              </Badge>
            )}
            {isLoading ? (
              <ActionIcon size="xl" type="button" onClick={stop} radius="lg">
                <BsStopCircle size="24" />
              </ActionIcon>
            ) : (
              <div className="">
                {input ? (
                  <ActionIcon size="xl" type="submit" radius="lg">
                    <BsFillSendFill size="17" />
                  </ActionIcon>
                ) : (
                  <div className="p-2">
                    <FaSearch size="20" />
                  </div>
                )}
              </div>
            )}
          </div>
        }
      />
      {isContextOpen && (
        <div className="px-2 pb-2 pt-3">
          <CustomTextarea
            value={context}
            onChange={(e) => setContext(e.currentTarget.value)}
            minRows={2}
            maxRows={3}
            rightSection={
              !!context && (
                <ActionIcon
                  onClick={() => setContext("")}
                  radius="md"
                  variant="outline"
                >
                  <MdClear size="20" />
                </ActionIcon>
              )
            }
            placeholder="Provide a context for more relevant output"
            classNames={{
              wrapper:
                "flex justify-center items-start p-3 bg-slate-700/40 rounded-2xl focus-within:bg-slate-700/70",
              input:
                "border-none focus:outline-none w-full bg-transparent resize-none font-medium placeholder:text-slate-500 text-base tracking-wide",
            }}
            cb={() => {
              complete(input);
              setIsContextOpen(false);
            }}
          />
        </div>
      )}
    </form>
  );
};
