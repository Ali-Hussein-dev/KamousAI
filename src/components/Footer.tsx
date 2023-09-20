import {
  Anchor,
  AppShell,
} from "@mantine/core";
import { FaTwitter } from "react-icons/fa";

//======================================
export const Footer = () => {
  
  return (
    <AppShell.Footer
      p="xs"
      className="flex-row-center relative"
    >
      <div className="mx-auto w-full max-w-4xl flex-row-between">
        <span>
          Powered by <b>AI</b>
        </span>
        <div className="gap-3 flex-row-start">
          <Anchor
            c="white"
            href="https://twitter.com/AliHussein_20"
            target="_blank"
          >
            <FaTwitter size="24" />
          </Anchor>
        </div>
      </div>
    </AppShell.Footer>
  );
};
