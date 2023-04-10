import { useResponse } from "@/hooks";
import { Badge, Paper, Skeleton, Text } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
//======================================
export const InitialView = () => {
  return (
    <Paper
      withBorder
      className="gap grid grid-cols-1 gap-1 md:grid-cols-5"
      p="md"
    >
      <div className="col-span-2">
        <Text className="mb-4 text-lg font-bold" color="dimmed">
          Normal Dictionary
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
export const Loader = () => {
  return (
    <div className="space-y-3 px-3 py-4">
      <Skeleton height={14} radius="xl" />
      <Skeleton height={14} radius="xl" />
      <Skeleton height={14} radius="xl" />
      <Skeleton height={14} radius="xl" width="70%" />
      <Skeleton height={14} radius="xl" width="50%" />
    </div>
  );
};
//======================================
export const Definitions = () => {
  const response = useResponse((s) => s.response);
  const status = useResponse((s) => s.status);

  return (
    <div className="pt-6">
      {status == "idle" && !response ? <InitialView /> : null}
      {status == "loading" && !response ? <Loader /> : null}
      {response && (
        <section className="prose px-1 py-2 text-lg md:px-4">
          <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {response}
          </ReactMarkdown>
        </section>
      )}
    </div>
  );
};
