"use client";
import { AiOutlineSwap } from "react-icons/ai";
import { BsJournalText, BsTranslate } from "react-icons/bs";
import { TbPencilMinus } from "react-icons/tb";
import { GiSpellBook } from "react-icons/gi";
import { MdOutlineShortText } from "react-icons/md";
import { ToolCard } from "./tool-card";

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
export const ToolsBentoTools = () => {
  return (
    <div className="mx-auto w-full max-w-4xl lg:gap-6">
      <div className="w-full space-y-16">
        {languageTools.map((o, i) => (
          <div key={o.label}>
            <ToolCard key={o.label} {...o} i={i} />
          </div>
        ))}
      </div>
    </div>
  );
};
