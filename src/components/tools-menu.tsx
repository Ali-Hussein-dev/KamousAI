"use client";
import { Button, Menu } from "@mantine/core";
import Link from "next/link";
import { TbChevronDown } from "react-icons/tb";
import { TbPencilMinus } from "react-icons/tb";
import { PiBooksLight } from "react-icons/pi";
import { GiSpellBook } from "react-icons/gi";
import { GoGoal } from "react-icons/go";

export const languagetoolsList = [
  
  {
    label: "Grammar Corrector",
    href: "/tools/grammar-corrector",
    status: "done",
    icon: <TbPencilMinus />,
    description:
      "A tool that helps correct grammar and punctuation errors in text.",
  },
  {
    label: "KamousAI",
    href: "/tools/dictionary",
    status: "done",
    icon: <PiBooksLight />,
    description: "An AI Dictionary for looking up the meanings and definitions of words.",
  },
  {
    label: "Text Optimizer",
    href: "/tools/text-optimizer",
    status: "done",
    icon: <GoGoal />,
    description:
      "A tool designed to optimize and improve written text for clarity and style.",
  },
  {
    label: "Reverse Dictionary",
    href: "/tools/reverse-dictionary",
    status: "done",
    icon: <GiSpellBook />,
    description:
      "A tool that allows you to find words based on their meanings or descriptions.",
  },
];
//======================================
export const ToolsMenu = () => {
  return (
    <Menu shadow="lg" width={270} position="bottom-end">
      <Menu.Target>
        <Button radius="lg" rightSection={<TbChevronDown />} variant="light">
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
              <Menu.Item key={item.label} leftSection={item.icon}>
                {item.label}
              </Menu.Item>
            </Link>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};