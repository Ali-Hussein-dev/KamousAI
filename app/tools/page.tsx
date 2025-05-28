import { AiOutlineSwap } from "react-icons/ai";
import { BsJournalText, BsTranslate } from "react-icons/bs";
import { TbPencilMinus } from "react-icons/tb";
import { GiSpellBook } from "react-icons/gi";
import { MdOutlineShortText } from "react-icons/md";
import { Button, Card } from "@mantine/core";
import Link from "next/link";

const languageTools = [
  {
    label: "AI Dictionary",
    href: "/tools/dictionary",
    Icon: GiSpellBook,
    description:
      "Look up words, phrases, and idioms with AI dictionary. Use context field to get more accurate results.",
    keywords: ["Learn new words"],
    color: "bg-purple-800/80",
  },
  {
    label: "Reverse Dictionary",
    href: "/tools/reverse-dictionary",
    Icon: AiOutlineSwap,
    description:
      "Get help finding the right word to express your thoughts and ideas.",
    keywords: ["Improve writing", "Discover new vocabularies"],
    color: "bg-indigo-800/80",
  },
  {
    label: "Grammar Corrector",
    href: "/tools/grammar-corrector",
    Icon: TbPencilMinus,
    description: "Check grammar and punctuation errors in your text.",
    keywords: ["Fix writing mistakes"],
    color: "bg-teal-800/80",
  },
  {
    label: "Translator",
    href: "/tools/translator",
    Icon: BsTranslate,
    description: "Translate long text from one language to another.",
    keywords: ["Translate long text"],
    color: "bg-rose-800/80",
  },
  {
    label: "Paraphraser",
    href: "/tools/paraphraser",
    Icon: BsJournalText,
    description:
      "Rewrite sentences to avoid plagiarism and improve readability.",
    keywords: ["Avoid plagiarism", "Improve readability"],
    color: "bg-green-800/80",
  },
  {
    label: "Summarizer",
    href: "/tools/summarizer",
    Icon: MdOutlineShortText,
    description: "Summarize long text into a short summary.",
    keywords: ["Too long; didn't read", "Shorten text"],
    color: "bg-amber-800/80",
  },
];
//======================================
const ToolsPage = () => {
  return (
    <div
      className="bg-slate-900"
      style={{
        width: "100%",
        backgroundRepeat: "repeat",
        backgroundSize: "250px 250px",
        backgroundImage: "url(/tool_layout_grid.svg)",
      }}
    >
      <section className="center mx-auto min-h-screen bg-gradient-to-tr from-slate-900/[0.91] from-50% via-slate-900/70 to-slate-900 px-2 py-14">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {languageTools?.map((tool) => (
            <Card key={tool.label} className="rounded-lg border bg-slate-900 ">
              <h2 className="text-lg">{tool.label}</h2>
              <Button variant="filled" size="md" radius="md">
                <Link href={tool.href} className="no-underline dark:text-white">
                  Use tool
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
export default ToolsPage;
