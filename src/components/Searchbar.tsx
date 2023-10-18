"use client";
import { ActionIcon, Badge, Loader, Autocomplete } from "@mantine/core";
import SettingsDropdown from "./Dropdown";
import { MdClear } from "react-icons/md";
import clsx from "clsx";
import { BsFillSendFill, BsStopCircle } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import * as React from "react";
import { useHistoryStore } from "@/hooks/use-history-store";

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  complete: (v: string) => void;
  stop: () => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};
export const DictionarySearchbar = (props: Props) => {
  const { input, setInput, handleSubmit, stop, isLoading, inputRef, complete } =
    props;
  const history = useHistoryStore((s) => s.lexicalEntries);
  const list = React.useMemo(
    () => Object.values(history).map((o) => o.term),
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
  return (
    <form
      className="mb-6 w-full overflow-hidden rounded-2xl border border-solid border-slate-600 duration-300 focus-within:bg-slate-800/50 focus-within:shadow-2xl"
      onSubmit={handleSubmit}
    >
      <Autocomplete
        ref={inputRef}
        value={input}
        data={list}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onOptionSubmit={onOptionSubmit}
        placeholder="Enter your words..."
        size="xl"
        leftSectionPointerEvents="all"
        rightSectionWidth="auto"
        autoComplete="off"
        classNames={{
          input: "!bg-transparent !pl-[4rem] !border-0",
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
              <SettingsDropdown />
            )}
          </div>
        }
        rightSection={
          <div className="gap-x-2 pr-1 flex-row-start">
            {input && (
              <ActionIcon
                size="xl"
                onClick={() => setInput("")}
                radius="lg"
                variant="outline"
              >
                <MdClear size="20" />
              </ActionIcon>
            )}
            {!input && (
              <Badge
                bg="transparent"
                h="100%"
                fw={400}
                className={clsx(
                  "hidden",
                  !!input || isLoading ? "hidden" : "md:opacity-100"
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
    </form>
  );
};

