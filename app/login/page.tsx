import { createClient } from "@/utils/supabase/server";
import { Button, Title } from "@mantine/core";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { type Metadata } from "next";
import { CustomInput } from "@/components/shared/custom-input";
import { signInWithOtp } from "@/actions/sign-in";

export const metadata: Metadata = {
  title: "Login",
};
//======================================
const LoginPage = async ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  if (data?.session) {
    redirect("/profile");
  }
  return (
    <div className="center h-screen bg-slate-800 px-2 pt-10 md:pt-16">
      <div className="w-full max-w-xl rounded-xl border-[0.5px] border-solid border-primary-400/80 bg-gradient-to-t from-slate-900 to-slate-800/40 px-5 pb-4 pt-10 shadow-xl animate-in sm:mb-20">
        <div className="flex grow flex-col gap-1">
          <div className="gap-2 flex-row-center">
            {/* <FaLock size="20" className=" text-teal-500" /> */}
            <Title order={1} className="text-lg sm:text-3xl">
              Login Form
            </Title>
          </div>
          <form action={signInWithOtp} className="space-y-4">
            <div>
              <label htmlFor="email" className="ml-1">
                Email <span className="text-red-500">*</span>
              </label>
              <CustomInput
                required
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <Button type="submit" formAction={signInWithOtp} w="100%" size="lg">
              Send magic link
            </Button>
          </form>
          {/* <Divider label="OR" labelPosition="center" c="dark" /> */}
          {/* <OAuthButton /> */}
        </div>
        {searchParams?.message && (
          <p className="mb-0 gap-2 rounded-sm bg-slate-200/10 py-2 text-center flex-row-center">
            <FaInfoCircle size="17" />
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default LoginPage;
