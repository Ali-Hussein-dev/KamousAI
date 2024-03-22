import { cn } from "@/utils/helpers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Markdown = ({
  children,
  tw,
}: {
  children: string;
  tw?: string;
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      className={cn(
        "prose prose-slate mb-2 max-w-full tracking-wide prose-p:mt-2 prose-strong:font-extrabold prose-th:py-1 prose-th:uppercase prose-th:text-teal-400",
        tw
      )}
    >
      {children}
    </ReactMarkdown>
  );
};
