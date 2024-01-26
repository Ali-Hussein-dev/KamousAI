"use client";
import Link from "next/link";
import { AiOutlineSwap } from "react-icons/ai";
import { BsTranslate } from "react-icons/bs";
import { RxFileText } from "react-icons/rx";
import { TbPencilMinus } from "react-icons/tb";
import { GiSpellBook } from "react-icons/gi";
import { cn } from "@/utils/helpers";

const languageTools = [
  {
    label: "AI Dictionary",
    href: "/tools/dictionary",
    icon: <GiSpellBook className="text-white" />,
    description:
      "An AI-based Dictionary for looking up the meanings and definitions of words.",
  },
  {
    label: "Reverse Dictionary",
    href: "/tools/reverse-dictionary",
    icon: <AiOutlineSwap className="text-white" />,
    description:
      "Find words or idioms based on meanings or descriptions you give.",
  },
  {
    label: "Grammar Corrector",
    href: "/tools/grammar-corrector",
    icon: <TbPencilMinus className="text-white" />,
    description: "Correct grammar and punctuation errors in text.",
  },
  {
    label: "Translator",
    href: "/tools/translator",
    icon: <BsTranslate className="text-white" />,
    description: "Translate long text from one language to another.",
  },
  {
    label: "Paraphraser",
    href: "/tools/text-optimizer",
    icon: <RxFileText className="text-white" />,
    description: "Optimize and improve written text for clarity and style.",
  },
  {
    label: "Summarizer",
    href: "/tools/summarizer",
    icon: <RxFileText className="text-white" />,
    description: "Summarize long text into a short summary.",
    isNew: true,
  },
];
//======================================
export const ToolsBentoTools = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {languageTools.map(({ label, href, description, isNew = false }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "w-full rounded-2xl border-none p-[1px] no-underline shadow-primary-700/50 duration-500 hover:bg-gradient-to-bl hover:shadow-lg active:scale-95 md:hover:scale-105",
            "bg-transparent from-purple-600/50 to-primary-600/50"
            // i == 0 && "md:col-span-3",
            // i == 1 && "md:col-start-4 md:col-end-10",
            // i == 2 && "md:col-start-10 md:col-end-13",
            // i == 3 && "md:col-span-6",
            // i == 4 && "md:col-start-7 md:col-end-13"
          )}
        >
          <div className="h-full overflow-hidden rounded-2xl bg-gradient-radial from-slate-800/80 to-slate-800 duration-200">
            {isNew && (
              <div className=" flex-row-end">
                <span className="rounded-bl-sm bg-amber-500/60 px-2 py-0.5 text-white">
                  NEW
                </span>
              </div>
            )}
            <div className={cn("px-3 pb-2 md:px-4", !isNew && "pt-6")}>
              <div className="h-full flex-col-end">
                <div className="mx-auto ">
                  <h3 className="text-gradient mb-0 bg-black text-center text-2xl font-extrabold tracking-wide">
                    {label}
                  </h3>
                  <p className="mt-[2px] text-center text-lg text-slate-300">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
