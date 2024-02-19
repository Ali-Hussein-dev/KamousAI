"use client";
import { AppShell } from "@mantine/core";
import { Footer, Header } from "@/components";
import * as React from "react";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg">
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
        <Footer />
      </AppShell>
    </div>
  );
};
