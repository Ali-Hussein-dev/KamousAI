import { type Database } from "./src/types/db.types"

declare global {
    type DB = Database
    type LangPair = { lang: string; level: string }
    type UserProfile = {
        id: string
        name: string
        email: string
        languages: (Json | LangPair)[]
    }
    type Paraphraser = {
        id: number;
        user_id: string;
        configs: Json | {
            temperature: number;
            tones: Tone[];
        };
        history: Message[] | Json;
        created_at: string;
        updated_at: string;
    }
    type PromiseType<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never;
}

