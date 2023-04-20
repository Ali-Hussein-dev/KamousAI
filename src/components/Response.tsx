/* eslint-disable @typescript-eslint/no-misused-promises */
import { useResponse } from "@/hooks";
import { Badge, Paper, Text } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

//======================================
const IntialView = () => {
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
//======================================
export const Response = () => {
  const content = useResponse((s) => s.response);
  return (
    <div className="pt-2">
      {content ? (
        <section className="prose px-2 pt-2 text-lg font-medium tracking-wide">
          <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {content}
          </ReactMarkdown>
        </section>
      ) : (
        <IntialView />
      )}
    </div>
  );
};
