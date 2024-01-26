"use client";
import { languagetoolsList, ToolsBar } from "@/components";
import { capitalizeFirstLetter, cn } from "@/utils/helpers";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { MantineProvider, AppShell, Burger } from "@mantine/core";
import * as React from "react";
import { theme } from "../../theme";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const title = capitalizeFirstLetter(segment?.replaceAll("-", " ") as string);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const pathname = usePathname();

  return (
    <>
      <title>{title}</title>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: "240px",
            breakpoint: "sm",
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
        >
          <AppShell.Header withBorder={false}>
            <div className="h-full px-4">
              <div className="h-full gap-2 flex-row-start">
                {/* <Burger
                  opened={mobileOpened}
                  onClick={toggleMobile}
                  hiddenFrom="sm"
                  size="sm"
                /> */}
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom="sm"
                  size="sm"
                />
                <div className="relative aspect-video h-12 ">
                  <Image src="/logo.svg" fill alt="logo" />
                </div>
              </div>
            </div>
          </AppShell.Header>

          <AppShell.Navbar p="xs" withBorder={false}>
            {/* <div className="relative h-10 w-32">
              <Image src="/logo.svg" fill alt="logo" />
            </div> */}
            <div className="h-full space-y-2 border-0 border-r border-solid border-slate-500 pr-4 pt-1">
              {languagetoolsList.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className="group block rounded px-2 py-2 text-slate-200 no-underline"
                >
                  <div className="gap-2 flex-row-start">
                    <span
                      className={cn(
                        "center h-8 w-8 rounded-lg border border-solid border-slate-500 duration-300 group-hover:border-transparent group-hover:bg-primary-600",
                        pathname == item.href &&
                          "border-transparent bg-primary-600"
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </AppShell.Navbar>

          <AppShell.Main py="lg" px="0">
            <div className="flex">
              <div
                className={cn(
                  "hidden h-full w-[240px] md:block"
                  // !desktopOpened && "hidden"
                )}
              ></div>
              <div className="grow px-4 py-1">
                <div className="mx-auto max-w-4xl pt-10">
                  <ToolsBar />
                  {children}
                </div>
              </div>
            </div>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}
