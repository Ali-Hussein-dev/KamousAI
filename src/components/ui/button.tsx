import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/helpers";

const buttonVariants = cva(
  "inline-flex items-center justify-start whitespace-nowrap rounded-xl font-medium text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:opacity-70 capitalize duration-200 hover:cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-500",
        secondary: "bg-theme-secondary text-slate-900 hover:bg-slate-300",
        outline:
          "border border-solid border-slate-500 bg-transparent hover:bg-slate-100 hover:text-slate-900",
        ghost: "bg-transparent text-slate-100 hover:bg-slate-700",
        light: "bg-slate-700 text-slate-100 hover:bg-slate-900/50",
        // use for external links and for internal use next-link class
        destructive: "bg-red-900 text-slate-50 hover:bg-red-900/90",
        success: "bg-teal-700 text-slate-50 hover:bg-teal-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
