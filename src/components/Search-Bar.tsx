/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { Loader, ActionIcon, TextInput, Divider } from "@mantine/core";
import { BsFillSendFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useFetchStream } from "@/utils/use-fetch-stream";
import * as React from "react";

interface FormValues {
  term: string;
}
//======================================
export const Searchbar = () => {
  const [status, setStatus] = React.useState<"idle" | "loading">("idle");
  const fetcher = useFetchStream(setStatus);
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const onSubmit = (formValues: FormValues) => {
    if (formValues.term) {
      setStatus("loading");
      fetcher(formValues.term);
    } else {
      console.log("term", formValues.term);
    }
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
              size="md"
              onClick={() => reset({ term: "" })}
            >
              <MdClear />
            </ActionIcon>
            <Divider
              hidden={!watch("term")}
              className="m-1 "
              orientation="vertical"
            />
            <ActionIcon
              size="md"
              type={status == "loading" ? "button" : "submit"}
            >
              {status == "loading" ? (
                <Loader variant="dots" />
              ) : (
                <BsFillSendFill size="14" />
              )}
            </ActionIcon>
          </div>
        }
      />
    </form>
  );
};
