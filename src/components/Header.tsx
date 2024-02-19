import { cn } from "@/utils/helpers";
import {
  // ActionIcon,
  Anchor,
  // Avatar,
  // Tooltip,
  AppShell,
  Button,
} from "@mantine/core";
import { useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

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
  const ref = React.useRef<HTMLHeadingElement>();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useScroll();
  React.useEffect(
    () => scrollY.on("change", () => setY(scrollY.get())),
    [scrollY]
  );
  return (
    <AppShell.Header
      py={4}
      px={10}
      withBorder={false}
      pos="fixed"
      classNames={{
        header: cn(
          "h-14 w-full top-0",
          y > height ? "bg-slate-900/50 backdrop-blur-lg" : ""
        ),
      }}
    >
      <div className="mx-auto w-full max-w-[1520px] flex-row-between md:px-6">
        <Anchor c="white" href="/">
          <Image src="/logo.svg" width={100} height={40} alt="logo" />
        </Anchor>
        <Link href="/login" className="hidden">
          <Button variant="light" radius="md">
            Login
          </Button>
        </Link>
      </div>
    </AppShell.Header>
  );
};
