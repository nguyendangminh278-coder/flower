import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn("flex h-11 w-full bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:opacity-50", className)}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
