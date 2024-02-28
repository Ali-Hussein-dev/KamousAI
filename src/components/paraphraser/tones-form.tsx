"use client";
import { type Tone } from "@/hooks/use-paraphraser";
import { MdCheck, MdDelete, MdEdit, MdClear } from "react-icons/md";
import clsx from "clsx";
import { ActionIcon, Button, Fieldset } from "@mantine/core";
import * as React from "react";
import { CustomInput } from "@/components/shared/custom-input";
import { CiCirclePlus } from "react-icons/ci";
import { useParaphraserFormCtx } from "@/context/form-paraphraser-context";

//---------------------------------------------------
const ItemForm = ({
  id,
  label,
  value,
  setOpen: setOpen,
  i,
}: Tone & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  i: number;
}) => {
  const [toneForm, setToneForm] = React.useState({ id, value, label });
  const form = useParaphraserFormCtx();

  return (
    <Fieldset
      classNames={{
        root: "border-[1px] border-solid border-slate-500 mx-0",
      }}
      p="xs"
      legend={
        form.getInputProps(`configs.tones.${i}.label`).value || "Custom tone"
      }
      className="w-full gap-2 flex-col-start"
    >
      <div className="mb-2 w-full space-y-3">
        <CustomInput
          id="title"
          placeholder="Tone Title"
          value={toneForm.label}
          onChange={(e) => {
            setToneForm((prv) => ({ ...prv, label: e.target?.value }));
          }}
        />
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
            form.setFieldValue(`configs.tones.${i}.label`, toneForm.label);
            form.setFieldValue(`configs.tones.${i}.value`, toneForm.value);
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
const ToneItem = ({ id, label, value, i }: Tone & { i: number }) => {
  const [editable, setEditable] = React.useState(false);
  const form = useParaphraserFormCtx();
  return (
    <div
      className={clsx(
        "gap-2 py-0.5",
        editable ? "pb-1 flex-col-start" : "flex-row-between"
      )}
    >
      {editable ? (
        <ItemForm
          i={i}
          id={id}
          label={label}
          value={value}
          setOpen={setEditable}
        />
      ) : (
        <div className="w-full gap-2 flex-row-between">
          <div
            className="w-full cursor-pointer capitalize"
            onClick={() => {
              setEditable(true);
            }}
          >
            {label || "Custom Tone " + i}
          </div>
          <div className="gap-2 flex-row-start">
            <ActionIcon variant="light" onClick={() => setEditable(true)}>
              <MdEdit />
            </ActionIcon>
            <ActionIcon
              variant="light"
              onClick={() => form.removeListItem("configs.tones", i)}
              color="red"
            >
              <MdDelete />
            </ActionIcon>
          </div>
        </div>
      )}
    </div>
  );
};
//---------------------------------------------------
export const TonesForms = () => {
  const form = useParaphraserFormCtx();

  return (
    <div className="space-y-2 pt-4">
      {(form.values.configs.tones as Tone[]).map((item, i) => (
        <ToneItem key={i} {...item} i={i} />
      ))}
      <Button
        w="100%"
        radius={"lg"}
        variant="light"
        mt="lg"
        onClick={() => {
          form.insertListItem("configs.tones", {
            id: crypto.randomUUID(),
            label: "",
            value: "",
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
