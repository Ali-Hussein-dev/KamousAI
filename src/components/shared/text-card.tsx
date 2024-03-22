import { ActionIcon } from "@mantine/core";
import { Markdown } from "./Markdown";
import { CopyButton } from "./copy-button";
import { MdDelete } from "react-icons/md";
import { cn, isFunction } from "@/utils/helpers";

//======================================
export const TextCard = ({
  content,
  drop,
}: {
  content: string;
  drop?: () => void;
}) => {
  return (
    <div className="group flex items-start justify-between gap-2 rounded bg-slate-700/50 px-3 pb-2 pt-4 text-slate-200 duration-1000">
      <Markdown tw="prose-p:my-0">{content}</Markdown>
      <div
        className={cn(
          "gap-3 duration-300 flex-col-center group-hover:flex md:hidden"
        )}
      >
        <CopyButton text={content} />
        {drop && (
          <ActionIcon
            size="lg"
            radius="lg"
            color="#BFB173"
            variant="light"
            onClick={() => {
              isFunction(drop) && drop();
            }}
          >
            <MdDelete />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
