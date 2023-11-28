import { useInputFocus } from "@/hooks/use-input-focus";
import { Textarea } from "@mantine/core";
import dynamic from "next/dynamic";

//======================================
export const CustomTextarea = ({ ...rest }) => {
  const { inputRef } = useInputFocus<HTMLTextAreaElement>();
  return (
    <Textarea
      unstyled
      ref={inputRef}
      autosize
      minRows={4}
      maxRows={9}
      className="w-full"
      classNames={{
        input:
          "font-medium placeholder:text-slate-500 !text-base tracking-wide bg-slate-700/50 focus:bg-slate-700/70 w-full focus:outline-none resize-none px-3 border-none rounded-lg py-4",
      }}
      {...rest}
    />
  );
};

export const DynamicCustomTextarea = dynamic(
  () =>
    import("@/components/Mantine/custom-textarea").then(
      (c) => c.CustomTextarea
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 w-full animate-pulse rounded-lg bg-slate-700/70"></div>
    ),
  }
);