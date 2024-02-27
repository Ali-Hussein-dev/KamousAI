"use client";
import { createStore, useStore } from "zustand";
import * as React from "react";
import { useQueryParaphraser } from "@/actions/paraphraser/hooks";
const presetTones = [
  {
    id: "1001",
    label: "Professional",
    value: "professional",
  },
  // {
  //   id: "2001",
  //   label: "Friendly",
  //   value: "friendly",
  // },
  // {
  //   id: "3001",
  //   label: "Formal",
  //   value: "formal",
  // },
  // {
  //   id: "5001",
  //   label: "Casual",
  //   value: "casual",
  // },
  // {
  //   id: "4001",
  //   label: "Confident",
  //   value: "confident",
  // },
  // {
  //   id: "4001",
  //   label: "Straightforward",
  //   value: "straightforward",
  // },
];

//---------------------------------------------------INTIAL-STATE
export type Tone = {
  value: string;
  label: string;
  id: string;
};
const initialState = {
  temperature: 1,
  tones: presetTones,
};

//---------------------------------------------------STORE-TYPES
type Props = {
  tones: Tone[];
  temperature: number;
  //   history: Message[];
};
type Actions = {
  setTemperature: (temperature: number) => void;
  //   setHistory: (history: Message[]) => void;
  add: (tone: Tone) => void;
  update: (tone: Tone) => void;
  remove: (id: string) => void;
};
type State = Props & Actions;

type ParaphraserStore = ReturnType<typeof createParaphraserStore>;

//---------------------------------------------------STORE
const createParaphraserStore = (initialProps?: Partial<Props>) => {
  const defaultProps = {
    ...initialState,
    ...initialProps,
  };
  return createStore<State>()((set) => ({
    ...defaultProps,
    setTemperature: (temperature) => set((s) => ({ ...s, temperature })),
    update: (updatedTone) =>
      set(
        (s) =>
          ({
            ...s,
            tones: s.tones.map((tone) =>
              tone.id === updatedTone.id ? updatedTone : tone
            ) as Tone[],
          } as Props)
      ),
    remove: (id) =>
      set((s) => ({
        ...s,
        tones: s.tones.filter((tone) => tone.id !== id),
      })),
    add: (tone) =>
      set((state) => ({ ...state, tones: [...state.tones, tone] })),
  }));
};

//---------------------------------------------------CONTEXT-&-CONTEXT-HOOK
const ParaphraserContext = React.createContext<ParaphraserStore | null>(null);

export const useParaphraserContext = <T,>(selector: (state: State) => T): T => {
  const context = React.useContext(ParaphraserContext);
  if (!context)
    throw new Error(
      "useParaphraserContext must be used within a ParaphraserProvider"
    );

  return useStore(context, selector);
};

//---------------------------------------------------PROVIDER
type ProviderProps = React.PropsWithChildren;

export const ParaphraserProvider: React.FC<ProviderProps> = ({ children }) => {
  const { data } = useQueryParaphraser();
  const storeRef = React.useRef<ParaphraserStore>();
  if (!storeRef.current) {
    // @ts-expect-error data.configs is of type Json
    const props = data?.configs || initialState;
    storeRef.current = createParaphraserStore(props);
  }

  return (
    <ParaphraserContext.Provider value={storeRef.current}>
      {children}
      <pre>{JSON.stringify(data || {}, null, 2)}</pre>
    </ParaphraserContext.Provider>
  );
};