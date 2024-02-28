import { cn } from "@/utils/helpers";
import { Input, type InputProps } from "@mantine/core";

//======================================
export const CustomInput = (
  props: InputProps & React.ComponentPropsWithoutRef<"input">
) => {
  return (
    <Input
      classNames={{
        input: cn(
          "h-10 w-full rounded px-2 text-slate-100 font-medium text-slate-200 focus:shadow-inner placeholder:text-slate-600",
          "bg-slate-800 "
        ),
      }}
      variant="filled"
      {...props}
    />
  );
};
