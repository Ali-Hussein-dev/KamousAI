import { api } from "@/utils/api";
import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import {
  type MantineColorsTuple,
  MantineProvider,
  TypographyStylesProvider,
  createTheme,
  
} from "@mantine/core";
import * as React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "@/styles/globals.css";
import '@mantine/core/styles.css';

const primary: MantineColorsTuple = [
  "#eef3ff",
  "#dee2f2",
  "#bdc2de",
  "#98a0ca",
  "#7a84ba",
  "#6672b0",
  "#5c68ac",
  "#4c5897",
  "#424e88",
  "#364379"
];
const theme = createTheme({
  colors: {
    primary,
    dark:primary
  }
})
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <MantineProvider
        defaultColorScheme="dark"
          theme={{
          primaryColor: "primary",
            ...theme
          }}
        >
          <TypographyStylesProvider p={0}>
            <GoogleAnalytics trackPageViews strategy="lazyOnload" />
            <Component {...pageProps} />
          </TypographyStylesProvider>
        </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
