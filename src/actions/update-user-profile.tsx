"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().optional(),
  languages: z
    .array(
      z.object({ lang: z.string().optional(), level: z.string().optional() })
    )
    .optional(),
});

export const updateUserProfile = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  if (!data) {
    return redirect("/login");
  }
  //--------------start updating user profile
  try {
    const id = data.user?.id;
    if (!id) return redirect("/login");
    // validate form data

    const validatedData = schema.parse(formData);
    // @ts-expect-error - we know that the data is valid
    if (!!validatedData.error) {
      // @ts-expect-error - we know that the data is valid
      console.warn("Validation Error", validatedData.error, formData, id);
      return {
        msg: "Form data validation failed. Please send correct data.",
      };
    }
    //---> handle user laguages data from form
    const languages: Record<string, LangPair> = {};
    formData.forEach((value, key) => {
      const index = key.split("-")[1]; // "lang-index" or "level-index"
      if (index == undefined) return;

      if (key.startsWith("lang-")) {
        languages[index] = { lang: value as string } as LangPair;
      } else if (key.startsWith("level-")) {
        languages[index] = {
          ...languages[index],
          level: value as string,
        } as LangPair;
      }
    });
    //---> update user profile
    await supabase
      .from("profiles")
      .update({
        name: formData.get("name"),
        languages: Object.values(languages),
      })
      .eq("id", id);

    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      msg: "Error updating profile. Please try again.",
    };
  }
};



