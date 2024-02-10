import { createClient } from "@/utils/supabase/server";
import { Button } from "@mantine/core";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as React from "react";

//======================================
export const LogoutButton = () => {
  const logout = async () => {
    "use server";
    console.log("logging out...");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };
  return (
    <form action={logout}>
      <Button type="submit" variant="light" color="primary">
        Log out
      </Button>
    </form>
  );
};
