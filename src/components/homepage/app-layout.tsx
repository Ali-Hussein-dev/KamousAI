"use client";
import { AppShell } from "@mantine/core";
import { Header } from "@/components/homepage/Header";
import { Footer, } from "@/components/homepage/Footer";
import * as React from "react";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundRepeat: "repeat",
        backgroundSize: "250px 250px",
        backgroundImage: "url(/grid.svg)",
      }}
    >
      <AppShell
        classNames={{
          root: "from-slate-900 via-slate-900/80 to-slate-900 bg-gradient-to-r relative",
          // main: "",
          header: "bg-transparent",
          footer: "bg-gray-900",
        }}
      >
        <Header />
        <AppShell.Main py="lg" px="xs">
          {children}
        </AppShell.Main>
        <AppShell.Footer p="xs" className="!relative" withBorder={false}>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </div>
  );
};
