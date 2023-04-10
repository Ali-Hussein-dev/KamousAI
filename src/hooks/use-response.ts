import { create } from "zustand";
type Status = "idle" | "loading" | "error";
interface State {
  response?: string;
  status: Status;
  setResponse: (response: string) => void;
  setStatus: (status: Status) => void;
}

export const useResponse = create<State>((set) => ({
  setResponse: (response) => set({ response }),
  setStatus: (status) => set({ status }),
  status: "idle",
}));
