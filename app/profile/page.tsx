import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { type Metadata } from "next";
import { LogoutButton } from "@/components/auth-buttons";
import { UserProfile } from "@/components/user-profile";
import * as React from "react";

export const metadata: Metadata = {
  title: "Profile",
};

//======================================
const ProfilePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();
  // const { data: user } = await supabase.auth.getUser();
  if (!data.session) {
    return redirect("/login");
  }

  const profile = await supabase.from("profiles").select("*");
  if (!!profile.error) {
    //  notifcation
    alert(profile.error);
    console.warn(profile.error);
  }
  if (!profile.data) {
    return redirect("/login");
  }
  // const profileData = profile.data?.[0];
  return (
    <div className="px-2 pt-10">
      <section className="mx-auto max-w-4xl space-y-3">
        <LogoutButton />

        <React.Suspense>
          <UserProfile profile={profile.data?.[0] || {}} />
        </React.Suspense>
      </section>
    </div>
  );
};

export default ProfilePage;
