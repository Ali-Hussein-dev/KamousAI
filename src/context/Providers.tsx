// app/providers.jsx
"use client";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleAnalytics } from "nextjs-google-analytics";
import React from "react";
import { theme } from "theme";
// import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryStreamedHydration> */}
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          {props.children}
        </MantineProvider>
        {/* </ReactQueryStreamedHydration> */}
        {<ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
      <GoogleAnalytics trackPageViews strategy="lazyOnload" />
    </>
  );
}
