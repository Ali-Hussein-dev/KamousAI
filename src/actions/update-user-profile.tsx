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
  try {
    const id = data.user?.id;
    await supabase
      .from("profiles")
      .update({
        name: formData.get("name"),
        // todo: update other fields (userLanguages)
      })
      .eq("user_id", id);

    revalidatePath("/profile");
  } catch (error) {
    throw new Error("Error updating profile. Please try again.");
  }
  // console.log(
  //   "------------server-action: updateProfile------------",
  //   new Date().getMinutes()
  // );

  // console.log(res);
  // const userLanguages = FormData
  // console.log(userLanguages);
  // console.log(formData);
};
