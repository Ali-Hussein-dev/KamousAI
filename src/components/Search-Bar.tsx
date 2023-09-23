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
import { BsFillSendFill, BsStopCircle } from "react-icons/bs";
import { useResponse, useStream } from "@/hooks";
import { MdClear } from "react-icons/md";
import SettingsDropdown from "./Dropdown";
import { FaSearch } from "react-icons/fa";
import { type UseFormSetValue, useWatch } from "react-hook-form";
import * as React from "react";
import { useFocusWithin, useHotkeys } from "@mantine/hooks";
import clsx from "clsx";

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
        p="sm"
        px="xs"
        hidden={filteredHistory.length == 0 || !term}
        className="max-h-72 overflow-y-auto shadow"
      >
        <div className="flex flex-wrap gap-2 ">
          {filteredHistory.map((value, i) => (
            <Button
              type="button"
              variant="outline"
              c="dimmed"
              radius="lg"
              key={value + i}
              className="w-full gap-0 flex-row-start"
              onClick={() => onSelect(value)}
            >
              <span className="w-full">{uppercaseFirstLetter(value)}</span>
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
  const { focused, ref } = useFocusWithin();
  const { colors } = useMantineTheme();
  return (
    <PopoverWrapper term={term} setValue={setValue}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 rounded-2xl"
        ref={ref}
      >
        <TextInput
          placeholder="Enter your words..."
          {...register("term")}
          size="xl"
          radius="lg"
          leftSectionPointerEvents="all"
          className="duration-500"
          styles={{
            input: {
              background: "transparent",
              paddingLeft: "4rem",
              border: focused
                ? `1px solid ${colors.dark?.[4]}`
                : `1px solid ${colors.dark?.[6]}`,
            },
          }}
          leftSection={
            <div className="h-full w-full rounded-l-xl">
              {status == "loading" ? (
                <div className="center h-full w-full">
                  <Loader color="white" size="sm" variant="dots" />
                </div>
              ) : (
                <SettingsDropdown />
              )}
            </div>
          }
          rightSectionWidth="auto"
          autoComplete="off"
          rightSection={
            <div className="gap-x-2 pr-1 flex-row-start">
              {term && (
                <ActionIcon
                  size="xl"
                  onClick={() => reset({ term: "" })}
                  radius="lg"
                  variant="outline"
                >
                  <MdClear size="20" />
                </ActionIcon>
              )}
              {!term && (
                <Badge
                  c={colors.primary?.[2]}
                  bg="transparent"
                  variant="white"
                  h="100%"
                  fw={400}
                  className={clsx(
                    "opacity-0",
                    !!term || status == "loading"
                      ? "opacity-0"
                      : "sm:opacity-100"
                  )}
                >
                  ctrl+K
                </Badge>
              )}
              <Divider orientation="vertical" hidden={status == "loading"} />
              {status == "loading" ? (
                <ActionIcon
                  size="xl"
                  type="button"
                  onClick={stopStreaming}
                  radius="lg"
                >
                  <BsStopCircle size="24" />
                </ActionIcon>
              ) : (
                <div className="">
                  {term ? (
                    <ActionIcon size="xl" type="submit" radius="lg">
                      <BsFillSendFill size="17" />
                    </ActionIcon>
                  ) : (
                    <div className="p-2">
                      <FaSearch size="20" />
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        />
      </form>
    </PopoverWrapper>
  );
};
