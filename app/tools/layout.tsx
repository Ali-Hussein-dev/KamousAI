"use client";
import { ToolsMenu } from "@/components";
import { AppLayout } from "@/components/app-layout";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { useSelectedLayoutSegment } from "next/navigation";

export default function LayoutG({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const title = capitalizeFirstLetter(segment?.replaceAll("-", " ") as string);
  return (
    <>
      <AppLayout>
        <title>{title}</title>
        <section>
          <div className="mx-auto mb-6 w-full max-w-3xl border-b border-solid border-transparent border-b-slate-600 pb-2 flex-row-between">
            <h2 className="mb-0 text-lg font-extrabold capitalize text-slate-300">
              {title}
            </h2>
            <ToolsMenu />
          </div>
          <div className="mx-auto max-w-3xl">{children}</div>
        </section>
      </AppLayout>
    </>
  );
}
