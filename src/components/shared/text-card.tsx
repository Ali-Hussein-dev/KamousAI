import { Markdown } from "./Markdown";
import { CopyButton } from "./copy-button";

//======================================
export const TextCard = ({ content }: { content: string }) => {
  return (
    <div className="flex items-start justify-between gap-2 rounded bg-slate-700/60 px-3 pb-2 pt-4 text-slate-200">
      <Markdown>{content}</Markdown>
      <CopyButton text={content} />
    </div>
  );
};
