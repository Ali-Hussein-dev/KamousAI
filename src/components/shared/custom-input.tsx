import { cn } from "@/utils/helpers";
import { Input, type InputProps } from "@mantine/core";

//======================================
export const CustomInput = (
  props: InputProps & React.ComponentPropsWithoutRef<"input">
) => {
  return (
    <Input
      //   ref={ref}
      classNames={{
        input: cn(
          "h-10 w-full rounded px-2 text-slate-100 focus:bg-slate-800/80 focus:outline-none font-medium text-slate-200 shadow-inner",
          "from-slate-800 to-slate-800/90 bg-gradient-to-t"
        ),
      }}
      variant="filled"
      {...props}
    />
  );
};
