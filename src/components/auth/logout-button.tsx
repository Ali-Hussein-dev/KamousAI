import { createClient } from "@/utils/supabase/server";
import { Button, type ButtonProps } from "@mantine/core";
import { cookies } from "next/headers";
import * as React from "react";
import { IoMdLogOut } from "react-icons/io";
import { redirect } from "next/navigation";

//======================================
export const LogoutButton = (props: ButtonProps) => {
  const logout = async () => {
    "use server";
    const supabase = createClient(cookies());
    await supabase.auth.signOut();
    return redirect("/login");
  };
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="light"
        c="orange"
        w="120px"
        leftSection={<IoMdLogOut size="20" />}
        {...props}
      >
        Log out
      </Button>
    </form>
  );
};
