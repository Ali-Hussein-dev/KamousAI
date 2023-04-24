import { create } from "zustand";

type Status = "loading" | "success" | "error" | "idle";

export type ResType =
  | "definition"
  | "examples"
  | "synonyms"
  | "related"
  | "anatonyms";

interface State {
  status?: Status;
  actionStatus?: Status;
  term?: string;
  /**
   * definition
   */
  definition?: string;
  examples?: string;
  synonyms?: string;
  anatonyms?: string;
  related?: string;
  actionResponse?: string;

  resType?: ResType;

  /**
   * used to set cached action response
   */
  setActionResponse: (keyword: ResType) => void;
  setResponse: (response: string, keyword: ResType) => void;
  setStatus: (status: Status) => void;
  setActionStatus: (status: Status) => void;
  resetResponse: () => void;
  setTerm: (term: string) => void;
  setKeyword: (resType: ResType) => void;
}

export const useResponse = create<State>((set) => ({
  setResponse: (response, keyword) =>
    set((s) => {
      switch (keyword) {
        case "definition":
          return {
            definition: s.definition + response,
            examples: "",
            synonyms: "",
            related: "",
            anatonyms: "",
            actionResponse: "",
          };
        case "examples":
        case "anatonyms":
        case "synonyms":
        case "related":
          return {
            [keyword]: s[keyword] + response,
            actionResponse: s[keyword] + response,
          };
      }
    }),
  status: "idle",
  actionStatus: "idle",
  definition: "",
  setStatus: (status) => set({ status }),
  setActionStatus: (actionStatus) => set({ actionStatus }),
  resetResponse: () => set({ definition: "" }),
  setTerm: (term) => set({ term }),
  setActionResponse: (keyword) =>
    set((s) => ({ actionResponse: s[keyword as keyof State] as string })),
  setKeyword: (resType) => set({ resType }),
}));
