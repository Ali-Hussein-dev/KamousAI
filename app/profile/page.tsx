import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { type Metadata } from "next";
import { Button, Title } from "@mantine/core";
import { LogoutButton } from "@/components/auth-buttons";
import { UserLanguages } from "@/components/user-profile";
import { CustomInput } from "@/components/shared/custom-input";
import * as React from "react";
export const metadata: Metadata = {
  title: "Profile",
};

//======================================
const Profile = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();
  const { data: user } = await supabase.auth.getUser();
  if (!data.session) {
    return redirect("/login");
  }
  // const profile = await supabase.from("profiles").update();

  return (
    <div className="px-2 pt-10">
      <section className="mx-auto max-w-4xl space-y-3">
        <LogoutButton />
        <form
          action=""
          className="mx-auto max-w-2xl space-y-3 rounded-lg bg-slate-800 p-4 shadow-lg"
        >
          <Title order={2} className="text-base">
            User Info
          </Title>
          <div className="flex-wrap gap-2 flex-row-between sm:flex-nowrap">
            <CustomInput placeholder="name" className="w-full" />
            <CustomInput
              placeholder="email"
              value={user.user?.email}
              disabled
              type="email"
              className="w-full"
            />
          </div>
          <UserLanguages />
          <div className="flex-row-end">
            <Button className="">Save</Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
