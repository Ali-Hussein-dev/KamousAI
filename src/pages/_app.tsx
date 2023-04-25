import { api } from "@/utils/api";
import "@/styles/globals.css";
import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import {
  ColorSchemeProvider,
  type ColorScheme,
  MantineProvider,
  TypographyStylesProvider,
} from "@mantine/core";
// import { Notifications } from "@mantine/notifications";
import * as React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
// import { RouterTransition } from "../components";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: "gray",
            /** Put your mantine theme override here */
          }}
        >
          {/* <Notifications position="top-center" />
          <RouterTransition /> */}
          <TypographyStylesProvider>
            <GoogleAnalytics trackPageViews strategy="lazyOnload" />
            <Component {...pageProps} />
          </TypographyStylesProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
