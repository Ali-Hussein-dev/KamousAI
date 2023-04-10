/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { ActionIcon, TextInput, Divider, Loader } from "@mantine/core";
import { BsFillSendFill } from "react-icons/bs";
import { useFetchStream, useResponse } from "@/hooks";
import { FaSearch } from "react-icons/fa";

import { MdClear } from "react-icons/md";
import * as React from "react";
interface FormValues {
  term: string;
}
//======================================
export const Searchbar = () => {
  const status = useResponse((s) => s.status);
  const setStatus = useResponse((s) => s.setStatus);
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const { fetcher } = useFetchStream();
  const onSubmit = (formValues: FormValues) => {
    setStatus("loading");
    fetcher(formValues);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder="Enter a word, phrase, acronym, or idiom."
        {...register("term")}
        size="lg"
        icon={<FaSearch size="14" />}
        rightSectionWidth="auto"
        autoComplete="off"
        rightSection={
          <div className="gap-x-2 pr-3 flex-row-start">
            <ActionIcon
              hidden={!watch("term")}
              size="lg"
              onClick={() => reset({ term: "" })}
            >
              <MdClear />
            </ActionIcon>
            <Divider hidden={!watch("term")} orientation="vertical" />
            {status == "loading" ? (
              <ActionIcon size="lg">
                {/* <BsStopFill className="z-10 text-red-700" size="20" /> */}
                <Loader variant="dots" size="md" color="gray" />
              </ActionIcon>
            ) : (
              <ActionIcon size="lg" type="submit">
                <BsFillSendFill size="14" />
              </ActionIcon>
            )}
          </div>
        }
      />
    </form>
  );
};
