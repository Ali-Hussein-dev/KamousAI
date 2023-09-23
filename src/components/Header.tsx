import {
  ActionIcon,
  Anchor,
  Avatar,
  Tooltip,
  AppShell
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
// import Link from "next/link";

//======================================
export const UserDropdown = () => {
  const { data: sessionData } = useSession();
  // const [opened, { toggle }] = useDisclosure(false);
  return (
    <ActionIcon onClick={() => void signOut()}>
      <Tooltip label="Logout">
        <Avatar src={sessionData?.user?.image as string} radius="xl">
          {sessionData?.user?.name}
        </Avatar>
      </Tooltip>
    </ActionIcon>
  );
};
//======================================
export const Header = () => {
  // const { data: sessionData } = useSession();
  return (
    <AppShell.Header
      p="xs"
      className="border-solid border-b border-0 border-slate-500"
      withBorder={false}
      pos="relative"
    >
      <div className="mx-auto w-full max-w-[1520px] flex-row-start">
        <Anchor c="primary" href="/">
          <span className="text-2xl sm:text-3xl font-extrabold">KamousAI</span>
        </Anchor>
        {/* {sessionData ? (
          <UserDropdown />
        ) : (
          <Link href="/signin">
            <Button variant="outline" color="gray" radius="md">
              Login
            </Button>
          </Link>
        )} */}
      </div>
    </AppShell.Header>
  );
};
