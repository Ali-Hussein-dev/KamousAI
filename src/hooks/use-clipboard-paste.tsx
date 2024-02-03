"use client";
import * as React from "react";

export const useClipboardPaste = ({
  onPaste,
  onDenied,
}: {
  onPaste: (str: string) => void;
  onDenied?: () => void;
}) => {
  const [isPermissionGranted, setIsPermissionGranted] = React.useState(false);
  React.useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "clipboard-read" as PermissionName })
        .then((result) => {
          if (result.state === "granted" || result.state === "prompt") {
            setIsPermissionGranted(true);
          }
        });
    }
  }, []);
  const handlePaste = async () => {
    if (isPermissionGranted) {
      const text = await navigator.clipboard.readText();
      onPaste(text);
    } else {
      onDenied && onDenied();
      console.log("Permission to read clipboard was denied");
    }
  };
  return { isPermissionGranted, handlePaste };
};
