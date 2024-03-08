import { Button } from "@mantine/core";
import * as React from "react";
import { IoMdLogIn } from "react-icons/io";
import Link from "next/link";
//======================================
export const LoginLink = ({ login = "Login" }: { login?: string }) => (
  <Link href="/login">
    <Button variant="light" w="120px" leftSection={<IoMdLogIn size="20" />}>
      {login}
    </Button>
  </Link>
);
