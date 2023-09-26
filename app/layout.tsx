"use client";
// All packages except `@mantine/hooks` require styles imports
import { ColorSchemeScript } from "@mantine/core";
import { Layout } from "@/components";
import "../src/styles/globals.css";
import "@mantine/core/styles.css";

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
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
