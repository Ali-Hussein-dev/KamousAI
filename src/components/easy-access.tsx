import { Text, Title } from "@mantine/core";
import { FaWindows, FaAppStore, FaApple } from "react-icons/fa6";
import { DiAndroid } from "react-icons/di";
import Image from "next/image";
//======================================
export const EasyAccess = () => {
  return (
    <div className="mx-auto rounded-xl bg-slate-900/30 pt-10">
      <div className="mx-auto max-w-fit ">
        <Title order={2} ta="center">
          Easy Access
        </Title>
        <Text ta="center">
          KamousAI is a PWA app, you can install it on all platforms through the
          browser
        </Text>
      </div>
      <div className="gap-8 pt-6 flex-row-center">
        <DiAndroid size="64" />
        <FaAppStore size="64" />
        <FaWindows size="64" />
        <FaApple size="64" />
      </div>
      <div className="pt-6 flex-col-center">
        <a
          href="https://play.google.com/store/apps/details?id=io.noorai.kamous.twa"
          target="_blank"
          className=""
        >
          <Image
            src="/google-play-badge.png"
            alt="google play badge"
            width={260}
            height={95}
          />
        </a>
      </div>
    </div>
  );
};
