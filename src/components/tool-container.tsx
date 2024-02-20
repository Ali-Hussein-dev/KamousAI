import { Title } from "@mantine/core";
import { ToolRating } from "./tool-rating";

const titles = {
  reverseDictionary: "Reverse Dictionary",
  summarizer: "Summarizer",
  grammarCorrector: "Grammar Corrector",
  paraphraser: "Paraphraser",
};

//======================================
export const ToolContainer = ({
  children,
  title,
  showRating = false,
}: {
  children: React.ReactNode;
  title: keyof typeof titles;
  showRating: boolean;
}) => {
  return (
    <>
      <section className="animate-in mb-6 w-full rounded-lg bg-slate-900/40 px-2 py-6 shadow-lg sm:px-4">
        <Title
          order={1}
          mb="5px"
          className="center font-sans text-base uppercase tracking-wide md:text-lg"
          c="#cbd5e1"
        >
          {titles[title]}
        </Title>
        {children}
      </section>
      {showRating && <ToolRating />}
    </>
  );
};
