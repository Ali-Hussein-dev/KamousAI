"use client";
import { languagetoolsList } from "@/components";
import { Card, Title } from "@mantine/core";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-full w-full max-w-2xl border pb-10 pt-5">
      <div className="mx-auto max-w-xl space-y-3 sm:pt-10">
        <Title size="sm" ml={2}>Language Tools</Title>
        {languagetoolsList.map((item) => (
          <Card key={item.label}>
            <Link href={item.href} className="text-slate-100 no-underline font-semibold">
              {item.label}
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
