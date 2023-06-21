/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  ActionIcon,
  TextInput,
  Divider,
  Loader,
  Popover,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { BsClockHistory, BsFillSendFill, BsStopCircle } from "react-icons/bs";
import { useResponse, useStream } from "@/hooks";
import { MdClear } from "react-icons/md";
import SettingsDropdown from "./Dropdown";
import { FaSearch } from "react-icons/fa";
import { type UseFormSetValue, useWatch } from "react-hook-form";
import * as React from "react";

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
      >
        <div className="flex-wrap flex-col-start">
          {filteredHistory.map((value, i) => (
            <Button
              type="button"
              key={value + i}
              className="w-full pl-2 flex-row-start"
              onClick={() => onSelect(value)}
              leftIcon={<BsClockHistory className="text-zinc-500" size="17" />}
            >
              <span className="w-full pl-2">{uppercaseFirstLetter(value)}</span>
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
    methods: { handleSubmit, register, reset, control, setValue },
    onSubmit,
    stopStreaming,
  } = useStream();
  const term = useWatch({ name: "term", control });

  return (
    <div>
      <PopoverWrapper term={term} setValue={setValue}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8 shadow-lg">
          <TextInput
            placeholder="Enter your words..."
            {...register("term")}
            size="xl"
            radius="lg"
            styles={{
              icon: { pointerEvents: "all" },
              input: { background: "transparent" },
            }}
            icon={
              status == "loading" ? (
                <Loader color="#d6d6d6" size="md" variant="dots" />
              ) : (
                <SettingsDropdown />
              )
            }
            rightSectionWidth="auto"
            autoComplete="off"
            rightSection={
              <div className="gap-x-2 pr-2 flex-row-start">
                <ActionIcon
                  hidden={!term}
                  size="xl"
                  onClick={() => reset({ term: "" })}
                >
                  <MdClear />
                </ActionIcon>
                <Divider hidden={!term} orientation="vertical" />
                <div hidden={!!term} className="p-2">
                  <FaSearch size="20" />
                </div>
                {status == "loading" ? (
                  <ActionIcon size="xl" type="button" onClick={stopStreaming}>
                    <BsStopCircle size="24" />
                  </ActionIcon>
                ) : (
                  <ActionIcon size="xl" type="submit" hidden={!term}>
                    <BsFillSendFill size="17" />
                  </ActionIcon>
                )}
              </div>
            }
          />
        </form>
      </PopoverWrapper>
    </div>
  );
};
