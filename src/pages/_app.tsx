import { api } from "@/utils/api";
import "@/styles/globals.css";
import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import {
  MantineProvider,
  TypographyStylesProvider,
} from "@mantine/core";
import * as React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import '@mantine/core/styles.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // const [colorScheme, setColorScheme] = React.useState<ColorScheme>("dark");
  // const toggleColorScheme = (value?: ColorScheme) =>
    // setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionProvider session={session}>
        <MantineProvider
          // withGlobalStyles
          theme={{
          primaryColor: "gray",
            /** Put your mantine theme override here */
        }}
        defaultColorScheme="dark"
        >
          {/*
          <RouterTransition /> */}
          <TypographyStylesProvider>
            <GoogleAnalytics trackPageViews strategy="lazyOnload" />
            <Component {...pageProps} />
          </TypographyStylesProvider>
        </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
