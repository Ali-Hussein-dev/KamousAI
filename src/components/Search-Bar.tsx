"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  ActionIcon,
  TextInput,
  Divider,
  Loader,
  Popover,
  useMantineTheme,
  Button,
  Badge,
} from "@mantine/core";
import { BsClockHistory, BsFillSendFill, BsStopCircle } from "react-icons/bs";
import { useResponse, useStream } from "@/hooks";
import { MdClear } from "react-icons/md";
import SettingsDropdown from "./Dropdown";
import { FaSearch } from "react-icons/fa";
import { type UseFormSetValue, useWatch } from "react-hook-form";
import * as React from "react";
import { useHotkeys } from "@mantine/hooks";

function uppercaseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const PopoverWrapper = ({
  children,
  term,
  setValue,
}: {
  children: React.ReactNode;
  term: string;
  setValue: UseFormSetValue<{ term: string }>;
}) => {
  const { colors } = useMantineTheme();
  const onSelect = (value = "") => {
    setValue("term", value);
  };
  const history = useResponse((s) => s.history) || [];
  // const filteredHistory =
  //   React.useMemo(
  //     () =>
  //       history
  //         .filter((o) => o.value.startsWith(term))
  //         .map((o) => o.value),
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     [term]
  //   ) || [];
  const filteredHistory =
    history.filter((o) => o.value.startsWith(term)).map((o) => o.value) || [];

  return (
    <Popover position="bottom" width="target" withArrow={false} radius="lg">
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown
        bg={colors.dark[7]}
        p="sm"
        px="xs"
        hidden={filteredHistory.length == 0 || !term}
        className="max-h-72 overflow-y-auto border-[1px] border-zinc-800 shadow"
      >
        <div className="flex-wrap flex-col-start">
          {filteredHistory.map((value, i) => (
            <Button
              type="button"
              w="100%"
              key={value + i}
              className="mb-2 pl-2"
              onClick={() => onSelect(value)}
              leftSection={
                <BsClockHistory className="text-zinc-500" size="17" />
              }
              style={{
                display: "flex",
              }}
            >
              <span className="border pl-2">{uppercaseFirstLetter(value)}</span>
            </Button>
          ))}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};
//======================================
export const Searchbar = () => {
  const status = useResponse((s) => s.status);

  const {
    methods: { handleSubmit, register, reset, control, setValue, setFocus },
    onSubmit,
    stopStreaming,
  } = useStream();
  const term = useWatch({ name: "term", control });

  useHotkeys([["ctrl+K", () => setFocus("term")]]);
  // submit, badge, clear, search icon
  const RightSection = () => (
    <div className="gap-x-2 pr-2 flex-row-start">
      {!!term && (
        <ActionIcon radius="lg" size="xl" onClick={() => reset({ term: "" })}>
          <MdClear />
        </ActionIcon>
      )}
      {!term && (
        <Badge
          color="dimmed"
          h="100%"
          py="xs"
          px="sm"
          radius="md"
          fw={300}
          visibleFrom="md"
          className="md:inline-block"
        >
          ctrl+K
        </Badge>
      )}
      <Divider orientation="vertical" hidden={status == "loading"} />
      <div className="p-2" hidden={!!term || status === "loading"}>
        <FaSearch size="20" />
      </div>
      {status === "loading" && (
        <ActionIcon radius="lg" size="xl" type="button" onClick={stopStreaming}>
          <BsStopCircle size="24" />
        </ActionIcon>
      )}
      {term && (
        <ActionIcon radius="lg" size="xl" type="submit" hidden={!term}>
          <BsFillSendFill size="17" />
        </ActionIcon>
      )}
    </div>
  );
  // dropdown, spinner
  const LeftSection = () => (
    <div className="center">
      {status == "loading" ? (
        <Loader color="#d6d6d6" size="sm" variant="dots" />
      ) : (
        <SettingsDropdown />
      )}
    </div>
  );
  return (
    <div>
      <PopoverWrapper term={term} setValue={setValue}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <TextInput
            {...register("term")}
            styles={{
              // icon: { pointerEvents: "all" },
              input: {
                background: "transparent",
                // border:"1px solid #d6d6d6"
              },
              wrapper: {
                // border: "1px solid #d6d6d6"
              },
              root: {
                overflow: "hidden",
                // border:"2px solid #d6d6d6"
              },
            }}
            leftSection={<LeftSection />}
            rightSection={<RightSection />}
            placeholder="Lookup a word or phrase..."
            rightSectionWidth="auto"
            autoComplete="off"
            radius="lg"
            size="xl"
          />
        </form>
      </PopoverWrapper>
    </div>
  );
};
