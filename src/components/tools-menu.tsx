"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPencilMinus } from "react-icons/tb";
import { GiSpellBook } from "react-icons/gi";
import { AiOutlineSwap } from "react-icons/ai";
import { BsTranslate, BsJournalText } from "react-icons/bs";
import { MdOutlineShortText } from "react-icons/md";
import { cn } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { Skeleton } from "./Skeleton";

export const toolsLinks = [
  {
    label: "AI Dictionary",
    href: "/tools/dictionary",
    icon: <GiSpellBook className="text-white" />,
  },
  {
    label: "Reverse Dictionary",
    href: "/tools/reverse-dictionary",
    icon: <AiOutlineSwap className="text-white" />,
  },
  {
    label: "Grammar Corrector",
    href: "/tools/grammar-corrector",
    icon: <TbPencilMinus className="text-white" />,
  },
  {
    label: "Translator",
    href: "/tools/translator",
    icon: <BsTranslate className="text-white" />,
  },
  {
    label: "Paraphraser",
    href: "/tools/text-optimizer",
    icon: <BsJournalText className="text-white" />,
  },
  {
    label: "Summarizer",
    href: "/tools/summarizer",
    icon: <MdOutlineShortText className="text-white" />,
    isNew: true,
  },
];

export const ToolsBar = () => {
  const pathname = usePathname();
  return (
    <div className="center fixed bottom-0 w-full bg-gradient-to-t from-slate-700 to-slate-700/10 px-4 pb-5 pt-5 sm:hidden">
      <nav className="mx-auto w-full rounded-lg bg-slate-800 px-2 py-1">
        <div className="w-full max-w-xl">
          <div className="gap-1 flex-row-between">
            {toolsLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn("pb-1 pt-1 no-underline duration-500")}
              >
                {/* <ActionIcon >{item.icon}</ActionIcon> */}
                <span
                  className={cn(
                    "center h-9 w-9 rounded-lg border border-solid border-slate-600 duration-300 group-hover:border-transparent group-hover:bg-primary-600",
                    pathname == item.href && "border-transparent bg-primary-600"
                  )}
                >
                  {item.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export const DynamicToolsBar = dynamic(
  () => import("./tools-menu").then((c) => c.ToolsBar),
  {
    ssr: false,
    loading: () => (
      <div className="center fixed bottom-0 w-full bg-gradient-to-t from-slate-700 to-slate-700/10 px-4 pb-5 pt-5 sm:hidden">
        <Skeleton />
      </div>
    ),
  }
);