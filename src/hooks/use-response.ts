import { create } from "zustand";
type Status = "loading" | "success" | "error" | "idle";
interface State {
  response?: string;
  setResponse: (response: string) => void;
  status?: Status;
  setStatus: (status: Status) => void;
}

export const useResponse = create<State>((set) => ({
  setResponse: (response) => set({ response }),
  status: "idle",
  setStatus: (status) => set({ status }),
}));
