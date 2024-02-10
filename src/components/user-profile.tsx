"use client";
import { ActionIcon, Button, Select, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import * as React from "react";

const Pairs = ({
  remove,
  i,
  set,
}: {
  remove: (s: number) => void;
  i: number;
  set: (index: number, pair: { lang?: string; level?: string }) => void;
}) => {
  const [lang, setLang] = React.useState<string>();
  const [level, setLevel] = React.useState<string>();

  return (
    <div
      className="w-full flex-wrap gap-3 flex-row-between sm:flex-nowrap"
      key={i}
    >
      <Select
        className="w-full"
        placeholder="Pick a language"
        value={lang}
        onChange={(lang: string) => {
          setLang(lang);
          set(i, { lang, level });
        }}
        data={["Arabic", "English", "German", "French", "Spanish", "Italian"]}
        searchable
      />
      <Select
        className="w-full"
        placeholder="Select your proficiency level"
        data={["Beginner", "Intermediate", "Advanced", "Native"]}
        value={level}
        onChange={(level: string) => {
          setLevel(level);
          set(i, { lang, level });
        }}
      />
      <ActionIcon
        size="lg"
        radius="md"
        variant="light"
        className="self-end "
        onClick={() => remove(i)}
      >
        X
      </ActionIcon>
    </div>
  );
};
const initialPair = {};
const initialValues = [initialPair];
//======================================
export const UserLanguages = () => {
  const [values, handlers] = useListState(initialValues);
  return (
    <div className="space-y-3">
      <Title order={2} className="text-base">
        What languages do you speak ?
      </Title>
      {values.map((v, i) => (
        <Pairs
          key={i}
          i={i}
          remove={() => handlers.remove(i)}
          set={handlers.setItem}
        />
      ))}
      <Button
        variant="light"
        onClick={() => {
          handlers.append(initialPair);
        }}
      >
        Add Language
      </Button>
      <div className="">{JSON.stringify(values, null, 2)}</div>
    </div>
  );
};
