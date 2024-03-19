"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";

const authSupabase = async () => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.warn("authSupabase fun: ", error);
        // return redirect("/login");
        return
    }
    return { supabase, id: data.user?.id as string };
};

export const getParaphraser = async (): Promise<Paraphraser | undefined> => {

    const getSupabase = await authSupabase();
    if (!getSupabase) {
        return;
    }
    const { supabase, id } = getSupabase
    if (!id) {
        console.warn("actions:getParaphraser", id);
        return;
    }
    const { error, data } = await supabase
        .from("paraphraser")
        .select()
        .eq("user_id", id);
    if (!!error) {
        throw Error(`getParaphraser: ${error.message}`);
    }
    return data[0];
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
        throw Error(`updateParaphraser: ${validate.error.message}`);
    }
    const getSupabase = await authSupabase();
    if (!getSupabase) {
        return;
    }
    const { supabase, id } = getSupabase
    const { data, error } = await supabase
        .from("paraphraser")
        .upsert(
            { user_id: id, configs: inputs, updated_at: new Date().toDateString() },
            { onConflict: "user_id" }
        );
    if (!!error) {
        throw Error(`updateParaphraser: ${error.message}`);
    }
    return data;
};