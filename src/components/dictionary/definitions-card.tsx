"use client";
import {
  type WordEntryKey,
  type LexicalEntry,
  useHistoryStore,
} from "@/hooks/use-history-store";
import { Loader, Tabs } from "@mantine/core";
import { useWordEntries } from "@/hooks/use-dictionary";
import { useSearchParams } from "next/navigation";
import { InitialView } from "./initial-view";
import { Markdown } from "../Markdown";
import { AudioCtxButton } from "./Audio";
import { useVoiceContext } from "@/hooks/use-voice-context";

export const wordEntriesTabs: { label: string; wordEntryKey: WordEntryKey }[] =
  [
    { label: "Examples", wordEntryKey: "examples" },
    { label: "Synonyms", wordEntryKey: "synonyms" },
    { label: "Antonyms", wordEntryKey: "antonyms" },
    { label: "Idioms", wordEntryKey: "idioms" },
  ];

//======================================
export const WordEntryTabs = ({
  term,
  id,
}: Pick<LexicalEntry, "term" | "id">) => {
  const { isLoading, completion, onTabChange } = useWordEntries({
    id,
    term,
  });
  const lexicalEntries = useHistoryStore((s) => s.lexicalEntries);
  return (
    <Tabs variant="default" inverted onChange={onTabChange}>
      <Tabs.List>
        {wordEntriesTabs.map((o) => (
          <Tabs.Tab
            size="lg"
            key={o.label}
            value={o.wordEntryKey}
            fw="bold"
            px={{ base: "6px", md: "xs" }}
          >
            {o.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {wordEntriesTabs.map(({ label, wordEntryKey }) => (
        <Tabs.Panel key={label} value={wordEntryKey}>
          {isLoading ? (
            <Loader type="dots" mx="auto" size="lg" />
          ) : (
            <Markdown>
              {lexicalEntries[id]?.[wordEntryKey] || completion}
            </Markdown>
          )}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

type LastResponseProps = {
  definition: string;
  isLoading: boolean;
};
//---------------------------------------------------
export const DefinitionsCard = ({
  definition,
  isLoading,
}: LastResponseProps) => {
  const searchParams = useSearchParams();
  const key = searchParams?.get("key") || "";
  const term = useHistoryStore((s) => s.lexicalEntries)[key]?.term || "";
  const { isFetching: isLoadingAudio, play } = useVoiceContext({ text: term });
  if (!definition && !isLoading) return <InitialView />;
  return (
    <div className="mb-4 overflow-hidden rounded-2xl bg-slate-800/50 pb-2 pl-4 pr-2 pt-6 text-slate-300">
      {isLoading ? (
        <Loader type="dots" className="mx-auto" size="lg" />
      ) : (
        <div className="mx-auto w-full font-medium">
          <div className="gap-4 flex-row-start">
            <span className="block text-lg font-bold first-letter:capitalize">
              {term}
            </span>
            <AudioCtxButton isLoadingAudio={isLoadingAudio} playAudio={play} />
          </div>
          <Markdown>{definition}</Markdown>
          <WordEntryTabs term={term} id={key} />
        </div>
      )}
    </div>
  );
};

/**
 * Set Params
 *  workEntryKey: localstorage
 *  preferences: localstorage
 *
 *
 * GET
 *  get Definition
 *   params: word, wordEntryKey, preferences
 *
 *  get WordEntries
 *   word: get from input
 *   wordEntryKey: get from (router | localstorage)
 *   preferences: get from localstorage
 *
 *   params: word, wordEntryKey, preferences
 *
 * CACHE
 *  set Definition()
 *
 *  set WordEntries(key, data) // key =
 *
 * DISPLAY
 *  loop WordEntries
 *
 */
