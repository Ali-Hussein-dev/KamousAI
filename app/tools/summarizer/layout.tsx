import type { Metadata } from "next";
import type * as React from "react";

export const metadata: Metadata = {
  title: "Summarizer",
  description: "Summarize your text to the most important parts.",
};

//======================================
const SummarizerLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default SummarizerLayout;
