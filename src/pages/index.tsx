/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { AppShell } from "@mantine/core";
import { Footer, Header, Searchbar, Response } from "@/components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KamousAI</title>
        <meta name="description" content="KamousAI dictionary AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        padding="sm"
        header={<Header />}
        footer={<Footer />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[0],
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.dark[8],
          },
        })}
      >
        <div className="mx-auto w-full max-w-2xl pt-4">
          <Searchbar />
          <Response />
        </div>
      </AppShell>
    </>
  );
};

export default Home;
