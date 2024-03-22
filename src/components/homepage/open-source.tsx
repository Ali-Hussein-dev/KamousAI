import { Button } from "@mantine/core";
import { BsGithub } from "react-icons/bs";

//======================================
export const OpenSource = () => {
  return (
    <div className="pt-20">
      <div className="center bg-slate-100 py-10 text-slate-800 md:py-24">
        <h3 className="mb-2 text-2xl font-extrabold sm:text-3xl md:text-5xl">
          Proudly open-source
        </h3>
        <p className="mt-0 max-w-xl text-center text-xl">
          Our source code is available on GitHub; feel free to read, review, or
          contribute to it in any way you like!
        </p>
        <Button
          component="a"
          className=""
          bg="black"
          size="lg"
          radius="md"
          href="https://github.com/Ali-Hussein-dev/KamousAI"
          leftSection={<BsGithub />}
        >
          View in GitHub
        </Button>
      </div>
    </div>
  );
};
