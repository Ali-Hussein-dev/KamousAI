"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useHistoryStore } from "@/hooks/use-history-store";
import { ActionIcon, Button } from "@mantine/core";
import React from "react";
import { TbHistory } from "react-icons/tb";
import { WordEntryTabs } from "./definitions-card";
import { AudioCtxButton } from "./Audio";
import { Markdown } from "../shared/Markdown";
import { MdOutlineClear } from "react-icons/md";
import { useVoiceContext } from "@/hooks/use-voice-context";
import { ToolRating } from "../tool-rating";
import { cn } from "@/utils/helpers";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "framer-motion";
//---------------------------------------------------
const FrontCard = ({ phrase, open }: { phrase: string; open: () => void }) => {
  return (
    <motion.div
      onClick={() => open()}
      className="center break-inside-avoid rounded-xl bg-slate-900/70 py-12 text-3xl font-bold tracking-wider text-theme-secondary shadow md:py-20"
      style={{ boxShadow: "2px 2px 1px #020617" }}
      animate={{
        rotateX: 0,
        transition: { duration: 1 },
        transformStyle: "preserve-3d",
      }}
      exit={{ rotateX: -180 }}
    >
      <p className="first-letter:uppercase">{phrase}</p>
    </motion.div>
  );
};
type FlashCardProps = {
  definition: string;
  id: string;
  term: string;
  remove: () => void;
};
//---------------------------------------------------
const BackCard = ({ definition, id, term, remove }: FlashCardProps) => {
  const { play, isFetching } = useVoiceContext({ text: term });
  return (
    <motion.div
      className="flex break-inside-avoid flex-col rounded-xl bg-slate-900/40 px-3 pb-4 pt-6 shadow"
      style={{ boxShadow: "2px 2px 1px #020617" }}
      initial={{ rotateX: 180 }}
      animate={{
        rotateX: 0,
        transition: { duration: 1 },
        transformStyle: "preserve-3d",
      }}
      exit={{ rotateX: 180 }}
    >
      <div className="grow">
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
      </div>
      <WordEntryTabs term={term} id={id} />
    </motion.div>
  );
};
//---------------------------------------------------
const FlashCard = (props: FlashCardProps) => {
  const [opened, handlers] = useDisclosure(false);
  return opened ? (
    <BackCard {...props} />
  ) : (
    <FrontCard phrase={props.term} open={handlers.open} />
  );
};

//---------------------------------------------------
export const DictionaryHistory = () => {
  const lexicalEntries = useHistoryStore((s) => s.lexicalEntries);
  const removeWordEntry = useHistoryStore((s) => s.setLexicalEntries);
  const [open, setOpen] = React.useState(false);
  const cached = Object.entries(lexicalEntries)
    .sort((a, b) => b[1].createdAt - a[1].createdAt)
    .map(([key, value]) => (
      <FlashCard
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
            "grid grid-cols-1 gap-4 pt-6 text-slate-300",
            cached.length > 1 ? "md:masonry-cols-2 md:block md:space-y-4" : ""
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
