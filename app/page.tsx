"use client";
import { AppLayout } from "@/components/app-layout";
import { EasyAccess } from "@/components/easy-access";
import { ToolsBentoTools } from "@/components/tools-bento-grid";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <div className="center mx-auto h-[90vh] w-full max-w-4xl pb-3 pt-5">
        <div className="absolute right-0 top-0 h-[24rem] w-full bg-gradient-to-b from-slate-900/70 to-transparent sm:h-[30rem] lg:h-[44rem]"></div>
        <div className="animate-in mb-12 flex-col-center">
          <h1 className="h1 text-balance">Language Learning Tools</h1>
          <h2 className="text-pretty mt-0 text-center text-base text-slate-400 md:text-2xl">
            Advance your language skills with AI
          </h2>
          <Link href="/tools/dictionary">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-44 cursor-pointer items-center justify-center rounded-full bg-primary-900 px-3 py-1 font-semibold text-slate-200 backdrop-blur-3xl">
                Get Started
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl space-y-12">
        <ToolsBentoTools />
        <EasyAccess />
      </div>
    </AppLayout>
  );
};

export default Home;
