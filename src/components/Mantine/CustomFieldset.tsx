import { type FieldsetProps, Fieldset as MantineFieldset } from "@mantine/core";
//======================================
export const Fieldset = (props: FieldsetProps) => {
  return (
    <MantineFieldset
      legend="Fieldset"
      classNames={{
        root: "border-slate-700 space-y-2",
      }}
      bg="transparent"
      px="xs"
      radius="md"
      {...props}
    />
  );
};
