import { createClient } from "@/utils/supabase/server";
import { Button, type ButtonProps } from "@mantine/core";
import { cookies } from "next/headers";
import * as React from "react";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { redirect } from "next/navigation";
import Link from "next/link";

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

/**
 * coniditional link to login or logout
 */
//======================================
export const LoginLink = ({ login = "Login" }: { login?: string }) => (
  <Link href="/login">
    <Button variant="light" w="120px" leftSection={<IoMdLogIn size="20" />}>
      {login}
    </Button>
  </Link>
);
