import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LexicalEntry = {
    id: string;
    createdAt: number;
    term: string;
    definition: string;
    examples?: string;
    synonyms?: string;
    antonyms?: string;
    related?: string;
};

export type WordEntryKey = "definition" | "synonyms" | "antonyms" | "examples";

export type DictionaryMode = "mono" | "bili";
export type Preferences = {
    mode: DictionaryMode;
    inputLanguage: string;
    outputLanguage?: string;
};

type State = {
    lexicalEntries: Record<string, LexicalEntry>;
    setLexicalEntries: (key: string, value: LexicalEntry | undefined) => void;

    preferences: Preferences;
    setPreferences: (settings: Partial<Preferences>) => void;
};

export const useHistoryStore = create<State>()(
    persist(
        (set) => ({
            preferences: {
                mode: "mono",
                inputLanguage: "en",
            },
            lexicalEntries: {},
            setLexicalEntries: (key, value) =>
                set((s) => {
                    const lexicalEntry = value ? {
                        ...(s.lexicalEntries[key] || {}),
                        ...value,
                    } : undefined;
                    return {
                        lexicalEntries: {
                            ...s.lexicalEntries,
                            [key]: lexicalEntry as LexicalEntry,
                        },
                    };
                }),
            setPreferences: (settings) =>
                set((s) => ({ preferences: { ...s.preferences, ...settings } })),
        }),
        {
            name: "kamous-ai-history",
            version: 1,
        }
    )
);

type State2 = {
    key?: string;
    wordEntryKey: WordEntryKey;
    setter: (s: { key: string; wordEntryKey: WordEntryKey }) => void;
}
export const useWordEntriesStore = create<State2>(set => ({
    wordEntryKey: "definition",
    setter: args => set(args)
}))