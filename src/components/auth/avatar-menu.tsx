"use client";
import Link from "next/link";
import { ActionIcon, Menu } from "@mantine/core";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { useAuth } from "@/hooks/use-auth";
import { CustomMenu } from "@/components/Mantine/custom-menu";
import { LoginLink } from "@/components/auth/login-link";

//======================================
export const AvatarMenu = ({
  LogoutButton,
}: {
  LogoutButton: React.ReactNode;
}) => {
  const { isAuth } = useAuth();
  return isAuth ? (
    <CustomMenu position="bottom-end">
      <Menu.Target>
        <ActionIcon size="lg" radius="lg">
          <RiAccountPinCircleFill size="20" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown className=" !bg-slate-800 text-slate-200" py="md" px="0">
        <Menu.Item>
          <Link
            href="/profile"
            className="next-link px-3 py-2 hover:bg-slate-500/20"
          >
            <RiAccountPinCircleFill className="text-slate-300" size="20" />
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item>{LogoutButton}</Menu.Item>
      </Menu.Dropdown>
    </CustomMenu>
  ) : (
    <LoginLink />
  );
};
