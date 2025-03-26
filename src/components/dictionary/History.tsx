"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useHistoryStore } from "@/hooks/use-history-store";
import { Accordion, Button } from "@mantine/core";
import React from "react";
import { TbHistory } from "react-icons/tb";
import { WordEntryTabs } from "./definitions-card";
import { AudioCtxButton } from "./Audio";
import { Markdown } from "../shared/Markdown";
import { MdOutlineClear } from "react-icons/md";
import { useVoiceContext } from "@/hooks/use-voice-context";
import { ToolRating } from "../tool-rating";
import { cn } from "@/utils/helpers";

type HistoryItemProps = {
  definition: string;
  id: string;
  term: string;
  remove: () => void;
};
const HistoryItem = ({ definition, id, term, remove }: HistoryItemProps) => {
  const { play, isFetching } = useVoiceContext({ text: term });
  return (
    <Accordion.Item value={id}>
      <Accordion.Control>
        <div className="flex w-full items-center justify-start gap-3">
          <span className="text-xl font-bold tracking-wider text-theme-secondary first-letter:uppercase">
            {term}
          </span>
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold uppercase text-primary-600">{term}</span>
            <AudioCtxButton isLoadingAudio={isFetching} playAudio={play} />
            <div className="grow flex-row-end">
              <Button
                radius="lg"
                variant="outline"
                onClick={() => remove()}
                classNames={{
                  root: "!border-slate-500",
                }}
                rightSection={<MdOutlineClear />}
              >
                Remove word
              </Button>
            </div>
          </div>
          <Markdown>{definition}</Markdown>
          <WordEntryTabs term={term} id={id} />
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
//---------------------------------------------------DictionaryHistory
export const DictionaryHistory = () => {
  const lexicalEntries = useHistoryStore((s) => s.lexicalEntries);
  const removeWordEntry = useHistoryStore((s) => s.setLexicalEntries);
  const [open, setOpen] = React.useState(false);
  const cached = Object.entries(lexicalEntries)
    .sort((a, b) => b[1].createdAt - a[1].createdAt)
    .map(([key, value]) => (
      <HistoryItem
        key={key}
        definition={value.definition}
        id={key}
        term={value.term}
        remove={() => {
          removeWordEntry(key, undefined);
          useHistoryStore.persist.rehydrate();
        }}
      />
    ));
  if (cached.length < 1) return null;

  return (
    <>
      <Button
        radius="xl"
        w="100%"
        variant="light"
        size="lg"
        className="duration-300 hover:shadow-lg"
        onClick={() => setOpen(!open)}
        leftSection={<TbHistory />}
      >
        {open ? "Hide" : "View"} History
      </Button>
      {open ? (
        <div className={cn("pt-6 text-slate-300")}>
          <Accordion>{cached}</Accordion>
        </div>
      ) : null}
      <div className="my-8">
        <ToolRating />
      </div>
    </>
  );
};
