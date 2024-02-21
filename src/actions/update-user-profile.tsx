"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  // name: z.number(),
  name: z.string().optional(),
  languages: z
    .array(
      z.object({ lang: z.string().optional(), level: z.string().optional() })
    )
    .optional(),
});

export const updateUserProfile = async (
  _currentState: { msg: string },
  formData: FormData
) => {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getUser();
  const id = data.user?.id;
  if (!data || !id) {
    return redirect("/login");
  }

  try {
    //---> Parse form data
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

    // validate form data
    const validatedData = schema.safeParse({
      name: formData.get("name"),
      languages: Object.values(languages),
    });

    // @ts-expect-error - we know that the data is valid
    if (!!validatedData.error) {
      // @ts-expect-error - we know that the data is valid
      console.warn("Validation Error", validatedData.error, id);
      return {
        msg: "Form data validation failed. Please send correct data.",
      };
    }
    //---> update user profile on Supabase
    await supabase.from("profiles").update(validatedData).eq("id", id);

    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      msg: "Error updating profile. Please try again.",
    };
  }
};



