import { env } from '@/env.mjs'
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
    createBrowserClient<DB>(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
