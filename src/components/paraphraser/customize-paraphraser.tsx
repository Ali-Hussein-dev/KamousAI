"use client";
import dynamic from "next/dynamic";
import * as React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCheck, MdClear, MdDelete, MdEdit } from "react-icons/md";
import { TbChevronDown } from "react-icons/tb";
import { useMutationParaphraser } from "@/hooks/use-query-paraphraser";
import defaultTones from "@/content/default-tones.json";
import { CustomInput } from "@/components/shared/custom-input";
import { CustomMenu } from "@/components/Mantine/custom-menu";
import {
  ParaphraserFormProv,
  useParaphraserFormCtx,
} from "@/context/paraphraser-form-ctx";
import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Drawer,
  Fieldset,
  Menu,
  Slider,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cn } from "@/utils/helpers";

type Tone = {
  value: string;
  label: string;
};
//---------------------------------------------------TEMPERATURE
function Temperature() {
  const form = useParaphraserFormCtx();
  return (
    <div className="py-1">
      <Text size="sm" mb="4px">
        Creativity Level ({form.getInputProps("configs.temperature").value}/2)
      </Text>
      <Slider
        name="temperature"
        {...form.getInputProps("configs.temperature")}
        min={0.1}
        max={2}
        step={0.1}
        classNames={{
          thumb: "bg-slate-900",
          bar: "bg-slate-800",
          track: "h-2.5 !bg-slate-100",
        }}
      />
    </div>
  );
}
//---------------------------------------------------SELECT-TONES
export const TonesSelect = ({
  selected,
  setSelected,
  tones = defaultTones,
}: {
  selected: string[];
  setSelected: (s: string[]) => void;
  tones: Tone[];
}) => {
  return (
    <CustomMenu width={"270"} position="bottom-start" closeOnItemClick={false}>
      <Menu.Target>
        <Button
          radius="lg"
          pl="0"
          leftSection={<CustomizeParaphraser />}
          rightSection={<TbChevronDown />}
          variant="light"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Customize
        </Button>
      </Menu.Target>
      <Menu.Dropdown p={8} mah="320px" className="!overflow-y-auto">
        <Checkbox.Group
          value={selected}
          onChange={(value) => {
            setSelected(value);
          }}
        >
          <Text mt="xs" mb={3} ml={6}>
            Select Output Tone
          </Text>
          {(tones.length < 1 ? defaultTones : tones).map((item) => (
            <Menu.Item key={item.label} py="xs" px="4px">
              <Checkbox
                key={item.label}
                value={item.value}
                label={item.label}
                classNames={{
                  labelWrapper: "w-full",
                }}
              />
            </Menu.Item>
          ))}
        </Checkbox.Group>
      </Menu.Dropdown>
    </CustomMenu>
  );
};
//---------------------------------------------------TONES-FORM
const ItemForm = ({
  label,
  value,
  setOpen: setOpen,
  i,
}: Tone & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  i: number;
}) => {
  const [toneForm, setToneForm] = React.useState({ value, label });
  const form = useParaphraserFormCtx();

  return (
    <Fieldset
      classNames={{
        root: "border-[1px] border-solid border-slate-600 mx-0",
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
          variant="subtle"
          onClick={() => {
            setOpen(false);
          }}
          w="100%"
        >
          <MdClear size="20" />
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
          <MdCheck size="20" />
        </Button>
      </div>
    </Fieldset>
  );
};
//---------------------------------------------------
const ToneItem = ({ label, value, i }: Tone & { i: number }) => {
  const [editable, setEditable] = React.useState(false);
  const form = useParaphraserFormCtx();
  return (
    <div
      className={cn(
        "gap-2 py-0.5",
        editable ? "pb-1 flex-col-start" : "flex-row-between"
      )}
    >
      {editable ? (
        <ItemForm i={i} label={label} value={value} setOpen={setEditable} />
      ) : (
        <div className="flex w-full items-start gap-2 rounded border px-2 py-3">
          <div
            className="w-full cursor-pointer flex-col-start"
            onClick={() => {
              setEditable(true);
            }}
          >
            <span className="w-full capitalize">
              {label || "Custom Tone " + i}
            </span>
            <p className="my-1 font-medium text-slate-400">{value}</p>
          </div>
          <div className="gap-3 flex-col-start">
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
const TonesItems = () => {
  const form = useParaphraserFormCtx();

  return (
    <div className="space-y-2 pt-4">
      <h3 className="my-1 ">Tailor the tones to suit individually</h3>
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

//---------------------------------------------------
export const ParaphraserBase = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { isAuth, form, onSubmit, isPending, isSuccess, isError } =
    useMutationParaphraser();
  return (
    <>
      <Drawer.Root position="right" size="sm" opened={opened} onClose={close}>
        <Drawer.Overlay
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        />
        <Drawer.Content
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Drawer.Header className="border-0 border-b">
            Customize Your Paraphraser
            <Drawer.CloseButton onClick={close} />
          </Drawer.Header>
          <Drawer.Body py="md">
            {isAuth ? (
              <ParaphraserFormProv form={form}>
                <form onSubmit={onSubmit} className="space-y-4">
                  <TonesItems />
                  <Divider color="dark" />
                  <Temperature />
                  {form.isDirty() && (
                    <Button
                      type="submit"
                      w="100%"
                      radius="xl"
                      loading={isPending}
                    >
                      Save Changes
                    </Button>
                  )}
                  {isSuccess && !form.isDirty() && (
                    <div className="text-center font-medium text-teal-400">
                      Saved successfully
                    </div>
                  )}
                  {isError && (
                    <div className="text-center font-medium text-red-800">
                      Something went wrong!
                    </div>
                  )}
                </form>
              </ParaphraserFormProv>
            ) : (
              <Text ta="center">
                You need to login first to customize your paraphrasing tool
              </Text>
            )}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <ActionIcon
        onClick={(e) => {
          open();
          e.stopPropagation();
        }}
        radius="lg"
        size="lg"
      >
        <MdEdit />
      </ActionIcon>
    </>
  );
};

export const CustomizeParaphraser = dynamic(
  () =>
    import("@/components/paraphraser/customize-paraphraser").then(
      (c) => c.ParaphraserBase
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-8 w-8 animate-pulse rounded-full bg-slate-600/50"></div>
    ),
  }
);
