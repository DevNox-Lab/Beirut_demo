"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "crimson";
  children: ReactNode;
}

export default function GoldButton({
  variant = "solid",
  children,
  className,
  ...props
}: GoldButtonProps) {
  return (
    <button
      className={cn(
        "btn-luxe group",
        variant === "solid" &&
          "bg-gold-gradient text-ink shadow-glow hover:shadow-[0_0_60px_-8px_rgba(250,234,174,0.6)]",
        variant === "outline" &&
          "border border-gold/40 text-gold hover:border-gold hover:bg-gold/5",
        variant === "crimson" &&
          "bg-crimson text-gold-light shadow-glow-crimson hover:bg-crimson-light",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "solid" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      )}
    </button>
  );
}
