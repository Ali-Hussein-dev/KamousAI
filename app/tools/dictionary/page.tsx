"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { useDefinition } from "@/hooks/use-dictionary";
import { Skeleton } from "@mantine/core";
import dynamic from "next/dynamic";
import * as React from "react";

const Searchbar = dynamic(
  () =>
    import("../../../src/components/dictionary/Searchbar").then(
      (c) => c.DictionarySearchbar
    ),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={48} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);
const ResponseCard = dynamic(
  () =>
    import("../../../src/components/dictionary/definitions-card").then(
      (c) => c.DefinitionsCard
    ),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={248} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);
const History = dynamic(
  () =>
    import("../../../src/components/dictionary/History").then(
      (c) => c.DictionaryHistory
    ),
  {
    ssr: false,
  }
);

export default function DictionaryPage() {
  const s = useDefinition();
  return (
    <div className="h-full w-full pb-10">
      <Searchbar
        inputRef={s.inputRef}
        input={s.input}
        setInput={s.setInput}
        complete={s.complete}
        handleSubmit={s.handleSubmit}
        stop={s.stop}
        isLoading={s.isLoading}
        context={s.context}
        setContext={s.setContext}
      />
      <ResponseCard
        definition={s.completion}
        isLoading={s.isLoading}
        setInput={s.setInput}
      />
      <History />
    </div>
  );
}