import * as React from "react";
import { useHotkeys } from "@mantine/hooks";

export const useInputFocus = <
  T extends HTMLInputElement | HTMLTextAreaElement
>() => {
  const inputRef = React.useRef<T>(null);
  const setFocus = () => {
    inputRef.current?.focus();
  };
  useHotkeys([["mod+K", () => setFocus()]]);
  return { inputRef };
};
