import { createClient } from "@/utils/supabase/server";
import { Button, Title } from "@mantine/core";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import * as React from "react";
import { FaInfoCircle, FaLock } from "react-icons/fa";
import { type Metadata } from "next";

// const useSigninOAuth = () => {
//   const signInWithOAuth = async () => {
//     "use server";
//     const cookieStore = cookies();
//     const origin = headers().get("origin");
//     const supabase = createClient(cookieStore);
//     console.log(`${origin}/auth/callback`);
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: `${origin}/auth/callback`,
//       },
//     });
//     if (error) {
//       console.warn(error);
//       return redirect("/login?message=Could not authenticate user");
//     }
//     // return redirect("/login?message=Check email to continue login process");
//   };
//   return { signInWithOAuth };
// };
// const OAuthButton = () => {
//   const { signInWithOAuth } = useSigninOAuth();
//   return (
//     <form action={signInWithOAuth}>
//       <Button
//         // onClick={() => signInWithOAuth("google")}
//         type="submit"
//         // formAction={signInWithOAuth}
//         w="100%"
//         size="lg"
//         // bg="white"
//         color="gray"
//       >
//         Google
//       </Button>
//     </form>
//   );
// };
const useSigninWithOTP = () => {
  const signInWithOtp = async (formData: FormData) => {
    "use server";
    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const email = formData.get("email") as string;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        // emailRedirectTo: location.origin,
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      console.warn(error);
      return redirect("/login?message=Could not authenticate user");
    }
    return redirect("/login?message=Check email to continue login process");
  };
  return { signInWithOtp };
};

export const metadata: Metadata = {
  title: "Login",
};
//======================================
const SigninPage = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const { signInWithOtp } = useSigninWithOTP();
  return (
    <div className="center h-screen pt-10 md:pt-16">
      <div className="w-full max-w-xl rounded-xl border-[0.5px] border-solid border-primary-400/80 bg-gradient-to-t from-slate-900 to-slate-800/90 px-5 pb-4 pt-10 shadow-xl sm:mb-20">
        <div className="flex grow flex-col gap-1">
          <div className="gap-2 flex-row-center">
            {/* <FaLock size="20" className=" text-teal-500" /> */}
            <Title order={1} className="text-3xl">
              Login Form
            </Title>
          </div>
          <form action={signInWithOtp} className="space-y-4">
            <label htmlFor="email" className="ml-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-12 w-full rounded-lg border border-solid border-slate-700 bg-slate-800/80 px-3 text-slate-100 outline-none duration-100 placeholder:text-slate-500 focus:border-slate-500 focus:bg-slate-900/30"
            />
            <Button type="submit" formAction={signInWithOtp} w="100%" size="lg">
              Send magic link
            </Button>
          </form>
          {/* <Divider label="OR" labelPosition="center" c="dark" /> */}
          {/* <OAuthButton /> */}
        </div>
        {searchParams?.message && (
          <p className="animate-in mb-0 gap-2 rounded-sm bg-slate-200/10 py-2 text-center flex-row-center">
            <FaInfoCircle size="17" />
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default SigninPage;
