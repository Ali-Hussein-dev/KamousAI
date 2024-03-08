"use client";
import { createClient } from "@/utils/supabase/client";
import * as React from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then((res) => {
      setIsAuth(!!res.data.session);
      return;
    });
  }, []);
  return { isAuth };
};
