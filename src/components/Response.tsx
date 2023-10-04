"use client"
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useResponse } from "@/hooks";
import { Badge, Paper, Text, Skeleton, Title } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Actions } from ".";
import Typewriter from "typewriter-effect";
import { useSearchParams } from "next/navigation";

const H1 = () => (
  <Title order={1} className="w-full" mt="lg" mb="lg">
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString("New Way To Learn New Words")
          .pauseFor(2500)
          .start();
      }}
      options={{
        // cursor: "",
      }}
    />
  </Title>
);
//======================================
const IntialView = () => {
  return (
    <Paper
      withBorder
      radius="lg"
      className="w-full gap-2 flex-col-start"
      p={{ base: "sm", md: "lg" }}
    >
      <H1 />
      <div className="mb-4 ">
        <Text className="ml-1 text-xl font-bold" c="dimmed" mb="xs">
          Regular dictionary
        </Text>
        <div>
          <Badge tt="inherit" p="lg" size="lg" variant="light">
            Limited number of words
          </Badge>
        </div>
      </div>
      <div className="mb-4 ">
        <Text className="ml-1 text-xl font-bold" c="dimmed" mb="xs">
          AI dictionary
        </Text>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 ">
          {[
            "Amost any word",
            "Idioms",
            "Expressions",
            "Word vs word",
            "Word or word",
            "Misspelled words",
          ].map((s) => (
            <Badge key={s} p="lg" tt="inherit" size="lg" w="100%" variant="light">
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </Paper>
  );
};
const LoadingSkeleton = () => (
  <div className="px-2">
    <Skeleton height={16} mt={12} radius="xl" />
    <Skeleton height={16} mt={12} radius="xl" />
    <Skeleton height={16} mt={12} radius="xl" />
    <Skeleton height={16} mt={12} radius="xl" width="70%" />
    <Skeleton height={16} mt={12} radius="xl" width="40%" />
  </div>
);

const ActionResponse = () => {
  const content = useResponse((s) => s.actionResponse);
  const actionStatus = useResponse((s) => s.actionStatus);
  return actionStatus == "loading" ? (
    <LoadingSkeleton />
  ) : (
    <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
      {content || ""}
    </ReactMarkdown>
  );
};
//======================================
export const Response = () => {
  const definition = useResponse((s) => s.definition);
  const status = useResponse((s) => s.status);
  const query = useSearchParams();
  const term = query?.get("term");
  return (
    <div>
      {status !== "loading" && !term && <IntialView />}
      {definition && !!term && (
        <Paper
          radius="lg"
          py="xl"
          px={{base: "xs", md: "lg"}}
          className="prose mx-auto w-full max-w-2xl md:text-lg font-medium tracking-wide prose-thead:bg-white/60" 
          shadow="md"
          bg="dark"
        >
          <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {definition}
          </ReactMarkdown>
          {status === "success" && <Actions />}
          {!definition && status == "loading" && <LoadingSkeleton />}
          <section className="w-full pt-2 md:text-lg font-medium tracking-wide">
            <ActionResponse />
          </section>
        </Paper>
      )}
    </div>
  );
};
