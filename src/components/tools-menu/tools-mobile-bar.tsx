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
import { Skeleton } from "../Skeleton";
import css from "./tools-menu.module.css";

// https://codepen.io/ali-hussein-dev/pen/BabOdxY

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
    href: "/tools/paraphraser",
    icon: <BsJournalText className="text-white" />,
  },
  {
    label: "Summarizer",
    href: "/tools/summarizer",
    icon: <MdOutlineShortText className="text-white" />,
    isNew: true,
  },
];

export const ToolsMobileBar = () => {
  const pathname = usePathname();
  return (
    <div className="center fixed bottom-0 w-full bg-gradient-to-t from-slate-700 to-slate-700/10 px-2 pt-4 backdrop-blur-sm sm:hidden">
      <div
        className={
          "h-[4.9rem] w-full max-w-lg overflow-hidden rounded-t bg-slate-800 shadow-inner"
        }
      >
        <nav className={css.nav}>
          {toolsLinks.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className={cn(
                "w-fit px-2 pb-8 pt-2 no-underline duration-500",
                pathname == item.href
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-300"
              )}
            >
              <div className={"w-full gap-1 flex-col-center"}>
                <span
                  className={cn(
                    "center h-9 w-9 rounded-lg border border-solid border-slate-600 duration-300 group-hover:border-transparent group-hover:bg-primary-600",
                    pathname == item.href && "border-transparent bg-primary-600"
                  )}
                >
                  {item.icon}
                </span>
                <span className="whitespace-nowrap text-center text-[10px]">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export const DynamicToolsMobileBar = dynamic(
  () => import("./tools-mobile-bar").then((c) => c.ToolsMobileBar),
  {
    ssr: false,
    loading: () => (
      <div className="center fixed bottom-0 w-full bg-gradient-to-t from-slate-700 to-slate-700/10 pt-4 sm:hidden">
        <Skeleton cls="h-16" />
      </div>
    ),
  }
);
