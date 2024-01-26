"use client";
import { MantineProvider, AppShell } from "@mantine/core";
import { Footer, Header } from "@/components";
import * as React from "react";
import { theme } from "../../theme";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <AppShell>
        <Header />
        <AppShell.Main py="lg" px="xs">
          {children}
        </AppShell.Main>
        <Footer />
      </AppShell>
    </MantineProvider>
  );
};
