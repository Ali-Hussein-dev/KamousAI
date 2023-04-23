import { Anchor, Header as MantineHeader } from "@mantine/core";

//======================================
export const Header = () => {
  return (
    <MantineHeader height={60} p="xs" className="flex-row-center">
      <div className="mx-auto w-full max-w-4xl flex-row-start">
        <Anchor color="gray" href="/" target="_blank">
          <div className="text-xl font-bold">KamousAI</div>
        </Anchor>
      </div>
    </MantineHeader>
  );
};
