"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
// import { revalidatePath } from "next/cache";
// import { z } from "zod";

/**
 * TODO:
 * - [ ] Add zod schema for paraphraser
 * - [X] Add types for paraphraser
 * - [ ] relvalidatePath
 */

const authSupabase = async () => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.warn("Auth Error", error);
        return redirect("/login");
  }
    return { supabase, id: data.user?.id as string };
};

export const getParaphraser = async () => {
    const { supabase, id } = await authSupabase();
    const { error, data } = await supabase
        .from("paraphraser")
        .select()
        .eq("user_id", id);
    if (!!error) {
        throw Error(error.message);
  }
    return data[0] || {};
};

const paraphraserSchema = z.object({
    temperature: z.number(),
    tones: z.array(
        z.object({ id: z.string().optional(), label: z.string(), value: z.string() })
    ),
});
export const updateParaphraser = async (
    inputs: Pick<Paraphraser, "configs">
) => {
    const validate = paraphraserSchema.safeParse(inputs);
    if (!validate.success) {
        console.warn("actions:updateParaphraser", inputs);
        throw Error(validate.error.message);
    }
    const { supabase, id } = await authSupabase();
    const { data, error } = await supabase
        .from("paraphraser")
        .upsert(
            { user_id: id, configs: inputs, updated_at: new Date().toDateString() },
            { onConflict: "user_id" }
        );
    if (!!error) {
        throw Error(error.message);
    }
    return data;
};
