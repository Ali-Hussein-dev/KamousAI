import { Menu, type MenuProps } from "@mantine/core";

//======================================
export const CustomMenu = (props: MenuProps) => {
  return (
    <Menu
      shadow="xl"
      width={270}
      position="bottom-end"
      classNames={{
        dropdown: "!bg-slate-700 !rounded-lg !border-[1px] !border-slate-600",
        item: "data-[hovered]:!bg-slate-800 !rounded",
      }}
      radius="xs"
      {...props}
    >
      {props.children}
    </Menu>
  );
};
