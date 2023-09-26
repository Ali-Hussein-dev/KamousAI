"use client";
import { languagetoolsList } from "@/components";
import { Card, Title } from "@mantine/core";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-full w-full max-w-2xl pt-5 sm:pt-14">
      <div className="mx-auto max-w-xl space-y-3">
        <Title order={2} ta="center">
          Language Tools
        </Title>
        {languagetoolsList.map((item) => (
          <Card key={item.label}>
            <Link
              href={item.href}
              className="font-semibold text-slate-100 no-underline"
            >
              {item.label}
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
