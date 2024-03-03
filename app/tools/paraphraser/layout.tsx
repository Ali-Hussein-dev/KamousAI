import type { Metadata } from "next";
import type * as React from "react";

export const metadata: Metadata = {
  title: "Paraphraser",
  description: "Rewrite your text to avoid plagiarism and improve readability.",
};

//======================================
const ParaphraserLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default ParaphraserLayout;
