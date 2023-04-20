/* eslint-disable @typescript-eslint/no-misused-promises */
import { ActionIcon, TextInput, Divider, Loader } from "@mantine/core";
import { BsFillSendFill, BsStopCircle } from "react-icons/bs";
import { useResponse, useStream } from "@/hooks";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";

//======================================
export const Searchbar = () => {
  const status = useResponse((s) => s.status);

  const {
    methods: { handleSubmit, register, watch, reset },
    onSubmit,
    stopStreaming,
  } = useStream();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder="Enter a word, phrase, acronym, or idiom."
        {...register("term")}
        size="xl"
        icon={
          status == "loading" ? (
            <Loader color="#d6d6d6" size="md" variant="dots" />
          ) : (
            <FaSearch size="20" />
          )
        }
        rightSectionWidth="auto"
        autoComplete="off"
        rightSection={
          <div className="gap-x-2 pr-3 flex-row-start">
            <ActionIcon
              hidden={!watch("term")}
              size="md"
              onClick={() => reset({ term: "" })}
            >
              <MdClear />
            </ActionIcon>
            <Divider
              hidden={!watch("term")}
              className="m-1"
              orientation="vertical"
            />
            {status == "loading" ? (
              <ActionIcon size="lg" type="button" onClick={stopStreaming}>
                <BsStopCircle size="20" />
              </ActionIcon>
            ) : (
              <ActionIcon size="lg" type="submit">
                <BsFillSendFill size="20" />
              </ActionIcon>
            )}
          </div>
        }
      />
    </form>
  );
};
