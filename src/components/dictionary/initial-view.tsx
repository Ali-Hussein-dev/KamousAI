"use client";
import { Badge, Text } from "@mantine/core";
import Typewriter from "typewriter-effect";

const H1 = () => (
  <h1 className="my-4 w-full text-2xl font-extrabold md:text-4xl">
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString("New Way To Learn New Words")
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
export const InitialView = () => {
  return (
    <div className="mb-4 w-full gap-2 rounded-3xl bg-gradient-to-t from-slate-800/70 to-slate-800/30 px-5 py-2 flex-col-start sm:px-7 sm:pb-2 sm:pt-5">
      <H1 />
      <div className="mb-4">
        <Text className="ml-1 text-xl font-bold" c="dimmed" mb="xs">
          Regular dictionary
        </Text>
        <div>
          <Badge tt="inherit" p="lg" size="lg" variant="light">
            Limited number of words
          </Badge>
        </div>
      </div>
      <div className="mb-4 ">
        <Text className="ml-1 text-xl font-bold" c="dimmed" mb="xs">
          AI dictionary
        </Text>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 ">
          {[
            "Any word",
            "Idioms",
            "Expressions",
            "Word vs word",
            "Word or word",
            "Misspelled words",
          ].map((s) => (
            <Badge
              key={s}
              p="lg"
              tt="inherit"
              size="lg"
              w="100%"
              variant="light"
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
