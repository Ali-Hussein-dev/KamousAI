"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useHistoryStore } from "@/hooks/use-history-store";
import { ActionIcon, Button } from "@mantine/core";
import React from "react";
import { TbHistory } from "react-icons/tb";
import { WordEntryTabs } from "./response-card";
import { Markdown } from "./Markdown";
import { MdOutlineClear } from "react-icons/md";

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
  return (
    <div className="mb-3 rounded-xl bg-slate-800/40 px-3 py-2 pt-6">
      <div className="mb-2 flex-row-between">
        <span className="block font-bold uppercase text-primary-600">
          {term}
        </span>
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

  if (!Object.keys(lexicalEntries).length) return null;

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
        {cached?.length || 0 > 0 ? "Hide history" : "View history"}
      </Button>
      <div hidden={!open} className="px-1 pt-2 text-slate-300">
        {cached}
      </div>
    </>
  );
};
