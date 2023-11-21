import { Select, type SelectProps } from "@mantine/core";

//======================================
export const CustomSelect = (props: SelectProps) => {
  return (
    <Select
      searchable
      classNames={{
        dropdown: "!bg-slate-700 !rounded-lg !border-[1px] !border-slate-600",
        option: "hover:!bg-slate-800 !rounded",
        input: "!bg-slate-700 !border-[1px] !border-slate-600",
      }}
      {...props}
    />
  );
};
