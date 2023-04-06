/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { Anchor, AppShell, Footer, Header, Title } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Searchbar } from "@/components/Search-Bar";
import { useResponse } from "@/utils/use-response";
import { FaGithub, FaTwitter } from "react-icons/fa";
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
                Powered by <b>Langchain</b>, <b>Nextjs</b>, and <b>Mantine</b>
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
                ? theme.colors.dark[1]
                : theme.colors.dark[8],
          },
        })}
      >
        <div className="mx-auto w-full max-w-xl pt-4">
          <Title order={1} className=" text-center">
            AI Dictionary
          </Title>
          <Searchbar />
          <section className="prose px-1 py-4 text-lg">
            <ReactMarkdown
              // eslint-disable-next-line react/no-children-prop
              children={response || ""}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            />
          </section>
        </div>
      </AppShell>
    </>
  );
};

export default Home;
