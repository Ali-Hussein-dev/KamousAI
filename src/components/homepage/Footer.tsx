import { Anchor } from "@mantine/core";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";

//======================================
export const Footer = () => {
  return (
    <>
      {/* <div className="mx-auto mb-1 h-[0.5px] max-w-4xl bg-gradient-to-r from-transparent via-white to-transparent" /> */}
      {/* <div className="mx-auto mb-2 h-[0.5px] max-w-4xl bg-slate-100/30" /> */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <Link
          href="/privacy-policy"
          className="font-medium text-slate-200 no-underline"
        >
          Privacy Policy
        </Link>
        <span>
          ©{new Date().getFullYear()} Built by{" "}
          <a
            href="https://ali-hussein.com"
            target="_blank"
            className="font-bold text-slate-200 no-underline"
          >
            AH
          </a>
        </span>
        <div className="gap-3 flex-row-start">
          <Anchor
            c="white"
            href="https://discord.gg/abk8R7PdjH"
            target="_blank"
          >
            <FaDiscord size="24" />
          </Anchor>
          <Anchor
            c="white"
            href="https://twitter.com/AliHussein_20"
            target="_blank"
          >
            <FaTwitter size="24" />
          </Anchor>
        </div>
      </div>
    </>
  );
};
