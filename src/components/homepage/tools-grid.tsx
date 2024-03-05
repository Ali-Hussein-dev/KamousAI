"use client";
import Link from "next/link";
import { AiOutlineSwap } from "react-icons/ai";
import { BsJournalText, BsTranslate } from "react-icons/bs";
import { TbPencilMinus } from "react-icons/tb";
import { GiSpellBook } from "react-icons/gi";
import { cn } from "@/utils/helpers";
import { MdOutlineShortText } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

const languageTools = [
  {
    label: "AI Dictionary",
    href: "/tools/dictionary",
    Icon: GiSpellBook,
    description:
      "Unlock the power of AI to find definitions, synonyms, antonyms, and more.",
  },
  {
    label: "Reverse Dictionary",
    href: "/tools/reverse-dictionary",
    Icon: AiOutlineSwap,
    description:
      "Get help finding the right word to express your thoughts and ideas.",
  },
  {
    label: "Grammar Corrector",
    href: "/tools/grammar-corrector",
    Icon: TbPencilMinus,
    description: "Check grammar and punctuation errors in your text.",
  },
  {
    label: "Translator",
    href: "/tools/translator",
    Icon: BsTranslate,
    description: "Translate long text from one language to another.",
  },
  {
    label: "Paraphraser",
    href: "/tools/paraphraser",
    Icon: BsJournalText,
    description:
      "Rewrite sentences to avoid plagiarism and improve readability.",
  },
  {
    label: "Summarizer",
    href: "/tools/summarizer",
    Icon: MdOutlineShortText,
    description: "Summarize long text into a short summary.",
  },
];
//======================================
export const ToolsBentoTools = () => {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
      {languageTools.map(({ Icon, label, href, description }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "group w-full rounded-2xl border-none p-[1px] no-underline shadow-primary-700/50 duration-500  hover:shadow-lg active:scale-95 md:hover:scale-105",
            "bg-gradient-to-bl from-indigo-600/80 via-rose-600/40 to-indigo-600/80"
          )}
        >
          <div className="h-full overflow-hidden rounded-2xl bg-slate-900/[0.99] backdrop-blur duration-200">
            <div className="px-3 pb-4 pt-8 md:px-4">
              <div className="h-full flex-col-end">
                <div className="mx-auto flex-col-center">
                  <Icon size="40" className="text-slate-200" />
                  <h3 className="mb-0 text-center text-xl font-extrabold tracking-wide text-primary-600">
                    {label}
                  </h3>
                  <p className="mt-[3px] text-center font-medium text-slate-300">
                    {description}
                  </p>
                  <FaArrowRight
                    size="17"
                    className="mx-auto text-slate-500 group-hover:text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
