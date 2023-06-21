import {
  Anchor,
  Footer as MantineFooter,
  useMantineTheme,
} from "@mantine/core";
import { FaTwitter } from "react-icons/fa";

//======================================
export const Footer = () => {
  const { colors } = useMantineTheme();

  return (
    <MantineFooter
      height={50}
      p="xs"
      className="flex-row-center relative"
      bg={colors.dark[9]}
    >
      <div className="mx-auto w-full max-w-4xl flex-row-between">
        <span>
          Powered by <b>AI</b>
        </span>
        <div className="gap-3 flex-row-start">
          <Anchor
            color="gray"
            href="https://twitter.com/AliHussein_20"
            target="_blank"
          >
            <FaTwitter size="24" />
          </Anchor>
        </div>
      </div>
    </MantineFooter>
  );
};
