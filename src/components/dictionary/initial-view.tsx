"use client";
import { Button, Text } from "@mantine/core";
import Typewriter from "typewriter-effect";

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
    <div className="mb-4 w-full gap-2 rounded-3xl border-[0.5px] border-solid border-primary-300/50 bg-gradient-to-t from-slate-800 to-slate-800/60 px-2 py-2 flex-col-start sm:px-7 sm:pb-2 sm:pt-5">
      <H1 />
      <div className="mx-auto mb-4">
        <Text className="mb-4 text-center text-xl font-bold" c="dimmed">
          Try the folowing examples
        </Text>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Slang words: Telly", value: "Telly" },
            { label: "Idioms: I'm on fire", value: "I'm on fire" },
            {
              label: "Expressions: I'm on fire",
              value: "It's raining cats and dogs",
            },
            { label: "Word vs word: loose vs lose", value: "loose vs lose" },
            {
              label: "Word or word: capital or capitol",
              value: "capital or capitol",
            },
            { label: "Misspelled words: attension", value: "attension" },
          ].map((o) => (
            <Button
              key={o.label}
              size="lg"
              w="100%"
              variant="light"
              radius="lg"
              onClick={() => setInput(o.value)}
            >
              {o.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
