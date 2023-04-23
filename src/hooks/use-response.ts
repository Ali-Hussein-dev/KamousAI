import { create } from "zustand";
type Status = "loading" | "success" | "error" | "idle";
interface State {
  response?: string;
  status?: Status;
  term?: string;
  setResponse: (response: string) => void;
  setStatus: (status: Status) => void;
  resetResponse: () => void;
  setTerm: (term: string) => void;
}

export const useResponse = create<State>((set) => ({
  setResponse: (response) =>
    set((s) => ({ ...s, response: s.response + response })),
  status: "idle",
  setStatus: (status) => set({ status }),
  resetResponse: () => set({ response: "" }),
  setTerm: (term) => set({ term }),
}));
