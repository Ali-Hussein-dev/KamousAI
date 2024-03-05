import * as React from "react";
import { SharedToolsLayout } from "@/components/shared-tools-layout";

export const metadata = {
  title: "Tools List",
  description: "List of language learning tools",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedToolsLayout>{children}</SharedToolsLayout>;
}
