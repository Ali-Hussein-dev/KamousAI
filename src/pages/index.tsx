/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import {
  Anchor,
  AppShell,
  Badge,
  Footer,
  Header,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Searchbar } from "@/components/Search-Bar";
import { useResponse } from "@/hooks";
import { FaGithub, FaTwitter } from "react-icons/fa";

//======================================
export const Placeholder = () => {
  return (
    <Paper
      withBorder
      className="gap grid grid-cols-1 gap-1 md:grid-cols-5"
      p="md"
      radius="lg"
    >
      <div className="col-span-2">
        <Text className="mb-4 text-lg font-bold" color="dimmed">
          Regular Dictionary
        </Text>
        <div className="mb-5 space-y-2">
          <Badge color="yellow" tt="inherit" p="xs" size="lg">
            <Text color="dimmed">Words</Text>
          </Badge>
        </div>
      </div>
      <div className="col-span-3">
        <Text className="mb-4 text-lg font-bold" color="dimmed">
          AI Dictionary
        </Text>
        <div className="mb-5 grid grid-cols-2 gap-4 ">
          {[
            "Words",
            "Idioms",
            "Expressions",
            "Word vs word",
            "Word or word",
            "Misspelled words",
          ].map((s) => (
            <Badge key={s} color="yellow" p="xs" tt="inherit" size="lg">
              <Text color="dimmed">{s}</Text>
            </Badge>
          ))}
        </div>
      </div>
    </Paper>
  );
};
const Home: NextPage = () => {
  const response = useResponse((s) => s.response);
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
              <Anchor color="gray" href="/" target="_blank">
                <div className="text-xl font-bold">KamousAI</div>
              </Anchor>
            </div>
          </Header>
        }
        footer={
          <Footer height={50} p="xs" className="flex-row-center">
            {/* Footer content */}
            <div className="mx-auto w-full max-w-4xl flex-row-between">
              <span>
                Powered by <b>LangChain</b>, <b>Nextjs</b>, and <b>Mantine</b>
              </span>
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
          <div className="pt-2">
            {response ? (
              <section className="prose px-1 py-2 text-lg md:px-4">
                <ReactMarkdown
                  remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                >
                  {response}
                </ReactMarkdown>
              </section>
            ) : (
              <Placeholder />
            )}
          </div>
        </div>
      </AppShell>
    </>
  );
};

export default Home;
