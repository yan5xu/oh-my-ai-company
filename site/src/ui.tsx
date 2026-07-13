import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib";

const buttonVariants = cva(
  "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap border text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a7e1d6] disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary: "border-[#846c55] bg-[#846c55] text-white hover:border-[#725c48] hover:bg-[#725c48]",
        secondary: "border-[#dedbd4] bg-[#fbfaf7] text-[#393734] hover:border-[#bcb7ae] hover:bg-white",
        ghost: "border-transparent bg-transparent text-[#66615b] hover:bg-[#f1f0eb] hover:text-[#262522]"
      },
      size: {
        default: "px-3.5",
        sm: "h-8 px-2.5 text-xs",
        icon: "size-9 p-0"
      }
    },
    defaultVariants: { variant: "primary", size: "default" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn("h-9 w-full border border-[#dedbd4] bg-white px-3 text-sm text-[#262522] outline-none transition placeholder:text-[#9b968f] focus:border-[#88bcb2] focus:ring-2 focus:ring-[#a7e1d6]/40", className)}
    {...props}
  />
));
Input.displayName = "Input";

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full bg-[#f0efea] px-2 py-0.5 text-[11px] text-[#67625c]", className)}>{children}</span>;
}
