"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInWithOtp = async (formData: FormData) => {

    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const email = formData.get("email") as string;
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true,
            emailRedirectTo: `${origin}/auth/callback`,

        },
    });
    if (error) {
        console.warn(error);
        return redirect("/login?message=Could not authenticate user");
    }
    return redirect("/login?message=Check email to continue login process");
};

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