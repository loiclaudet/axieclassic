import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/app/lib/utils";

const buttonVariants = cva(
  "inline-flex active:translate-y-px outline-0 hover:shadow-[0_2px_0_0_hsl(228,15%,13%),0_3px_0_0_hsl(360,2%,64%)] focus-visible:shadow-[0_2px_0_0_hsl(228,15%,13%),0_3px_0_0_hsl(360,2%,64%)] active:shadow-[0_1px_0_0_hsl(228,15%,13%),0_2px_0_0_hsl(360,2%,64%)] gap-1 items-center justify-center whitespace-nowrap font-medium font-regular hover:text-neutral-100 hover:border-neutral-400 text-neutral-icon-dark rounded-xl border bg-neutral-bg-dark focus-visible:border-neutral-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "shadow-[0_2px_0_0_hsl(228,15%,13%),0_3px_0_0_hsl(225,5%,31%)] border-neutral-button-border-dark",
        // destructive:
        //   "bg-red-500 text-neutral-100 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-100 dark:hover:bg-red-900/90",
        // outline:
        //   "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        // secondary:
        //   "bg-neutral-100 text-neutral-100 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800/80",
        ghost:
          "bg-transparent border-transparent active:translate-y-0 focus-visible:border-transparent focus-visible:shadow-none hover:shadow-none hover:border-transparent active:shadow-none",
        //   "hover:bg-neutral-100 hover:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        link: "justify-start border-transparent hover:border",
      },
      size: {
        default: "px-1.5 py-0.5 text-md",
        sm: "px-1.5 py-0.1 text-sm",
        lg: "px-2 py-1 text-xl",
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
