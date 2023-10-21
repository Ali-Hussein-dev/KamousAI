"use client";
import { ActionIcon, Button, Select, Textarea } from "@mantine/core";
import * as React from "react";
import languages from "../content/languages.json";
import { useCompletion } from "ai/react";
import { MdContentCopy } from "react-icons/md";
import { useClipboard, useMediaQuery } from "@mantine/hooks";
import { GiCheckMark } from "react-icons/gi";

const SelectLanguage = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) => {
  return (
    <Select
      searchable
      value={value}
      onChange={(lang) => setValue(lang || "en")}
      data={languages}
      placeholder="Select Language"
      bg="dark"
      variant="filled"
      radius="sm"
      classNames={{
        wrapper: "!bg-slate-800/70",
        input: "!bg-transparent",
        dropdown: "!bg-slate-800",
      }}
    />
  );
};

export const Translator = () => {
  const [inputLanguage, setInputLanguage] = React.useState("en");
  const [outputLanguage, setOutputLanguage] = React.useState("de");
  const { input, handleInputChange, handleSubmit, completion, isLoading } =
    useCompletion({
      api: "/api/translator",
      body: {
        inputLanguage,
        outputLanguage,
      },
    });
  const { copied, copy } = useClipboard({ timeout: 2000 });
  const matches = useMediaQuery("(max-width: 500px)");
  return (
    <form className=" w-full space-y-4" onSubmit={handleSubmit}>
      <div className="mx-auto flex w-full flex-col rounded-xl bg-slate-800 px-2 py-4 shadow-lg ">
        {/* // DIRECT WRAPPER */}
        <div className="mb-2 flex flex-wrap border-0 border-b border-solid border-slate-500 md:flex-nowrap ">
          {/* // INPUT language pane */}
          <div className="w-full gap-1 flex-col-start">
            <SelectLanguage value={inputLanguage} setValue={setInputLanguage} />

            <div className="w-full border-0 border-t border-solid border-slate-500 pl-1 pt-2">
              <Textarea
                value={input}
                onChange={handleInputChange}
                minRows={matches ? 6 : 14}
                maxRows={matches ? 8 : 14}
                autosize
                w="100%"
                placeholder="Enter text to translate"
                classNames={{
                  input:
                    "!bg-transparent !border-none !p-0 !font-medium !text-base",
                }}
              />
            </div>
          </div>

          {/* // OUTPUT language pane */}
          <div className="h-full w-full gap-1 flex-col-start">
            <SelectLanguage
              value={outputLanguage}
              setValue={setOutputLanguage}
            />
            <div className="min-h-[5rem] w-full border-0 border-t border-solid border-slate-500 p-2 font-semibold text-primary-300 ">
              {completion}
            </div>
          </div>
        </div>
        {completion && (
          <div className="w-full flex-row-end">
            <ActionIcon
              variant="outline"
              radius="md"
              size="lg"
              onClick={() => {
                copy(completion);
              }}
            >
              {copied ? <GiCheckMark /> : <MdContentCopy />}
            </ActionIcon>
          </div>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        mx="auto"
        radius="xl"
        w="100%"
        loading={isLoading}
        disabled={!input}
      >
        {isLoading ? "Translating..." : "Translate"}
      </Button>
    </form>
  );
};
