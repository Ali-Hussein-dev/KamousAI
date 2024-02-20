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
}

