"use client";
import { ActionIcon, Button } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import * as React from "react";
import { CustomSelect } from "./Mantine/custom-select";
import { MdDelete } from "react-icons/md";
import { CustomInput } from "./shared/custom-input";
import { Fieldset } from "./Mantine/CustomFieldset";
import { useForm } from "@mantine/form";
import { updateUserProfile } from "@/actions/update-user-profile";

const Pairs = ({
  remove,
  i,
  set,
  initialLang,
  initialLevel,
}: {
  initialLang: string;
  initialLevel: string;
  remove: (s: number) => void;
  i: number;
  set: (index: number, pair: { lang?: string; level?: string }) => void;
}) => {
  const [lang, setLang] = React.useState<string>(initialLang);
  const [level, setLevel] = React.useState<string>(initialLevel);
  return (
    <div
      className="w-full flex-wrap gap-3 flex-row-between sm:flex-nowrap"
      key={i}
    >
      <CustomSelect
        className="w-full"
        placeholder="Pick a language"
        name="lang"
        value={lang}
        onChange={(lang: null | string) => {
          if (lang === null) return;
          setLang(lang);
          set(i, { lang, level });
        }}
        data={["Arabic", "English", "German", "French", "Spanish", "Italian"]}
      />
      <CustomSelect
        className="w-full"
        placeholder="Select your proficiency level"
        name="level"
        value={level}
        onChange={(level: string | null) => {
          if (level === null) return;
          setLevel(level);
          set(i, { lang, level });
        }}
        data={["Beginner", "Intermediate", "Advanced", "Native", "Fluent"]}
      />
      <ActionIcon
        size="lg"
        radius="md"
        variant="light"
        c="yellow"
        onClick={() => remove(i)}
      >
        <MdDelete />
      </ActionIcon>
    </div>
  );
};
const initialPair = {};
type Props = {
  profile: {
    name: string;
    email: string;
    languages: { lang?: string; level?: string }[];
  };
};
//======================================
export const UserProfile = ({ profile }: Props) => {
  const [values, handlers] = useListState(profile?.languages ?? []);
  const form = useForm({
    initialValues: {
      name: profile.name,
      userLanguages: profile.languages,
    },
  });

  return (
    <form
      action={updateUserProfile}
      className="mx-auto h-full max-w-3xl space-y-6 rounded-lg bg-slate-800 p-4 pt-10 shadow-lg md:pt-8"
    >
      <Fieldset legend="Personal Info">
        <div className="flex-wrap gap-2 flex-row-between sm:flex-nowrap">
          <CustomInput
            placeholder="name"
            defaultValue={profile.name}
            className="w-full"
            classNames={{ input: "bg-slate-700" }}
            name="name"
            {...form.getInputProps("name")}
          />
        </div>
      </Fieldset>
      <Fieldset
        legend="What languages do speak?"
        className="space-y-3"
        name="user languages"
      >
        <div className="space-y-2">
          {values.map((v, i) => (
            <Pairs
              key={i}
              i={i}
              remove={() => handlers.remove(i)}
              set={handlers.setItem}
              initialLang={v.lang ?? ""}
              initialLevel={v.level ?? ""}
            />
          ))}
        </div>
        <Button
          variant="light"
          onClick={() => {
            handlers.append(initialPair);
          }}
        >
          Add Language
        </Button>
      </Fieldset>
      <div className="pt-3 flex-row-end">
        <Button type="submit" disabled={!form.isDirty()}>
          Save
        </Button>
      </div>
    </form>
  );
};
export default UserProfile;