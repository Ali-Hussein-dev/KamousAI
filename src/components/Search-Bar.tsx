/* eslint-disable @typescript-eslint/no-misused-promises */
import { ActionIcon, TextInput, Divider, Loader } from "@mantine/core";
import { BsFillSendFill, BsStopCircle } from "react-icons/bs";
import { useResponse, useStream } from "@/hooks";
import { MdClear } from "react-icons/md";
import SettingsDropdown from "./Dropdown";
import { FaSearch } from "react-icons/fa";
import { useWatch } from "react-hook-form";

//======================================
export const Searchbar = () => {
  const status = useResponse((s) => s.status);

  const {
    methods: { handleSubmit, register, reset, control },
    onSubmit,
    stopStreaming,
  } = useStream();
  const term = useWatch({ name: "term", control });

  return (
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
  );
};
