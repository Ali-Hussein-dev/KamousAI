import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      className="prose mb-2 max-w-full tracking-wide prose-p:mt-2 prose-thead:bg-slate-400/80"
    >
      {children}
    </ReactMarkdown>
  );
};
