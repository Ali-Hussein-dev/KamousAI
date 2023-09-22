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
      className="!relative"
      withBorder={false}
    >
      {/* <div className="h-[0.5px] bg-gradient-to-r from-transparent via-white to-transparent max-w-4xl mx-auto mb-1" /> */}
      <div className="h-[0.5px] bg-white/40 max-w-4xl mx-auto mb-2" />
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

