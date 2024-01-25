"use client";
import { Button, Menu } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPencilMinus, TbChevronDown } from "react-icons/tb";
import { GiSpellBook } from "react-icons/gi";
import { GoGoal } from "react-icons/go";
import { LuCheck } from "react-icons/lu";
import { CustomMenu } from "./Mantine/custom-menu";
import { AiOutlineSwap } from "react-icons/ai";
import { BsTranslate } from "react-icons/bs";

export const languagetoolsList = [
  {
    label: "Grammar Corrector",
    href: "/tools/grammar-corrector",
    status: "done",
    icon: <TbPencilMinus className="text-white" />,
    description: "Correct grammar and punctuation errors in text.",
  },
  {
    label: "AI Dictionary",
    href: "/tools/dictionary",
    status: "done",
    icon: <GiSpellBook className="text-white" />,
    description:
      "An AI-based Dictionary for looking up the meanings and definitions of words.",
  },
  {
    label: "Paraphraser",
    href: "/tools/text-optimizer",
    status: "done",
    icon: <GoGoal className="text-white" />,
    description: "Optimize and improve written text for clarity and style.",
  },
  {
    label: "Reverse Dictionary",
    href: "/tools/reverse-dictionary",
    status: "done",
    icon: <AiOutlineSwap className="text-white" />,
    description:
      "Find words or idioms based on meanings or descriptions you give.",
  },
  {
    label: "Translator",
    href: "/tools/translator",
    status: "done",
    icon: <BsTranslate className="text-white" />,
    description: "Translate long text from one language to another.",
  },
];
//======================================
export const ToolsMenu = () => {
  const pathname = usePathname();
  return (
    <CustomMenu>
      <Menu.Target>
        <Button radius="lg" rightSection={<TbChevronDown />} variant="light">
          Tools
        </Button>
      </Menu.Target>
      <Menu.Dropdown p="sm">
        {languagetoolsList.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="w-full no-underline"
          >
            <Menu.Item
              key={item.label}
              leftSection={
                <span className="center h-7 w-7 rounded-lg bg-primary-500">
                  {item.icon}
                </span>
              }
            >
              <div className="w-full flex-row-between">
                <span>{item.label}</span>
                {pathname == item.href && (
                  <span className="">
                    <LuCheck />
                  </span>
                )}
              </div>
            </Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </CustomMenu>
  );
};
