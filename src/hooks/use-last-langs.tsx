import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  last: string[];
  /***
   * last input language list
   */
  lastInput: string[];
  /***
   * last output language list
   */
  lastOutput: string[];
  setLast: (
    newLast: string,
    property: "last" | "lastInput" | "lastOutput",
    limit?: number
  ) => void;
}

export const useLastLangs = create<State>()(
  persist(
    (set) => ({
      last: [],
      lastInput: [],
      lastOutput: [],
      setLast: (newLast, property, limit = 3) =>
        set(
          (s) =>
            ({
              ...s,
              [property as keyof State]: [
                ...new Set([
                  newLast,
                  ...s[property as keyof Omit<State, "setLast">],
                ]),
              ].slice(-limit),
            } as State)
        ),
    }),
    {
      name: "kamousai-last-langs", // unique name
    }
  )
);
