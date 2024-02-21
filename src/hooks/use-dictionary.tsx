"use client";
import { useCompletion } from "ai/react";
import * as React from "react";
import {
  type LexicalEntry,
  useHistoryStore,
  type WordEntryKey,
} from "./use-history-store";
import { useRouter } from "next/navigation";
import { useInputFocus } from "./use-input-focus";
import { useResponse } from "./use-response";

//------------------------------
export const useDefinition = () => {
  const setCache = useHistoryStore((s) => s.setLexicalEntries);
  const lexicalEntries = useHistoryStore((s) => s.lexicalEntries);
  const preferences = useResponse((s) => s.preferences);
  const { inputRef } = useInputFocus<HTMLInputElement>();
  const [context, setContext] = React.useState("");
  const router = useRouter();
  const res = useCompletion({
    api: "/api/dictionary",
    body: {
      wordEntryKey: "definition",
      preferences,
      context,
    },
    onFinish: (prompt, completion) => {
      // cache response...
      const cleanedTerm = prompt.trim().toLowerCase();
      const term = Object.values(lexicalEntries).find(
        (o) => o.term === cleanedTerm
      );
      const id = term?.id ?? cleanedTerm;
      console.log("onFinish runing...", cleanedTerm);
      if (!!term) {
        // update word definition
        setCache(term.id, { ...term, definition: completion });
      } else {
        const block = {
          id,
          term: cleanedTerm,
          definition: completion,
          createdAt: new Date().getTime(),
        };
        setCache(id, block);
      }
      inputRef.current?.blur();
      router.push(`/tools/dictionary?key=${id}`, { scroll: false });
    },
  });
  return { ...res, inputRef, setContext, context };
};
//------------------------------
export const useWordEntries = ({ id, term }: { id: string; term: string }) => {
  const { setLexicalEntries, lexicalEntries } = useHistoryStore();
  const preferences = useResponse((s) => s.preferences);
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
    // console.log("useEffect", { completion: res.completion, id, wordEntryKey });
    if (!isFinished || !wordEntryKey) return;
    // cache response
    else {
      updateCache(term, res.completion);
      setIsFinished(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished, id, wordEntryKey]);

  const onTabChange = React.useCallback(
    (activeWordEntryKey: string | null) => {
      if (activeWordEntryKey === null) return;

      setWordEntryKey(activeWordEntryKey as WordEntryKey);
      const cache = lexicalEntries[id]?.[activeWordEntryKey as WordEntryKey];
      console.log("-----------onTabChange", {
        term,
        id,
        activeWordEntryKey,
        wordEntryKey,
        cache: !!cache,
      });
      if (
        !cache &&
        ["examples", "synonyms", "antonyms", "idioms"].includes(
          activeWordEntryKey
        )
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
    [lexicalEntries, id, term, wordEntryKey, res, preferences]
  );
  return { ...res, wordEntryKey, onTabChange };
};
