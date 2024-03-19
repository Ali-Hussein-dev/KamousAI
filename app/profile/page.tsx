import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { type Metadata } from "next";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserProfile } from "@/components/user-profile";
import * as React from "react";
import { Footer } from "@/components/homepage/Footer";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Profile",
};

//======================================
const ProfilePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // const { data: user } = await supabase.auth.getUser();
  if (!session) {
    return redirect("/login");
  }

  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id);
  if (!!profile.error) {
    //  notifcation
    alert(profile.error);
    console.warn(profile.error);
  }
  if (!profile.data?.[0]) {
    return redirect("/login");
  }
  // const profileData = profile.data?.[0];
  return (
    <div className="min-h-screen w-full flex-col-center">
      <section className="mx-auto w-full max-w-4xl grow space-y-6 px-2 pt-10">
        <div className="w-full flex-row-between">
          <Link
            href="/tools"
            className="next-link bg-slate-500/20 hover:bg-slate-800"
          >
            <FaArrowLeft />
            Back
          </Link>
          <LogoutButton />
        </div>
        <React.Suspense>
          <UserProfile profile={profile.data?.[0]} />
        </React.Suspense>
      </section>
      <footer className="min-h-12 w-full border-0 border-t border-solid border-slate-600 flex-row-center">
        <Footer />
      </footer>
    </div>
  );
};

export default ProfilePage;
