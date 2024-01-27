import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md border text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary border-primary-stroke text-primary-foreground hover:bg-primary-hover hover:border-primary-stroke-hover active:bg-primary",
        destructive:
        "bg-destructive border-destructive-stroke text-destructive-foreground-hover hover:text-destructive-foreground-hover hover:bg-destructive-hover hover:border-destructive-stroke-hover active:bg-destructive-hover/80",
        tertiary:
        "bg-tertiary border-tertiary-stroke text-tertiary-foreground hover:bg-tertiary-hover hover:border-tertiary-stroke-hover active:bg-tertiary-hover/80",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
        "bg-secondary border-secondary-stroke text-secondary-foreground hover:bg-secondary-hover hover:border-secondary-stroke-hover active:bg-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
