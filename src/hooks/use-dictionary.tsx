"use client";
import { useHotkeys } from "@mantine/hooks";
import { useCompletion } from "ai/react";
import * as React from "react";
import {
  type LexicalEntry,
  useHistoryStore,
  type WordEntryKey,
} from "./use-history-store";
import { useRouter } from "next/navigation";

const useFocus = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const setFocus = () => {
    inputRef.current?.focus();
  };
  useHotkeys([["mod+K", () => setFocus()]]);
  return { inputRef };
};

//------------------------------
export const useDefinition = () => {
  const setCache = useHistoryStore((s) => s.setLexicalEntries);
  const lexicalEntries = useHistoryStore((s) => s.lexicalEntries);
  const preferences = useHistoryStore((s) => s.preferences);
  const { inputRef } = useFocus();
  const router = useRouter();
  const res = useCompletion({
    api: "/api/dictionary",
    body: {
      wordEntryKey: "definition",
      preferences,
    },
    onFinish: (prompt, completion) => {
      // cache response...
      const term = Object.values(lexicalEntries).find((o) => o.term === prompt);
      const key = term?.id || (Math.random() * 10000).toFixed(0);
      const createdAt = new Date().getTime();
      if (term) {
        setCache(key, { ...term, definition: completion, createdAt });
      } else {
        const block = {
          term: prompt.trim().toLowerCase(),
          id: key,
          createdAt,
          definition: completion,
        };
        setCache(key, block);
      }
      inputRef.current?.blur();
      router.push(`/tools/dictionary?key=${key}`);
    },
  });
  return { ...res, inputRef };
};
//------------------------------
export const useWordEntries = ({ id, term }: { id: string; term: string }) => {
  const { setLexicalEntries, lexicalEntries, preferences } = useHistoryStore();
  const [wordEntryKey, setWordEntryKey] = React.useState<WordEntryKey>();
  const [isFinished, setIsFinished] = React.useState(false);
  // const keywordRef = React.useRef<string>();
  // React.useEffect(() => {
  //   keywordRef.current = wordEntryKey;
  // }, [wordEntryKey]);

  const res = useCompletion({
    api: "/api/dictionary",
    onFinish: () => {
      console.log("onFinish", { wordEntryKey, id });
      setIsFinished(true);
    },
  });

  const updateCache = React.useCallback(
    (prompt: string, completion: string) => {
      console.log("updateCache", { wordEntryKey });
      const block = {
        ...lexicalEntries[id],
        term: prompt,
        id,
        [wordEntryKey as string]: completion,
      } as LexicalEntry;
      setLexicalEntries(id, block);
    },
    [wordEntryKey, lexicalEntries, id, setLexicalEntries]
  );

  React.useEffect(() => {
    console.log("useEffect", { completion: res.completion, id, wordEntryKey });
    if (!isFinished || !wordEntryKey) return;
    // cache response
    else {
      updateCache(term, res.completion);
      setIsFinished(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished, id, wordEntryKey]);

  const onTabChange = React.useCallback(
    (activeWordEntryKey: WordEntryKey) => {
      setWordEntryKey(activeWordEntryKey);
      const cache = lexicalEntries[id]?.[activeWordEntryKey];
      console.log("-----------onTabChange", {
        term,
        id,
        activeWordEntryKey,
        wordEntryKey,
        cache: !!cache,
      });
      if (
        !cache &&
        ["examples", "synonyms", "antonyms"].includes(activeWordEntryKey)
      ) {
        res.complete(term, {
          body: {
            wordEntryKey: activeWordEntryKey,
            preferences,
          },
        });
      } else {
        console.log("cached", { activeWordEntryKey });
      }
    },
    [id, term, wordEntryKey, lexicalEntries]
  );
  return { ...res, wordEntryKey, onTabChange };
};
