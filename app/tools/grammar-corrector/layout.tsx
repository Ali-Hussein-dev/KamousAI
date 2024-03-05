import type { Metadata } from "next";
import type * as React from "react";

export const metadata: Metadata = {
  title: "Grammar Corrector",
  description: "Check and correct your grammar mistakes with AI.",
};

//======================================
const GrammarCorrectorLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};
export default GrammarCorrectorLayout;
