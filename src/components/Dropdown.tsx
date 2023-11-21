import { ActionIcon, Divider, Menu, SegmentedControl } from "@mantine/core";
import { TbSwitchHorizontal } from "react-icons/tb";
import * as React from "react";
import languages from "../content/languages.json";
import { type DictionaryMode, useResponse } from "@/hooks";
import { CustomSelect } from "./Mantine/custom-select";
import { CustomMenu } from "./Mantine/custom-menu";

const Monolingual = () => {
  const setSettings = useResponse((s) => s.setPreferences);
  const { inputLanguage } = useResponse((s) => s.preferences);
  return (
    <div className="">
      <CustomSelect
        label="Your language"
        placeholder="Pick one"
        defaultValue={inputLanguage}
        data={languages}
        value={inputLanguage}
        onChange={(lang) => setSettings({ inputLanguage: lang || "en" })}
      />
    </div>
  );
};
const Bilingual = () => {
  const setSettings = useResponse((s) => s.setPreferences);
  const inputLanguage = useResponse((s) => s.preferences.inputLanguage);
  const outputLanguage = useResponse((s) => s.preferences.outputLanguage);
  return (
    <div>
      <div className="flex items-end gap-2 ">
        <CustomSelect
          label="Translate from "
          placeholder="Pick a language"
          defaultValue={"en"}
          data={languages}
          value={inputLanguage}
          onChange={(lang) => setSettings({ inputLanguage: lang || "en" })}
        />
        <ActionIcon
          onClick={() => {
            setSettings({
              inputLanguage: outputLanguage,
              outputLanguage: inputLanguage,
            });
          }}
          mb={5}
          radius="md"
        >
          <TbSwitchHorizontal />
        </ActionIcon>
        <CustomSelect
          label="To"
          placeholder="Pick a language"
          defaultValue={"de"}
          data={languages}
          value={outputLanguage || "de"}
          onChange={(lang) => setSettings({ outputLanguage: lang || "de" })}
        />
      </div>
    </div>
  );
};

function uppercaseFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//======================================
const SettingsDropdown = () => {
  const { inputLanguage, outputLanguage, mode } = useResponse(
    (s) => s.preferences
  );
  const setSettings = useResponse((s) => s.setPreferences);
  const onChange = (mode: DictionaryMode) => {
    setSettings({ mode });
  };
  return (
    <CustomMenu
      shadow="lg"
      width={350}
      position="bottom-start"
      closeOnItemClick={false}
      closeOnClickOutside={false}
    >
      <Menu.Target>
        <div className="flex h-full w-full pl-1">
          <div className="center h-full w-full">
            <ActionIcon size="xl" radius="lg" fz="xs">
              {uppercaseFirstLetter(inputLanguage)}
              {mode === "bili" &&
                "-" + uppercaseFirstLetter(outputLanguage as string)}
            </ActionIcon>
          </div>
          <Divider orientation="vertical" mx={4} my={12} />
        </div>
      </Menu.Target>
      <Menu.Dropdown p="sm">
        <SegmentedControl
          color="dark"
          value={mode}
          onChange={onChange}
          fullWidth
          data={[
            { label: "Monolingual", value: "mono" },
            { label: "Bilingual", value: "bili" },
          ]}
          className="mb-3"
        />
        {mode === "mono" ? <Monolingual /> : <Bilingual />}
      </Menu.Dropdown>
    </CustomMenu>
  );
};
export default SettingsDropdown;
