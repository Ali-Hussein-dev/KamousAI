import type { Metadata } from "next";
import type * as React from "react";

export const metadata: Metadata = {
  title: "Translator",
  description: "Translate long text to another language.",
};

//======================================
const TranslatorLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default TranslatorLayout;
