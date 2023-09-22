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
      // height={60}
      p="xs"
      className="flex-row-center"
      withBorder={false}
    >
      <div className="mx-auto w-full max-w-4xl flex-row-center ">
        <Anchor c="white" href="/">
          <div className="text-2xl font-extrabold">KamousAI</div>
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
