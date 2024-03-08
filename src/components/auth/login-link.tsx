import { Button } from "@mantine/core";
import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";

//======================================
export const LoginLink = ({ login = "Login" }: { login?: string }) => (
  <Link href="/login">
    <Button variant="light" w="120px" leftSection={<IoMdLogIn size="20" />}>
      {login}
    </Button>
  </Link>
);
