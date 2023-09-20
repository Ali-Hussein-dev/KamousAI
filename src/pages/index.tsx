/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { AppShell, Skeleton } from "@mantine/core";
import { Footer, Header } from "@/components";
import dynamic from "next/dynamic";

const Searchbar = dynamic(
  () => import("../components/Search-Bar").then((c) => c.Searchbar),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={48} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);
const Response = dynamic(
  () => import("../components/Response").then((c) => c.Response),
  {
    ssr: false,
    loading: () => (
      <Skeleton h={248} radius="lg" my="md" w="100%" opacity="0.3" />
    ),
  }
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KamousAI</title>
        <meta name="description" content="KamousAI dictionary AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell padding="lg" styles={{
        root: {
          // backgroundColor: theme.colors.dark[9],
        },
      }}>
        <Header />
        <div className="black mx-auto w-full max-w-2xl pt-20 h-full ">
          <Searchbar />
          <Response />
        </div>
        <Footer />
      </AppShell>
    </>
  );
};

export default Home;
