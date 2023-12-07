import { ActionIcon, type ActionIconProps } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { GiCheckMark } from "react-icons/gi";
import { MdContentCopy } from "react-icons/md";

//======================================
export const CopyButton = ({
  text,
  ...rest
}: { text: string } & ActionIconProps) => {
  const { copied, copy } = useClipboard({ timeout: 2000 });
  return (
    <ActionIcon
      variant="light"
      radius="md"
      size="lg"
      onClick={() => {
        copy(text);
      }}
      {...rest}
    >
      {copied ? <GiCheckMark /> : <MdContentCopy />}
    </ActionIcon>
  );
};
