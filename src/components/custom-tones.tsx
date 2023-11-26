"use client";
import { type Tone, useTextOptimizer } from "@/hooks/use-text-optimizer";
import { MdCheck, MdDelete, MdEdit, MdClear } from "react-icons/md";
import clsx from "clsx";
import { ActionIcon, Button, Drawer, Fieldset } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import * as React from "react";
import { CustomInput } from "./shared/custom-input";
import { HiOutlineDocumentPlus } from "react-icons/hi2";

//---------------------------------------------------
const ItemForm = ({
  id,
  label,
  value,
  setOpen: setOpen,
}: Tone & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [toneForm, setToneForm] = React.useState({ id, value, label });
  const update = useTextOptimizer((s) => s.update);
  console.log({ toneForm });
  return (
    <Fieldset
      classNames={{
        root: "!border-[1px] !border-solid !border-slate-600 !mx-0",
      }}
      px="xs"
      py="xs"
      legend={toneForm.label}
      className="w-full gap-2 flex-col-start"
    >
      <div className="mb-2 w-full">
        <label htmlFor="title" className="text-sm text-slate-500">
          Title
        </label>
        <CustomInput
          id="title"
          placeholder="Title"
          value={toneForm.label}
          onChange={(e) => {
            setToneForm((prv) => ({ ...prv, label: e.target?.value }));
          }}
        />
        <label htmlFor="value" className="text-sm text-slate-500">
          Value
        </label>
        <CustomInput
          id="value"
          placeholder="Value"
          value={toneForm.value}
          onChange={(e) => {
            setToneForm((prv) => ({ ...prv, value: e.target?.value }));
          }}
        />
      </div>
      <div className="w-full gap-2 py-1 flex-row-start">
        {/* cancel button */}
        <Button
          variant="light"
          onClick={() => {
            setOpen(false);
          }}
          w="100%"
        >
          <MdClear />
        </Button>
        {/* // save button */}
        <Button
          variant="light"
          onClick={() => {
            update(toneForm);
            setOpen(false);
          }}
          w="100%"
        >
          <MdCheck />
        </Button>
      </div>
    </Fieldset>
  );
};
//---------------------------------------------------
const ToneItem = ({ id, label, value }: Tone) => {
  const [editable, setEditable] = React.useState(false);
  const remove = useTextOptimizer((s) => s.remove);

  return (
    <div
      className={clsx(
        "gap-2 py-0.5",
        editable ? "pb-1 flex-col-start" : "flex-row-between"
      )}
    >
      {editable ? (
        <ItemForm id={id} label={label} value={value} setOpen={setEditable} />
      ) : (
        <div className="w-full gap-2 flex-row-between">
          <div
            className="w-full"
            onClick={() => {
              setEditable(true);
            }}
          >
            {label} - {id}
          </div>
          <div className="gap-2 flex-row-start">
            <ActionIcon variant="light" onClick={() => setEditable(true)}>
              <MdEdit />
            </ActionIcon>
            <ActionIcon variant="light" onClick={() => remove(id)} color="red">
              <MdDelete />
            </ActionIcon>
          </div>
        </div>
      )}
    </div>
  );
};
export const CustomTones = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const tones = useTextOptimizer((s) => s.tones);
  return (
    <div className="">
      <Drawer
        title={"Customize text tones"}
        position="right"
        size="sm"
        opened={opened}
        onClose={close}
      >
        <div className="space-y-2 pt-3">
          {tones.map((item, i) => (
            <ToneItem key={i} {...item} />
          ))}
          <Button
            w="100%"
            radius={"lg"}
            variant="light"
            mt="lg"
            onClick={() => {
              console.log("add new tone...");
            }}
            leftSection={<HiOutlineDocumentPlus size="17" />}
            className="font-medium uppercase"
          >
            Add new tone
          </Button>
        </div>
      </Drawer>
      {/* <ItemForm label={label} value={value} setValue={setToneForm} /> */}
      <ActionIcon onClick={open} radius="lg" variant="light" size="lg">
        <MdEdit />
      </ActionIcon>
      {/* <Button>Save</Button> */}
    </div>
  );
};
