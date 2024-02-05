// import { Translator } from "@/components/Translator";
import { ToolRating } from "@/components/tool-rating";
import dynamic from "next/dynamic";

const DynamicTranslator = dynamic(
  () => import("@/components/Translator").then((c) => c.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[17rem] w-full animate-pulse rounded-lg bg-slate-600/50 md:h-[23rem]"></div>
    ),
  }
);

const TranslatorPage = () => {
  return (
    <>
      <DynamicTranslator />
      <div className="my-8">
        <ToolRating />
      </div>
    </>
  );
};
export default TranslatorPage;
