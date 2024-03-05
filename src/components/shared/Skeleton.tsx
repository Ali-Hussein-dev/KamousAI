import { cn } from "@/utils/helpers";

//======================================
export const Skeleton = ({ cls }: { cls?: string }) => {
  return (
    <div
      className={cn("h-10 w-full animate-pulse rounded-lg bg-slate-600", cls)}
    />
  );
};
