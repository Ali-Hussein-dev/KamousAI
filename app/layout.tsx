"use client";
import "@mantine/core/styles.css";
// import { SessionProvider } from "next-auth/react";
import {
  MantineProvider,
  TypographyStylesProvider,
} from "@mantine/core";
import * as React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "./globals.css";

const Head = () => (
  <head>
    <link rel="icon" href="/favicon.ico" />
  </head>
);

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head />
      {/* <SessionProvider session={session}> */}
      <body>
        <MantineProvider
          theme={
            {
              primaryColor: "gray",
              /** Put your mantine theme override here */
            }
          }
          defaultColorScheme="dark"
        >
          <TypographyStylesProvider className='p-0'>
          <GoogleAnalytics trackPageViews strategy="lazyOnload" />
          {children}
          </TypographyStylesProvider>
        </MantineProvider>
      </body>
      {/* </SessionProvider> */}
    </html>
  );
};

export default RootLayout;
