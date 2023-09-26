"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Skeleton } from "@mantine/core";
import dynamic from "next/dynamic";

const Searchbar = dynamic(
  () => import("../../../src/components/Search-Bar").then((c) => c.Searchbar),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={48} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);
const Response = dynamic(
  () => import("../../../src/components/Response").then((c) => c.Response),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={248} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);

export default function DictionaryPage() {
  return (
    <div className="mx-auto h-full w-full max-w-2xl border pb-10">
      <Searchbar />
      <Response />
    </div>
  );
}
