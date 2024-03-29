"use client";
import { ActionIcon, Button, Select, Textarea } from "@mantine/core";
import * as React from "react";
import languages from "../content/languages.json";
import { useCompletion } from "ai/react";
import { useMediaQuery } from "@mantine/hooks";
import { TbSwitchHorizontal } from "react-icons/tb";
import { useTranslator } from "@/hooks/use-translator";
import { CopyButton } from "./shared/copy-button";
import { Markdown } from "./shared/Markdown";
import { ToolRating } from "./tool-rating";

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
      onChange={(lang) => {
        console.log(lang);
        setValue(lang || "en");
      }}
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
      maw="7rem"
    />
  );
};

const Translator = () => {
  const tr = useTranslator();

  const { input, handleInputChange, handleSubmit, completion, isLoading } =
    useCompletion({
      api: "/api/translator",
      body: {
        inputLanguage: tr.input.label,
        outputLanguage: tr.output.label,
      },
    });
  const matches = useMediaQuery("(max-width: 500px)");
  return (
    <form className=" w-full space-y-4" onSubmit={handleSubmit}>
      <div className="animate-in mx-auto flex w-full flex-col rounded-xl bg-slate-900/40 px-2 py-4 shadow-lg md:px-4">
        {/* // DIRECT WRAPPER */}
        <div className="mb-2 flex flex-wrap items-start border-0 border-b border-solid border-slate-500 pb-2 md:flex-nowrap">
          {/* // INPUT language pane */}
          <div className="w-full gap-1 pb-2 flex-col-start">
            <SelectLanguage
              value={tr.input.value}
              setValue={(value: string) => {
                tr.setLanguage("input", {
                  value,
                  label: languages.find((obj) => obj.value == value)
                    ?.label as string,
                });
              }}
            />

            <div className="w-full border-0 border-t border-solid border-slate-500 pt-2 md:pr-4">
              <Textarea
                value={input}
                onChange={handleInputChange}
                minRows={matches ? 6 : 14}
                // maxRows={matches ? 8 : 14}
                autosize
                w="100%"
                placeholder="Enter text to translate"
                classNames={{
                  input:
                    "bg-transparent border-none p-0 text-base prose prose-slate leading-7 text-primary-100",
                }}
              />
            </div>
          </div>

          {/* // OUTPUT language pane */}
          <div className="h-full w-full gap-1 flex-col-start">
            <div className="w-full flex-row-between">
              <ActionIcon onClick={tr.swapLanguages} size="lg" radius="md">
                <TbSwitchHorizontal className="" size="17" />
              </ActionIcon>
              <SelectLanguage
                value={tr.output.value}
                setValue={(value: string) => {
                  tr.setLanguage("output", {
                    value,
                    label: languages.find((obj) => obj.value == value)
                      ?.label as string,
                  });
                }}
              />
            </div>
            <div className="min-h-[5rem] w-full border-0 border-t border-solid border-slate-500 px-2 font-semibold text-primary-100 md:pl-2">
              <Markdown>{completion}</Markdown>
            </div>
          </div>
        </div>
        {completion && (
          <div className="w-full flex-row-end">
            <CopyButton text={completion} />
          </div>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        mx="auto"
        radius="xl"
        className="block w-full md:max-w-xs"
        loading={isLoading}
        disabled={!input}
      >
        Translate
      </Button>
      {!!completion && !isLoading && (
        <div className="pb-6 pt-8">
          <ToolRating />
        </div>
      )}
    </form>
  );
};
 export default Translator;