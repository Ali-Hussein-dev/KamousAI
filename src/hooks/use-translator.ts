import { persist } from "zustand/middleware";
import { create } from "zustand";

type State = {
    input: {
        value: string;
        label: string;
    };
    output: {
        value: string;
        label: string;
    };
    setLanguage: (
        type: "input" | "output",
        obj: { value: string; label: string }
    ) => void;
    swapLanguages: () => void;
};
export const useTranslator = create<State>()(
    persist(
        (set) => {
            return {
                input: {
                    value: "en",
                    label: "English",
                },
                output: {
                    value: "es",
                    label: "Spanish",
                },
                setLanguage: (type, value) =>
                    set((state) => {
                        return {
                            ...state,
                            [type]: value,
                        };
                    }),
                swapLanguages: () => set((s) => ({ input: s.output, output: s.input })),
            };
        },
        { name: "kamousai-translator" }
    )
);
