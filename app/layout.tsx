"use client";
// All packages except `@mantine/hooks` require styles imports
import { ColorSchemeScript } from "@mantine/core";
import { Layout } from "@/components";
import { Inter } from "next/font/google"
import "../src/styles/globals.css";
import "@mantine/core/styles.css";
const fontFamily = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight:["300","400", "500", "600", "700", "800", "900"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <title>KamousAI | AI Language Tools</title>
      </head>
      <body className={fontFamily.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
