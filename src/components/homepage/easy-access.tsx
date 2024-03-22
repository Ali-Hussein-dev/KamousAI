import { FaWindows, FaAppStore, FaApple } from "react-icons/fa6";
import { DiAndroid } from "react-icons/di";
import Image from "next/image";
//======================================
export const EasyAccess = () => {
  return (
    <div className="mx-auto rounded-xl pb-6 pt-10 md:pt-16">
      <div className="mx-auto max-w-fit ">
        <h2 className="mb-3 text-center text-2xl font-extrabold sm:text-3xl md:text-5xl">
          Easy Access
        </h2>
        <p className="mt-0 max-w-xl pt-1 text-center sm:text-lg">
          KamousAI is a progressive web app(PWA), simply install it on any
          device using the browser.
        </p>
      </div>
      <div className="gap-4 pt-6 flex-row-center">
        <DiAndroid size="42" />
        <FaAppStore size="42" />
        <FaWindows size="42" />
        <FaApple size="42" />
      </div>
      <div className="pt-3 flex-col-center">
        <a
          href="https://play.google.com/store/apps/details?id=io.noorai.kamous.twa"
          target="_blank"
          className=""
        >
          <Image
            src="/google-play-badge.png"
            alt="google play badge"
            width={240}
            height={82}
          />
        </a>
      </div>
    </div>
  );
};
