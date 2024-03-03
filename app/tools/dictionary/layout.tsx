import type { Metadata } from "next";
import type * as React from "react";

export const metadata: Metadata = {
  title: "AI Dictionary",
  description: "AI Dictionary with more capabilites",
};

//======================================
const AIDictionaryLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default AIDictionaryLayout;
