import { Button } from "@mantine/core";
import * as React from "react";
import { MdOutlineContentPaste } from "react-icons/md";
import { BiSolidErrorAlt } from "react-icons/bi";
import dynamic from "next/dynamic";
import { notifications } from "@mantine/notifications";
import { useClipboardPaste } from "@/hooks/use-clipboard-paste";

//======================================
export const PasteButton = ({
  show,
  setInput,
}: {
  show: boolean;
  setInput: (s: string) => void;
}) => {
  const { isPermissionGranted, handlePaste } = useClipboardPaste({
    onPaste: setInput,
    onDenied: () => {
      notifications.show({
        title: "Permission Denied",
        message: "Please allow clipboard access to use this feature",
        color: "red",
      });
    },
  });
  return show ? (
    <div className="center absolute inset-0 w-full">
      <Button
        leftSection={<MdOutlineContentPaste size="17" />}
        rightSection={
          !isPermissionGranted ? (
            <BiSolidErrorAlt size="17" className="text-orange-600" />
          ) : undefined
        }
        type="button"
        variant="light"
        radius="md"
        onClick={handlePaste}
      >
        Paste
      </Button>
    </div>
  ) : null;
};

export const DynamicPasteButton = dynamic(
  () => import("./paste-button").then((c) => c.PasteButton),
  { ssr: false }
);
