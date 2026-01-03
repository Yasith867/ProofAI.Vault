import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export function NeonButton({ children, className, variant = "primary", isLoading, ...props }: NeonButtonProps) {
  const baseStyles = "relative px-6 py-3 rounded-xl font-display font-bold text-sm tracking-wide uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.7)]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_20px_-5px_hsl(var(--secondary)/0.5)] hover:shadow-[0_0_30px_-5px_hsl(var(--secondary)/0.7)]",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </div>
      ) : children}
    </button>
  );
}
