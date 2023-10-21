"use client";
import { languagetoolsList } from "@/components";
import clsx from "clsx";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-full w-full max-w-[52rem] pb-3 pt-5 sm:pt-16">
      <div className="mx-auto space-y-3">
        <div className="">
          <h1 className="mb-0 text-center text-2xl font-extrabold text-primary-600 md:text-4xl">
            KamousAI
          </h1>
          <h2 className="mt-0 text-center text-xl font-normal text-slate-300">
            Learning Language tools powered by AI
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12">
          {languagetoolsList.map(({ label, href, description }, i) => (
            <Link
              key={label}
              href={href}
              className={clsx(
                "w-full rounded-2xl p-[1px] no-underline shadow-primary-700/50 duration-500 hover:scale-105 hover:bg-gradient-to-bl hover:shadow-lg active:scale-95 ",
                "bg-transparent from-purple-600 to-primary-600",
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
                    <p className="text-center text-lg text-slate-400">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
