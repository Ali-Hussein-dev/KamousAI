import { type Message } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const tones = [
  {
    id: "1001",
    label: "Professional",
    value: "professional",
  },
  {
    id: "2001",
    label: "Friendly",
    value: "friendly",
  },
  {
    id: "3001",
    label: "Formal",
    value: "formal",
  },
  {
    id: "5001",
    label: "Casual",
    value: "casual",
  },
  {
    id: "4001",
    label: "Confident",
    value: "confident",
  },
  {
    id: "4001",
    label: "Straightforward",
    value: "straightforward",
  },
];
export type Tone = {
  value: string;
  label: string;
  id: string;
  // createdAt: number;
};
type State = {
  tones: Tone[];
  update: (tone: Tone) => void;
  remove: (id: string) => void;
  add: (tone: Tone) => void;
  history: Message[];
  setHistory: (history: Message[]) => void;
};

export const useTextOptimizer = create<State>()(
  persist(
    (set) => ({
      tones,
      history: [],
      setHistory: (history) => set((s) => ({ ...s, history })),
      update: (updatedTone) =>
        set((s) => ({
          ...s,
          tones: s.tones.map((current) =>
            current.id === updatedTone.id ? updatedTone : current
          ),
        })),
      remove: (id) =>
        set((state) => ({
          ...state,
          tones: state.tones.filter((tone) => tone.id !== id),
        })),
      add: (tone) =>
        set((state) => ({ ...state, tones: [...state.tones, tone] })),
    }),
    { name: "kamousai-text-optimizer" }
  )
);
