"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { useDefinition } from "@/hooks/use-dictionary";
import { Skeleton } from "@mantine/core";
import dynamic from "next/dynamic";
import * as React from "react";

const Searchbar = dynamic(
  () =>
    import("../../../src/components/Searchbar").then(
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
    import("../../../src/components/response-card").then((c) => c.ResponseCard),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={248} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);
const DictionaryHistory = dynamic(
  () =>
    import("../../../src/components/dictionary-history").then(
      (c) => c.DictionaryHistory
    ),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={48} radius="xl" my="md" w="100%" opacity="0.3" />
    ),
  }
);

export default function DictionaryPage() {
  const s = useDefinition();
  return (
    <div className="mx-auto h-full w-full max-w-2xl pb-10">
      <Searchbar
        inputRef={s.inputRef}
        input={s.input}
        setInput={s.setInput}
        complete={s.complete}
        handleSubmit={s.handleSubmit}
        stop={s.stop}
        isLoading={s.isLoading}
      />
      <ResponseCard definition={s.completion} isLoading={s.isLoading} />
      <DictionaryHistory />
    </div>
  );
}
