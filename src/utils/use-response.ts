import { create } from "zustand";

interface State {
  response?: string;
  setResponse: (response: string) => void;
}

export const useResponse = create<State>((set) => ({
  setResponse: (response) => set({ response }),
}));
