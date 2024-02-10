"use client";
import { AppShell } from "@mantine/core";
import { Footer, Header } from "@/components";
import * as React from "react";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell>
      <Header />
      <AppShell.Main py="lg" px="xs">
        {children}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
};
