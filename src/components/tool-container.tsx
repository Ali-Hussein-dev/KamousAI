import { Title } from "@mantine/core";

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
}: {
  children: React.ReactNode;
  title: keyof typeof titles;
}) => {
  return (
    <section className="w-full rounded-lg bg-slate-800 px-3 py-6">
      <Title
        order={1}
        mb="5px"
        className="center font-sans text-lg uppercase tracking-wide"
        c="#cbd5e1"
      >
        {titles[title]}
      </Title>
      {children}
    </section>
  );
};
