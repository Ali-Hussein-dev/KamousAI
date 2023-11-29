import { useInputFocus } from "@/hooks/use-input-focus";
import { isFunction } from "@/utils/helpers";
import { ActionIcon, Textarea, type TextareaProps } from "@mantine/core";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@mantine/hooks";
import { MdClear } from "react-icons/md";
interface CustomTextareaProps extends TextareaProps {
  loading?: boolean;
  cb: (e: React.KeyboardEventHandler<Element>) => void;
}
//======================================
export const CustomTextarea = ({
  loading,
  cb,
  ...rest
}: CustomTextareaProps) => {
  const onKeyDown: React.KeyboardEventHandler<Element> = (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // @ts-expect-error waiting for update from the libray maintainer link: https://github.com/vercel/ai/discussions/799
      cb(e);
    }
  };
  const { inputRef } = useInputFocus<HTMLTextAreaElement>();
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <Textarea
      unstyled
      ref={inputRef}
      autosize
      minRows={4}
      maxRows={9}
      classNames={{
        root: "w-full",
        wrapper:
          "flex justify-center items-start px-2 py-3 bg-slate-700/50 rounded-lg focus-within:bg-slate-700/70",
        input:
          "border-none focus:outline-none w-full bg-transparent resize-none font-medium placeholder:text-slate-500 text-base tracking-wide",
      }}
      onKeyDown={loading || !isFunction(cb) || isMobile ? undefined : onKeyDown}
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
