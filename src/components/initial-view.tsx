"use client";
import { Badge, Text, Title } from "@mantine/core";
import Typewriter from "typewriter-effect";

const H1 = () => (
  <Title order={1} className="w-full" mt="lg" mb="lg">
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
  </Title>
);
//======================================
export const InitialView = () => {
  return (
    <div className="mb-4 w-full gap-2 rounded-3xl border border-solid border-slate-600 p-2 flex-col-start md:p-4">
      <H1 />
      <div className="mb-4 ">
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
