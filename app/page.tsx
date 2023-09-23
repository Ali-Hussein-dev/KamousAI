"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { AppShell, Skeleton } from "@mantine/core";
import { Footer, Header } from "../src/components";
import dynamic from "next/dynamic";

const Searchbar = dynamic(
  () => import("../src/components/Search-Bar").then((c) => c.Searchbar),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={48} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);
const Response = dynamic(
  () => import("../src/components/Response").then((c) => c.Response),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={248} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);

const Home: NextPage = () => {
  return (
      <AppShell
      // header={{height: 64}}
      >
        <Header />
        <AppShell.Main py="lg" px="xs">
          <div className="mx-auto h-full w-full max-w-2xl border pb-10 pt-5">
            <Searchbar />
            <Response />
          </div>
        </AppShell.Main>
        <Footer />
      </AppShell>
  );
};

export default Home;
