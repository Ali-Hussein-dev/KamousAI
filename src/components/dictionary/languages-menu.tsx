import { ActionIcon, Button, Menu, SegmentedControl } from "@mantine/core";
import { TbSwitchHorizontal } from "react-icons/tb";
import * as React from "react";
import languagesLabels from "../../content/languages-names.json";
import languages from "../../content/languages.json";
import { type DictionaryMode, useResponse } from "@/hooks";
import { CustomSelect } from "../Mantine/custom-select";
import { CustomMenu } from "../Mantine/custom-menu";
import { useMediaQuery } from "@mantine/hooks";
import { useLastLangs } from "@/hooks/use-last-langs";

//---------------------------------------------------MONOLINGUAL
const Monolingual = () => {
  const setSettings = useResponse((s) => s.setPreferences);
  const { inputLanguage } = useResponse((s) => s.preferences);
  const { last, setLast } = useLastLangs();
  return (
    <div className="space-y-3">
      <CustomSelect
        label="Your language"
        placeholder="Pick one"
        defaultValue={inputLanguage}
        data={languagesLabels}
        value={inputLanguage}
        onChange={(lang) => {
          setSettings({ inputLanguage: lang || "en" });
          setLast(lang || "English", "last", 5);
        }}
        comboboxProps={{ withinPortal: false }}
      />
      {last.length > 0 && (
        <div className="rounded border p-2">
          <div className="mb-2 text-sm text-gray-300">Recently Used</div>
          <div className="flex-wrap gap-3 flex-row-start">
            {last.map((lang) => (
              <Button
                variant="light"
                size="compact-md"
                key={lang}
                onClick={() => setSettings({ inputLanguage: lang })}
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

//---------------------------------------------------BILINGUAL
const Bilingual = () => {
  const setSettings = useResponse((s) => s.setPreferences);
  const inputLanguage = useResponse((s) => s.preferences.inputLanguage);
  const outputLanguage = useResponse((s) => s.preferences.outputLanguage);
  const { lastInput, lastOutput, setLast } = useLastLangs();
  const onChange = (
    lang: string | null,
    type: "inputLanguage" | "outputLanguage"
  ) => {
    setSettings({ [type]: lang });
    setLast(
      lang || "English",
      type === "inputLanguage" ? "lastInput" : "lastOutput",
      3
    );
  };
  return (
    <div>
      <div className="mb-2 flex items-end gap-2">
        <CustomSelect
          label="Translate from"
          placeholder="Pick a language"
          defaultValue={"en"}
          data={languagesLabels}
          value={inputLanguage}
          onChange={(lang) => onChange(lang, "inputLanguage")}
          comboboxProps={{ withinPortal: false }}
        />
        <ActionIcon
          onClick={() => {
            onChange(outputLanguage, "inputLanguage");
            onChange(inputLanguage, "outputLanguage");
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
          data={languagesLabels}
          value={outputLanguage || "de"}
          onChange={(lang) => onChange(lang, "outputLanguage")}
          comboboxProps={{ withinPortal: false }}
        />
      </div>
      {lastInput.length > 0 && (
        <div className="rounded border p-2">
          <div className="mb-2 text-sm text-gray-300">Recently Used</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col flex-wrap items-start gap-3">
              {lastInput.map((lang) => (
                <Button
                  w="120"
                  variant="light"
                  size="compact-md"
                  key={lang}
                  onClick={() => onChange(lang, "inputLanguage")}
                >
                  {lang}
                </Button>
              ))}
            </div>
            <div className="flex flex-col flex-wrap items-end gap-3">
              {lastOutput.map((lang) => (
                <Button
                  w="120"
                  variant="light"
                  size="compact-md"
                  key={lang}
                  onClick={() => onChange(lang, "outputLanguage")}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//======================================LANGUAGES MENU
const LanguagesMenu = () => {
  const { inputLanguage, outputLanguage, mode } = useResponse(
    (s) => s.preferences
  );
  const setSettings = useResponse((s) => s.setPreferences);
  const onChange = (mode: string) => {
    setSettings({ mode: mode as DictionaryMode });
  };
  const isMobile = useMediaQuery("(max-width: 520px)");

  return (
    <CustomMenu
      shadow="lg"
      width={isMobile ? "98%" : 350}
      position="bottom-start"
      closeOnItemClick={false}
    >
      <Menu.Target>
        <div className="flex h-full w-full pl-1">
          <div className="center h-full w-full">
            <ActionIcon
              size={isMobile ? "lg" : "xl"}
              radius={"xl"}
              fz={mode === "bili" ? "xs" : "sm"}
              fw="bold"
              ta="center"
            >
              {
                languages.find((l) => l.label === inputLanguage)
                  ?.value as string
              }

              {mode === "bili" &&
                (("-" +
                  languages.find((l) => l.label === outputLanguage)
                    ?.value) as string)}
            </ActionIcon>
          </div>
          {/* <Divider orientation="vertical" mx={4} my={12} /> */}
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
export default LanguagesMenu;
