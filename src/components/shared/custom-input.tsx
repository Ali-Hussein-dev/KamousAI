//======================================
export const CustomInput = (
  props: React.ComponentPropsWithoutRef<"input">
  //   ref: React.RefObject<HTMLInputElement> | null | undefined
) => {
  return (
    <input
      //   ref={ref}
      className="h-10 w-full rounded border-none border-slate-500 bg-slate-800/30 px-2 text-slate-100 focus:bg-slate-800/60 focus:outline-none"
      {...props}
    />
  );
};
