"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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
    throw new Error("Error updating profile. Please try again.");
  }
};



