"use client";
import { languagetoolsList } from "@/components";
import clsx from "clsx";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-full w-full max-w-[50rem] pb-3 pt-5 sm:pt-16">
      <div className="mx-auto space-y-3">
        <div className="">
          <h1 className="md:text-4xl text-2xl mb-0 font-extrabold text-primary-600 text-center">
            KamousAI
          </h1>
          <h2 className="text-xl mt-0 font-normal text-slate-300 text-center">
            Language tools powered by AI
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-11">
          {languagetoolsList.map(({ label, href, description }, i) => (
            <Link
              key={label}
              href={href}
              className={clsx(
                "w-full p-[1px] no-underline duration-500 rounded-2xl hover:bg-gradient-to-bl hover:shadow-lg shadow-primary-700/50 hover:scale-105 active:scale-95 ",
                "bg-transparent from-purple-600 to-primary-600",
                i == 0 && "md:col-span-3",
                i == 1 && "md:col-start-4 md:col-end-9",
                i == 2 && "md:col-start-9 md:col-end-12",
                i == 3 && "md:col-span-full"
              )}
            >
              <div className="bg-gradient-radial from-slate-800/80 to-slate-800 h-full rounded-2xl p-4 pb-2 pt-6 duration-200">
              <div className="h-full flex-col-end">
                <div className="mx-auto ">
                      <h3 className="text-2xl font-black tracking-wide text-center text-primary-200/90 mb-0">
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
