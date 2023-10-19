import {
  Anchor,
  AppShell,
} from "@mantine/core";
import { FaTwitter } from "react-icons/fa";

//======================================
export const Footer = () => {
  
  return (
    <AppShell.Footer p="xs" className="!relative" withBorder={false}>
      {/* <div className="mx-auto mb-1 h-[0.5px] max-w-4xl bg-gradient-to-r from-transparent via-white to-transparent" /> */}
      <div className="mx-auto mb-2 h-[0.5px] max-w-4xl bg-white/40" />
      <div className="mx-auto w-full max-w-4xl flex-row-between">
        <span>
          {/* ©{new Date().getFullYear()} */}
          Made by{" "}
          <a href="https://ali-hussein.com" target="_blank">
            AH
          </a>
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

