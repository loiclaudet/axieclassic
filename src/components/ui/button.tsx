import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-regular ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "shadow-[0_2px_0_0_hsl(228,15%,13%),0_3px_0_0_hsl(225,5%,31%)] border-neutral-button-border-dark border rounded-xl bg-neutral-bg-dark text-neutral-100 hover:text-white dark:bg-neutral-bg-dark dark:text-neutral-100 dark:hover:bg-neutral-bg-dark",
        // destructive:
        //   "bg-red-500 text-neutral-100 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-100 dark:hover:bg-red-900/90",
        // outline:
        //   "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        // secondary:
        //   "bg-neutral-100 text-neutral-100 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800/80",
        // ghost:
        //   "hover:bg-neutral-100 hover:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        // link: "text-neutral-100 underline-offset-4 hover:underline dark:text-neutral-100",
      },
      size: {
        default: "px-1.5 py-0.5",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
