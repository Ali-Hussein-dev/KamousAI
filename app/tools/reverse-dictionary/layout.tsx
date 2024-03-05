import type { Metadata } from "next";
import type * as React from "react";

export const metadata: Metadata = {
  title: "Reverse Dictionary",
  description: "Get help finding the right word.",
};

//======================================
const ReverseDLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default ReverseDLayout;
