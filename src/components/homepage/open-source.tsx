import { Button } from "@mantine/core";
import { BsGithub } from "react-icons/bs";

//======================================
export const OpenSource = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-theme-accent to-theme-primary py-2">
        <div className="center bg-slate-200 px-2 py-10 text-slate-800 shadow-lg md:py-24">
          <h3 className="mb-3 text-2xl font-extrabold sm:text-3xl md:text-5xl">
            Proudly open-source
          </h3>
          <p className="mt-0 max-w-xl text-center sm:text-xl">
            Our source code is available on GitHub; feel free to read, review,
            or contribute to it in any way you like!
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
    </div>
  );
};
