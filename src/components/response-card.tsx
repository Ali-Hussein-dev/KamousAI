"use client";
import {
  type WordEntryKey,
  type LexicalEntry,
  useHistoryStore,
} from "@/hooks/use-history-store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader, Tabs } from "@mantine/core";
import { useWordEntries } from "@/hooks/use-dictionary";
import { useSearchParams } from "next/navigation";
import { InitialView } from "./initial-view";

const list: { label: string; wordEntryKey: WordEntryKey }[] = [
  { label: "Examples", wordEntryKey: "examples" },
  { label: "Synonyms", wordEntryKey: "synonyms" },
  { label: "Antonyms", wordEntryKey: "antonyms" },
  // { label: "Related", resType: "related" },
];
//======================================
const WordEntryTabs = ({ term }: Pick<LexicalEntry, "term">) => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("key") || "";
  const { isLoading, completion, onTabChange } = useWordEntries({
    id,
    term,
  });
  const lexicalEntries = useHistoryStore((s) => s.lexicalEntries);

  return (
    <>
      <Tabs variant="default" inverted onChange={onTabChange}>
        <Tabs.List className="">
          {list.map((o) => (
            <Tabs.Tab size="lg" key={o.label} value={o.wordEntryKey}>
              {o.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {list.map(({ label, wordEntryKey }) => (
          <Tabs.Panel key={label} value={wordEntryKey} pt="sm">
            {isLoading ? (
              <Loader type="dots" mx="auto" size="lg" />
            ) : (
              <ReactMarkdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                className="prose prose-p:mt-2"
              >
                {lexicalEntries[id]?.[wordEntryKey] || completion}
              </ReactMarkdown>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};
//------------------------------
type LastResponseProps = {
  definition: string;
  isLoading: boolean;
};
export const ResponseCard = ({ definition, isLoading }: LastResponseProps) => {
  const searchParams = useSearchParams();
  const key = searchParams?.get("key") || "";
  const term = useHistoryStore((s) => s.lexicalEntries)[key]?.term || "";
  if (!definition && !isLoading) return <InitialView />;
  return (
    <div className="mb-4 overflow-hidden rounded-2xl bg-slate-800/50 p-2 pl-3 pt-6 text-slate-300">
      {isLoading ? (
        <Loader type="dots" className="mx-auto" size="lg" />
      ) : (
        <div className="prose mx-auto w-full max-w-2xl font-medium tracking-wide prose-thead:bg-slate-400/80 ">
          <span className="block capitalize">{term}</span>
          <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {definition}
          </ReactMarkdown>
          <WordEntryTabs term={term} />
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
