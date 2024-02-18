import {
  // ActionIcon,
  Anchor,
  // Avatar,
  // Tooltip,
  AppShell
} from "@mantine/core";
import Image from "next/image";
// import Link from "next/link";

//======================================
// export const UserDropdown = () => {
//   const { data: sessionData } = useSession();
//   // const [opened, { toggle }] = useDisclosure(false);
//   return (
//     <ActionIcon onClick={() => void signOut()}>
//       <Tooltip label="Logout">
//         <Avatar src={sessionData?.user?.image as string} radius="xl">
//           {sessionData?.user?.name}
//         </Avatar>
//       </Tooltip>
//     </ActionIcon>
//   );
// };
//======================================
export const Header = () => {
  // const { data: sessionData } = useSession();
  return (
    <AppShell.Header
      py={4}
      px={10}
      withBorder={false}
      pos="relative"
      classNames={{
        header: "!h-12",
      }}
    >
      <div className="mx-auto w-full max-w-[1520px] flex-row-start md:px-4">
        <Anchor c="white" href="/">
          <Image src="/logo.svg" width={100} height={40} alt="logo" />
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
