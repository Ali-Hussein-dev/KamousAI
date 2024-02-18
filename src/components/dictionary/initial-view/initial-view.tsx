"use client";
import { Button, Text } from "@mantine/core";
import Typewriter from "typewriter-effect";
import css from "./initial-view.module.css";

const H1 = () => (
  <h1 className="my-4 w-full text-center text-2xl font-extrabold md:text-4xl">
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString("AI Dictionary With More Capabilities")
          .pauseFor(2500)
          .start();
      }}
      options={
        {
          // cursor: "",
        }
      }
    />
  </h1>
);
//======================================
export const InitialView = ({
  setInput,
}: {
  setInput: (s: string) => void;
}) => {
  return (
    <div className={css.bg + " rounded-3xl"}>
      <div className="mb-4 w-full gap-2 rounded-3xl border-[0.5px] border-solid border-primary-300/50 bg-gradient-to-t from-slate-800/90 via-slate-800/80 to-slate-800/90 px-2 py-3 shadow-lg flex-col-start sm:px-7 sm:pb-7 sm:pt-12">
        <H1 />
        <div className="mx-auto mb-4">
          <Text className="mb-4 text-center text-xl font-medium" c="dimmed">
            Try the following examples
          </Text>
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {[
              { label: "Slang", value: "Telly" },
              { label: "Idioms", value: "I'm on fire" },
              {
                label: "Acronyms",
                value: "MSM",
              },
              { label: "Word vs word", value: "loose vs lose" },
              { label: "Word or word", value: "top or tap" },
              { label: "Misspelled words", value: "attension" },
            ].map((o) => (
              <Button
                key={o.label}
                size="lg"
                w="100%"
                variant="light"
                radius="lg"
                onClick={() => setInput(o.value)}
                className="flex"
              >
                <span className="uppercase">{o.label}: </span>
                <span className="ml-1 text-slate-500">{o.value}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
