import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      className="prose prose-slate mb-2 max-w-full tracking-wide prose-p:mt-2 prose-strong:font-extrabold prose-th:py-1 prose-th:uppercase prose-th:text-teal-400"
    >
      {children}
    </ReactMarkdown>
  );
};
