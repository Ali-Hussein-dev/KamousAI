"use client";
import { Button, Menu } from "@mantine/core";
import Link from "next/link";
import { TbChevronDown } from "react-icons/tb";

export const languagetoolsList = [
  {
    label: "Dictionary",
    href: "/tools/dictionary",
    status: "done",
description: "A tool for looking up the meanings and definitions of words.",
  },
  {
    label: "Grammar Corrector",
    href: "/tools/grammar-corrector",
    status: "done",
    description: "An application that helps correct grammar and punctuation errors in text.",
  },
  {
    label: "Reverse Dictionary",
    href: "/tools/reverse-dictionary",
    status: "done",
    description: "A feature that allows you to find words based on their meanings or descriptions.",
  },
  {
    label: "Text Optimizer",
    href: "/tools/text-optimizer",
    status: "planned",
    description: "An upcoming tool designed to optimize and improve written text for clarity and style.",
  },
];
//======================================
export const ToolsMenu = () => {
  return (
    <Menu shadow="lg" width={270} position="bottom-end">
      <Menu.Target>
        <Button radius="lg" rightSection={<TbChevronDown />} variant="outline">
          Language Tools
        </Button>
      </Menu.Target>
      <Menu.Dropdown p="sm">
        {languagetoolsList
          .filter((o) => o.status === "done")
          .map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="w-full no-underline"
            >
              <Menu.Item key={item.label}>{item.label}</Menu.Item>
            </Link>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};
