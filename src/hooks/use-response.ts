import { persist } from "zustand/middleware";
import { create } from "zustand";

type Status = "loading" | "success" | "error" | "idle";

export type ResType =
  | "definition"
  | "examples"
  | "synonyms"
  | "related"
  | "antonyms";

export type DictionaryMode = "mono" | "bili";
export type PreferencesT = {
  mode: DictionaryMode;
  inputLanguage: string;
  outputLanguage: string;
};

interface Store {
  status?: Status;
  actionStatus?: Status;
  term?: string;
  /**
   * definition
   */
  definition?: string;
  examples?: string;
  synonyms?: string;
  antonyms?: string;
  related?: string;
  actionResponse?: string;

  resType?: ResType;
  history: { value: string }[];

  preferences: PreferencesT;
  setPreferences: (settings: Partial<PreferencesT>) => void;
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
  setHistory: (term: string) => void;
}
export const useResponse = create<Store>()(
  persist(
    (set) => ({
      setResponse: (response, keyword) =>
        set((s) => {
          switch (keyword) {
            case "definition":
              return {
                definition: s.definition + response,
                examples: "",
                synonyms: "",
                related: "",
                antonyms: "",
                actionResponse: "",
              };
            case "examples":
            case "antonyms":
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
      preferences: {
        mode: "mono",
        inputLanguage: "en",
        outputLanguage: "de",
      },
      history: [],
      setPreferences: (settings) =>
        set((s) => ({ preferences: { ...s.preferences, ...settings } })),
      setStatus: (status) => set({ status }),
      setActionStatus: (actionStatus) => set({ actionStatus }),
      resetResponse: () => set({ definition: "" }),
      setTerm: (term) => set({ term }),
      setActionResponse: (keyword) =>
        set((s) => ({ actionResponse: s[keyword as keyof Store] as string })),
      setKeyword: (resType) => set({ resType }),
      setHistory: (value) =>
        set((s) => {
          const isTermExist = (s.history || []).find((o) => o.value == value)
          if (!isTermExist) {
            return { history: [...(s.history || []), { value }] };
          } else return {};
        }),
    }),
    {
      name: "kamousai",
    }
  )
);
