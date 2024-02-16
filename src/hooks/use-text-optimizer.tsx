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
  temperature: number;
  setTemperature: (temperature: number) => void;
  history: Message[];
  setHistory: (history: Message[]) => void;
  update: (tone: Tone) => void;
  remove: (id: string) => void;
  add: (tone: Tone) => void;
};

export const useTextOptimizer = create<State>()(
  persist(
    (set) => ({
      tones,
      temperature: 1,
      history: [],
      setTemperature: (temperature) => set((s) => ({ ...s, temperature })),
      setHistory: (history) => set((s) => ({ ...s, history })),
      update: (updatedTone) =>
        set(
          (s) =>
            ({
              ...s,
              tones: s.tones.map((tone) =>
                tone.id === updatedTone.id ? updatedTone : tone
              ) as Tone[],
            } as State)
        ),
      remove: (id) =>
        set((s) => ({
          ...s,
          tones: s.tones.filter((tone) => tone.id !== id),
        })),
      add: (tone) =>
        set((state) => ({ ...state, tones: [...state.tones, tone] })),
    }),
    { name: "kamousai-text-optimizer" }
  )
);
