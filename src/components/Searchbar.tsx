"use client";
import { ActionIcon, Badge, Divider, Loader, TextInput } from "@mantine/core";
import SettingsDropdown from "./Dropdown";
import { MdClear } from "react-icons/md";
import clsx from "clsx";
import { BsFillSendFill, BsStopCircle } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import * as React from "react";

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  stop: () => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}
export const DictionarySearchbar = (props:Props) => {
  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    stop,
    isLoading,
    inputRef,
  } = props
  return (
    <form
      className="mb-6 w-full overflow-hidden rounded-2xl border border-solid border-slate-600 duration-300 focus-within:bg-slate-800/50 focus-within:shadow-2xl"
      onSubmit={handleSubmit}
    >
      <TextInput
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        placeholder="Enter your words..."
        size="xl"
        leftSectionPointerEvents="all"
        rightSectionWidth="auto"
        autoComplete="off"
        classNames={{
          input: "!bg-transparent !pl-[4rem] !border-0",
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
            <Divider orientation="vertical" hidden={isLoading} />
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
