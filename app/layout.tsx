// All packages except `@mantine/hooks` require styles imports
import { ColorSchemeScript } from "@mantine/core";
import { Layout } from "@/components";
import { Nunito } from "next/font/google";
import "../src/styles/globals.css";
import "@mantine/core/styles.css";
import { Providers } from "@/context/Providers";
import NextTopLoader from "nextjs-toploader";

const fontFamily = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
        <NextTopLoader color="#6672b0" showSpinner={false} speed={300} />
        <Layout>
          <Providers>{children}</Providers>
        </Layout>
      </body>
    </html>
  );
}
