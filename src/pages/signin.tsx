import { Button, Title, Paper, Divider } from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";
import * as React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

//======================================
const Signin = ({
  providers,
}: {
  providers: Awaited<ReturnType<typeof getProviders>>;
}) => {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <Paper
        radius="lg"
        shadow="lg"
        p="lg"
        pt={0}
        withBorder
        className="max-w-lg px-4 "
        w="100%"
      >
        <div className="w-full">
          <Title order={2} ta="center">
            Log in
          </Title>
          <Divider w="100%" />
        </div>
        <div className="gap-y-4 pt-8 flex-col-center">
          {providers &&
            Object.values(providers).map((prov) => (
              <Button
                key={prov.name}
                variant="outline"
                color="gray"
                size="lg"
                radius="md"
                leftSection={prov.id === "github" ? <BsGithub /> : <BsGoogle />}
                onClick={() => void signIn(prov.id)}
              >
                {prov.name}
              </Button>
            ))}
        </div>
      </Paper>
    </div>
  );
};

export default Signin;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const providers = await getProviders();
  const session = await getSession(ctx);

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {
      providers,
    },
  };
}
