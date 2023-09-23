// All packages except `@mantine/hooks` require styles imports
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import "../src/styles/globals.css";
import '@mantine/core/styles.css';

export const metadata = {
  title: "KamousAI | AI Dictionary",
  description: "KamousAI is a new way to learn new words.",
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
      </head>
          <body>
        <MantineProvider
          defaultColorScheme="dark"
          theme= {theme}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
