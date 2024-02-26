import { type Message } from "ai";
import { type Database } from "./src/lib/db.types"

declare global {
    type DB = Database
    type LangPair = { lang: string; level: string }
    type UserProfile = {
        id: string
        name: string
        email: string
        languages: LangPair[]
    }
    type Paraphraser = {
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        configs: {
            temperature: number;
            tones: Tone[];
        };
        history: Message[];
    }
}

