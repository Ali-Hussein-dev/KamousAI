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
}

