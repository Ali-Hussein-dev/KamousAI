import { ActionIcon } from "@mantine/core";
import { Markdown } from "./Markdown";
import { CopyButton } from "./copy-button";
import { MdDelete } from "react-icons/md";
import { isFunction } from "@/utils/helpers";

//======================================
export const TextCard = ({
  content,
  drop,
}: {
  content: string;
  drop?: () => void;
}) => {
  return (
    <div className="group mb-6 gap-2 rounded bg-slate-700/50 px-3 pb-2 pt-4 text-slate-200 duration-1000">
      <Markdown tw="prose-p:my-0">{content}</Markdown>
      <div className="flex-row-end">
        <div className="translate-y-6 gap-2 rounded-full border border-dashed border-slate-700 bg-slate-800 px-3 py-1.5 flex-row-start">
          {drop && (
            <ActionIcon
              radius="lg"
              classNames={{ icon: "text-theme-destructive" }}
              variant="subtle"
              onClick={() => {
                isFunction(drop) && drop();
              }}
            >
              <MdDelete />
            </ActionIcon>
          )}
          <CopyButton text={content} size="md" variant="subtle" />
        </div>
      </div>
    </div>
  );
};
