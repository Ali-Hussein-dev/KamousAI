"use client";
import {
  toolsLinks,
  DynamicToolsMobileBar,
} from "@/components/tools-menu/tools-mobile-bar";
import { capitalizeFirstLetter, cn } from "@/utils/helpers";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { AppShell, Burger } from "@mantine/core";
import * as React from "react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

//======================================
export const SharedToolsLayout = ({
  AvatarMenu,
  children,
}: {
  AvatarMenu: React.ReactNode;
  children: React.ReactNode;
}) => {
  const segment = useSelectedLayoutSegment();
  const [mobileOpened] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const pathname = usePathname();
  const title = capitalizeFirstLetter(
    (segment || "TOOLS").replaceAll("-", " ") as string
  );
  if (pathname == "/tools")
    return (
      <>
        <title>{title}</title>
        {children}
      </>
    );
  return (
    <AppShell
      header={{ height: 55 }}
      navbar={{
        width: { xs: "180px", sm: "200", md: "240px", lg: "250" },
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      classNames={{
        root: "bg-slate-800 relative",
        // main: "",
        header: "bg-transparent",
        navbar: "bg-slate-800",
        // footer: "bg-gray-800",
      }}
    >
      <AppShell.Header
        withBorder={false}
        classNames={{ header: "bg-slate-700/80 backdrop-blur" }}
      >
        <div className="h-full gap-2 px-3 flex-row-between md:px-4">
          {/* <Burger
                  opened={mobileOpened}
                  onClick={toggleMobile}
                  hiddenFrom="sm"
                  size="sm"
                /> */}
          <div className="gap-2 flex-row-start">
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Link href="/" className="relative mt-[3px]">
              <Image src="/logo.svg" width={100} height={14} alt="logo" />
            </Link>
          </div>
          {AvatarMenu}
        </div>
      </AppShell.Header>

      <AppShell.Navbar
        p={{ base: "xs", md: "md", lg: "lg" }}
        withBorder={false}
      >
        {/* <div className="relative h-10 w-32">
              <Image src="/logo.svg" fill alt="logo" />
            </div> */}
        <div className="h-full space-y-2 border-0 border-t border-slate-600 pt-5">
          {toolsLinks.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="group block rounded py-2 text-slate-200 no-underline"
            >
              <div className="gap-3 flex-row-start md:gap-5">
                <span
                  className={cn(
                    "center h-8 w-8 rounded-lg border border-solid border-slate-500 duration-300 group-hover:border-transparent group-hover:bg-primary-600",
                    pathname == item.href && "border-transparent bg-primary-600"
                  )}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium tracking-wide md:text-base">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </AppShell.Navbar>

      <AppShell.Main py="lg" px="0" pb="0">
        <div className="flex">
          <div
            className={cn(
              "hidden h-40 sm:block",
              desktopOpened ? "w-[290px] grow md:w-[340px]" : "hidden"
            )}
          ></div>
          <div className={cn("w-full p-1", desktopOpened ? "" : "grow")}>
            <div className="mx-auto max-w-4xl pb-28 pt-10 sm:pb-4">
              {children}
            </div>
          </div>
        </div>
        <DynamicToolsMobileBar />
      </AppShell.Main>
    </AppShell>
  );
};
