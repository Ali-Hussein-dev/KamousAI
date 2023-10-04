"use client";
import { ToolsMenu } from "@/components";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { Title } from "@mantine/core";
import { useSelectedLayoutSegment } from "next/navigation";

export default function LayoutG({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const title = capitalizeFirstLetter(segment?.replaceAll("-", " ") as string);
  return (
    <>
      <title>{title}</title>
      <section>
        <div className="mx-auto mb-6 w-full max-w-2xl border-b border-solid border-transparent border-b-slate-600 pb-2 flex-row-between">
          <Title
            order={2}
            size="md"
            styles={{
              root: {
                color: "var(--mantine-color-dark-4)",
              },
            }}
          >
            {title}
          </Title>
          <ToolsMenu />
        </div>
        {children}
      </section>
    </>
  );
}
