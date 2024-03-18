import * as React from "react";
import { SharedToolsLayout } from "@/components/shared-tools-layout";
import { LogoutButton } from "@/components/auth/logout-button";
import { AvatarMenu } from "@/components/auth/avatar-menu";

export const metadata = {
  title: "Tools List",
  description: "List of language learning tools",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SharedToolsLayout
      AvatarMenu={
        <AvatarMenu
          LogoutButton={
            <LogoutButton
              variant="subtle"
              w="100%"
              classNames={{ root: "flex-row-start" }}
            />
          }
        />
      }
    >
      {children}
    </SharedToolsLayout>
  );
}
