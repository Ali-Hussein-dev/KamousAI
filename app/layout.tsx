// All packages except `@mantine/hooks` require styles imports
import { ColorSchemeScript } from "@mantine/core";
// import { AppLayout } from "@/components/app-layout";
import { Nunito } from "next/font/google";
import "../src/styles/globals.css";
import "@mantine/core/styles.css";
import { Providers } from "@/context/Providers";
import NextTopLoader from "nextjs-toploader";
import { type Metadata } from "next";

const fontFamily = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const APP_NAME = "KamousAI";
const APP_DEFAULT_TITLE = "KamousAI";
const APP_TITLE_TEMPLATE = "%s - KamousAI";
const APP_DESCRIPTION = "AI Language Tools";

export const metadata: Metadata = {
  metadataBase: new URL("https://kamous.noorai.io"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <script
          async
          src="https://eu.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI}
        ></script>
        <meta name="theme-color" content="#334155" />
      </head>
      <body className={fontFamily.className}>
        <NextTopLoader color="#6672b0" showSpinner={false} speed={300} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
