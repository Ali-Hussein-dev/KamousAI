"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useHistoryStore } from "@/hooks/use-history-store";
import { ActionIcon, Button } from "@mantine/core";
import React from "react";
import { TbHistory } from "react-icons/tb";
import { WordEntryTabs } from "./definitions-card";
import { AudioCtxButton } from "./Audio";
import { Markdown } from "../Markdown";
import { MdOutlineClear } from "react-icons/md";
import { useVoiceContext } from "@/hooks/use-voice-context";
import { ToolRating } from "../tool-rating";
import { cn } from "@/utils/helpers";

const Card = ({
  definition,
  id,
  term,
  remove,
}: {
  definition: string;
  id: string;
  term: string;
  remove: () => void;
}) => {
  const { play, isFetching } = useVoiceContext({ text: term });
  return (
    <div className="rounded-xl bg-slate-900/40 px-3 pb-4 pt-6 shadow">
      <div className="mb-2 flex-row-between">
        <div className="gap-3 flex-row-start">
          <span className="block font-bold uppercase text-primary-600">
            {term}
          </span>
          <AudioCtxButton isLoadingAudio={isFetching} playAudio={play} />
        </div>
        <ActionIcon
          radius="lg"
          variant="outline"
          onClick={() => remove()}
          classNames={{
            root: "!border-slate-500",
          }}
        >
          <MdOutlineClear />
        </ActionIcon>
      </div>
      <Markdown>{definition}</Markdown>
      <WordEntryTabs term={term} id={id} />
    </div>
  );
};

export const DictionaryHistory = () => {
  const lexicalEntries = useHistoryStore((s) => s.lexicalEntries);
  const removeWordEntry = useHistoryStore((s) => s.setLexicalEntries);
  const [open, setOpen] = React.useState(false);
  const cached = Object.entries(lexicalEntries)
    .sort((a, b) => b[1].createdAt - a[1].createdAt)
    .map(([key, value]) => (
      <Card
        key={key}
        id={key}
        term={value.term}
        definition={value.definition}
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
        <div
          className={cn(
            "grid grid-cols-1 gap-3 px-1 pt-6 text-slate-300",
            cached.length > 1 ? "md:grid-cols-2" : ""
          )}
        >
          {cached}
        </div>
      ) : null}
      <div className="my-8">
        <ToolRating />
      </div>
    </>
  );
};
