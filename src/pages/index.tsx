/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { Anchor, AppShell, Footer, Header, Text, Title } from "@mantine/core";
import { Searchbar, Definitions } from "@/components";
import { FaGithub, FaTwitter } from "react-icons/fa";

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
        header={
          <Header height={60} p="xs" className="flex-row-center">
            <div className="mx-auto w-full max-w-4xl flex-row-start">
              <Anchor color="gray" href="/">
                <div className="text-xl font-bold">KamousAI</div>
              </Anchor>
            </div>
          </Header>
        }
        footer={
          <Footer height={50} p="xs" className="flex-row-center">
            {/* Footer content */}
            <div className="mx-auto w-full max-w-4xl flex-row-between">
              <Text color="dimmed">
                Powered by <b>Large Langugage Model</b>
              </Text>
              <div className="gap-3 flex-row-start">
                <Anchor
                  color="gray"
                  href="https://twitter.com/AliHussein_20"
                  target="_blank"
                >
                  <FaTwitter size="24" />
                </Anchor>
                <Anchor
                  color="gray"
                  href="https://github.com/Ali-Hussein-dev/KamousAI"
                  target="_blank"
                >
                  <FaGithub size="24" />
                </Anchor>
              </div>
            </div>
          </Footer>
        }
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
        <div className="mx-auto w-full max-w-xl pt-4">
          <Title order={1} className=" text-center">
            AI Dictionary
          </Title>
          <Searchbar />
          <Definitions />
        </div>
      </AppShell>
    </>
  );
};

export default Home;
