/* eslint-disable @typescript-eslint/no-misused-promises */
import { useResponse } from "@/hooks";
import { Badge, Paper, Text, Skeleton, Title } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Actions } from ".";
//======================================
const IntialView = () => {
  return (
    <Paper withBorder className="w-full gap-2 flex-col-start " p="md" pt="0">
      <Title order={1} className="w-full">
        KamousAI First AI-Powered Dictionary
      </Title>
      <div className="mb-4 ">
        <Text className="mb-2 text-xl font-bold" color="dimmed">
          What a regular dictionary can look up
        </Text>
        <div className="">
          <Badge color="yellow" tt="inherit" p="md" size="lg">
            <Text color="dimmed">Limited words</Text>
          </Badge>
        </div>
      </div>
      <div className="mb-4 ">
        <Text className="mb-2 text-xl font-bold" color="dimmed">
          What KamousAI can look up
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
            <Badge key={s} color="yellow" p="md" tt="inherit" size="lg">
              <Text color="dimmed">{s}</Text>
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
  return (
    <div className=" pt-2">
      {status === "idle" && !definition && <IntialView />}
      {definition && (
        <section className="prose px-2 pt-2 text-lg font-medium tracking-wide">
          <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {definition}
          </ReactMarkdown>
          {status === "success" && <Actions />}
        </section>
      )}
      {!definition && status === "loading" && <LoadingSkeleton />}
      <section className="prose px-2 pt-2 text-lg font-medium tracking-wide">
        <ActionResponse />
      </section>
    </div>
  );
};
