"use client";
import { Button, Menu } from "@mantine/core";
import Link from "next/link";
import { TbChevronDown } from "react-icons/tb";

export const languagetoolsList = [
  { label: "Dictionary", href: "/tools/dictionary" },
  { label: "Grammer Correction", href: "/tools/grammer-correction" },
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
        {languagetoolsList.map((item) => (
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
