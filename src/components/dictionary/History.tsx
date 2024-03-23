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
import { motion, AnimatePresence } from "framer-motion";

//---------------------------------------------------Frontface
const Frontface = ({ phrase, open }: { phrase: string; open: () => void }) => {
  return (
    <motion.div
      onClick={() => open()}
      className="rounded-3xl bg-slate-900 p-1 text-3xl font-bold tracking-wider text-theme-secondary"
      style={{
        boxShadow: "2px 2px 1px #020617",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        fontFamily: "var(--salsa-font)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{
        rotateY: -180,
        transition: { duration: 0.6, ease: "easeInOut" },
        opacity: 0,
      }}
    >
      <div className="center h-full min-h-40 w-full rounded-3xl border border-dashed border-slate-600 md:min-h-56">
        <p className="first-letter:uppercase">{phrase}</p>
      </div>
    </motion.div>
  );
};
type FlipCardProps = {
  definition: string;
  id: string;
  term: string;
  remove: () => void;
};
//---------------------------------------------------Backface
const Backface = ({ definition, id, term, remove }: FlipCardProps) => {
  const { play, isFetching } = useVoiceContext({ text: term });
  return (
    <motion.div
      className="flex h-full grow flex-col rounded-3xl bg-slate-900/40 px-3 pb-4 pt-6"
      style={{
        boxShadow: "2px 2px 1px #020617",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      initial={{
        rotateY: 180,
      }}
      animate={{
        rotateY: 0,
        transition: { duration: 0.6, ease: "easeInOut" },
        boxShadow: "2px 2px 1px #020617",
      }}
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
//---------------------------------------------------Flip-card
const FlipCard = (props: FlipCardProps) => {
  const [opened, handlers] = useDisclosure(false);
  return (
    <div
      style={{
        perspective: "1000px",
      }}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <Frontface
            key="front-card"
            phrase={props.term}
            open={handlers.open}
          />
        ) : (
          <Backface key="back-card" {...props} />
        )}
      </AnimatePresence>
    </div>
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
      <FlipCard
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
            "grid grid-cols-1 gap-4 pt-6 text-slate-300 md:grid-cols-2"
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
