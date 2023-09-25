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
          <Menu.Item key={item.label}>
            <Link href={item.href} className="text-slate-100 no-underline">
              {item.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
