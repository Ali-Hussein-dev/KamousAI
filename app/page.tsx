"use client";
import { languagetoolsList } from "@/components";
import { Badge, Button, Card, Text, Title } from "@mantine/core";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-full w-full max-w-3xl pt-5 sm:pt-16 pb-3">
      <div className="mx-auto space-y-3">
        <Title order={2} ta="center" mb="lg">
          Language Tools
        </Title>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full">
        {languagetoolsList.map(({ status, label, href, description }) => (
          <div key={label} className="bg-gradient-to-b from-slate-600 to-transparent p-4 rounded">
            <div className="mb-2 gap-2 flex-row-between">
              <Title order={3}>{label}</Title>
              {status !== "done" && <Badge>{status}</Badge>}
            </div>
            <Text c="gray">{description}</Text>
            <div className="mr-2 flex-row-end">
              {status === "done" && (
                <Link
                  href={href}
                  className="font-semibold text-slate-100 no-underline"
                >
                  <Button variant="outline" py="sm">
                    Use
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
