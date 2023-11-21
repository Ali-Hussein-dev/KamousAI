import { useInputFocus } from "@/hooks/use-input-focus";
import { Textarea } from "@mantine/core";

//======================================
export const CustomTextarea = ({ ...rest }) => {
  const { inputRef } = useInputFocus<HTMLTextAreaElement>();
  return (
    <Textarea
      ref={inputRef}
      autosize
      minRows={4}
      maxRows={8}
      className="w-full"
      classNames={{
        input:
          "!bg-transparent !border-slate-600 !border-none duration-300 !font-medium placeholder:!text-slate-400 !text-base !tracking-wide !bg-slate-700/70 focus:!bg-slate-700",
        wrapper: "!bg-transparent",
      }}
      {...rest}
    />
  );
};
