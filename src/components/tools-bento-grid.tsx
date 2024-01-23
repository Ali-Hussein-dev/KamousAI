"use client";
import Link from "next/link";
import { languagetoolsList } from "./tools-menu";
import { cn } from "@/utils/helpers";

//======================================
export const ToolsBentoTools = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12">
      {languagetoolsList.map(({ label, href, description }, i) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "w-full rounded-2xl p-[1px] no-underline shadow-primary-700/50 duration-500 hover:bg-gradient-to-bl hover:shadow-lg active:scale-95 md:hover:scale-105",
            "bg-transparent from-purple-600/50 to-primary-600/50",
            i == 0 && "md:col-span-3",
            i == 1 && "md:col-start-4 md:col-end-10",
            i == 2 && "md:col-start-10 md:col-end-13",
            i == 3 && "md:col-span-6",
            i == 4 && "md:col-start-7 md:col-end-13"
          )}
        >
          <div className="h-full rounded-2xl bg-gradient-radial from-slate-800/80 to-slate-800 p-4 pb-2 pt-6 duration-200">
            <div className="h-full flex-col-end">
              <div className="mx-auto ">
                <h3 className="mb-0 text-center text-2xl font-black tracking-wide text-primary-200/90">
                  {label}
                </h3>
                <p className="mt-[2px] text-center text-lg text-slate-400">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
