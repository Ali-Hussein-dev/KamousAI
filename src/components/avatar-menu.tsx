"use client";
import Link from "next/link";
import { CustomMenu } from "./Mantine/custom-menu";
import { ActionIcon, Menu } from "@mantine/core";
import { RiAccountPinCircleFill } from "react-icons/ri";
//======================================
export const AvatarMenu = ({
  LogoutButton,
}: {
  LogoutButton: React.ReactNode;
}) => {
  return (
    <CustomMenu position="bottom-end" opened>
      <Menu.Target>
        <ActionIcon size="lg" radius="lg">
          <RiAccountPinCircleFill size="20" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown className=" !bg-slate-800 text-slate-200" py="md" px="0">
        <Menu.Item>
          <Link
            href="/profile"
            className="gap-2 rounded px-3 py-2 font-medium tracking-wide text-slate-200 no-underline flex-row-start hover:bg-primary-700/20"
          >
            <RiAccountPinCircleFill className="text-slate-300" size="20" />
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item>{LogoutButton}</Menu.Item>
      </Menu.Dropdown>
    </CustomMenu>
  );
};
