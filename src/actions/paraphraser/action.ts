"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";
// import { z } from "zod";

/**
 * TODO:
 * - [ ] Add zod schema for paraphraser
 * - [ ] Add types for paraphraser
 * - [ ] relvalidatePath
 */

const authSupabase = async () => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.warn("Error", error)
        return redirect("/login");
    }
    return { supabase, id: data.user?.id as string }
}


export const getParaphraser = async () => {
    const { supabase, id } = await authSupabase()
    const data = await supabase.from("paraphraser")
        .select().eq("user_id", id)
    return data
}

export const updateParaphraser = async (data: any) => {
    const { supabase, id } = await authSupabase()
    return await supabase.from("paraphraser")
        .update([data]).eq("user_id", id)
}
