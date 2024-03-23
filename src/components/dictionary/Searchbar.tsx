"use client";
import { ActionIcon, Badge, Loader, Autocomplete } from "@mantine/core";
import LanguagesMenu from "./languages-menu";
import { MdClear } from "react-icons/md";
import { BsStopCircle } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import * as React from "react";
import { useHistoryStore } from "@/hooks/use-history-store";
import { cn } from "@/utils/helpers";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CustomTextarea } from "../Mantine/custom-textarea";
import { useMediaQuery } from "@mantine/hooks";
import { EnterIcon } from "../shared/enter-icon";

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
  const isMobile = useMediaQuery("(max-width: 520px)");
  const iconSize = isMobile ? "15" : "20";
  const sharedBtnProps = {
    size: isMobile ? "md" : "xl",
    radius: "xl",
  };
  return (
    <form
      className="mb-6 w-full overflow-hidden rounded-full border border-solid border-slate-700 duration-300 focus-within:border-slate-600 focus-within:bg-slate-800/50 focus-within:shadow-2xl"
      onSubmit={handleSubmit}
    >
      <Autocomplete
        ref={inputRef}
        value={input}
        data={[...new Set(list)]}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onOptionSubmit={onOptionSubmit}
        placeholder="Enter text..."
        size={isMobile ? "lg" : "xl"}
        leftSectionPointerEvents="all"
        rightSectionWidth="auto"
        autoComplete="off"
        classNames={{
          input:
            "bg-transparent pl-[3.2rem] sm:pl-[4rem] border-0 text-base placeholder:text-slate-500 font-medium sm:tracking-wider",
          dropdown:
            "!bg-slate-800 !rounded-xl !border-[1px] !border-slate-700 !shadow-lg my-2",
          option: "rounded-xl capitalize",
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
          <div className="gap-x-2 pr-2 flex-row-start">
            {!!input ? (
              <>
                <ActionIcon
                  {...sharedBtnProps}
                  onClick={() => setInput("")}
                  variant="subtle"
                >
                  <MdClear size={iconSize} />
                </ActionIcon>
                <ActionIcon
                  {...sharedBtnProps}
                  onClick={() => setIsContextOpen(!isContextOpen)}
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
                  "hidden tracking-wider",
                  !!input || isLoading ? "hidden" : "md:inline-block"
                )}
              >
                {navigator.userAgent.includes("Mac") ? "cmd+K" : "ctrl+K"}
              </Badge>
            )}
            {isLoading ? (
              <ActionIcon {...sharedBtnProps} type="button" onClick={stop}>
                <BsStopCircle size={iconSize} />
              </ActionIcon>
            ) : (
              <div className="">
                {input ? (
                  <ActionIcon type="submit" {...sharedBtnProps}>
                    <EnterIcon />
                  </ActionIcon>
                ) : (
                  <div className="center size-8">
                    <FaSearch size={iconSize} className=" text-slate-500" />
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
                  <MdClear size={iconSize} />
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
