"use client";
import { languagetoolsList } from "@/components";
import { Title } from "@mantine/core";
import clsx from "clsx";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-full w-full max-w-[50rem] pb-3 pt-5 sm:pt-16">
      <div className="mx-auto space-y-3">
        <Title order={2} ta="center" mb="lg">
          Language Tools
        </Title>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-11">
          {languagetoolsList.map(({ label, href, description }, i) => (
            <Link
              key={label}
              href={href}
              className={clsx(
                "w-full p-[2px] no-underline duration-500 rounded-2xl hover:bg-gradient-to-bl hover:shadow-lg hover:scale-105 active:scale-95 shadow",
                "bg-transparent from-fuchsia-400/50 to-amber-600/70",
                i == 0 && "md:col-span-3",
                i == 1 && "md:col-start-4 md:col-end-9",
                i == 2 && "md:col-start-9 md:col-end-12",
                i == 3 && "md:col-span-full"
              )}
            >
              <div className="bg-gradient-radial from-slate-800/90 to-slate-900 h-full rounded-2xl p-4 pt-6 duration-200">
              <div className="h-full flex-col-end">
                <div className="mx-auto ">
                  <div className="">
                    <h3 className="text-2xl font-black tracking-wide text-center text-amber-600">
                      {label}
                    </h3>
                  </div>
                  <p className="text-center text-lg mt-[2px] text-slate-400">
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
