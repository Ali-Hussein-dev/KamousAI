"use client";
import { type Tone } from "@/hooks/use-paraphraser";
import { MdCheck, MdDelete, MdEdit, MdClear } from "react-icons/md";
import clsx from "clsx";
import { ActionIcon, Button, Fieldset } from "@mantine/core";
import * as React from "react";
import { CustomInput } from "@/components/shared/custom-input";
import { CiCirclePlus } from "react-icons/ci";
import { useParaphraserContext } from "@/hooks/use-paraphraser";

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
  const update = useParaphraserContext((s) => s.update);
  return (
    <Fieldset
      classNames={{
        root: "!border-[1px] !border-solid !border-slate-600 !mx-0",
      }}
      px="xs"
      py="xs"
      legend={toneForm.label.toUpperCase()}
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
  const remove = useParaphraserContext((s) => s.remove);

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
            className="w-full cursor-pointer capitalize"
            onClick={() => {
              setEditable(true);
            }}
          >
            {label}
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
//---------------------------------------------------
export const Tones = () => {
  const tones = useParaphraserContext((s) => s.tones);
  const add = useParaphraserContext((s) => s.add);
  return (
    <div className="space-y-2 pt-4">
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
          add({
            id: crypto.randomUUID(),
            label: "New tone",
            value: "added",
          });
        }}
        leftSection={<CiCirclePlus size="17" />}
        className="font-medium capitalize"
      >
        Add new tone
      </Button>
    </div>
  );
};
