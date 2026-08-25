"use client";

import { cn } from "@/lib/utils";
import { restaurant } from "@/data/restaurant";

interface LogoProps {
  variant?: "full" | "mark" | "stacked";
  size?: number;
  className?: string;
  wordmarkClassName?: string;
  /** show the small Arabic name under/next to the English wordmark */
  showArabic?: boolean;
}

/**
 * Brand logo. The visual mark lives at /public/images/logo/beirut-dishes.svg —
 * replace that single file to update the logo everywhere (navbar, hero,
 * footer, loader, favicon source).
 */
export default function Logo({
  variant = "full",
  size = 40,
  className,
  wordmarkClassName,
  showArabic = true,
}: LogoProps) {
  const mark = (
    <img
      src="/images/logo/beirut-dishes.svg"
      alt={`${restaurant.name} logo`}
      width={size}
      height={size}
      className="shrink-0 select-none"
      style={{ width: size, height: size }}
      draggable={false}
    />
  );

  if (variant === "mark") {
    return <span className={cn("inline-flex", className)}>{mark}</span>;
  }

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center gap-2", className)}>
        {mark}
        <span className="flex flex-col items-center leading-none">
          <span className={cn("font-display tracking-wide text-gold-light", wordmarkClassName)}>
            {restaurant.name}
          </span>
          {showArabic && (
            <span className="mt-1 font-arabic text-gold-mid">{restaurant.arabicName}</span>
          )}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {mark}
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg tracking-wide text-gold-light", wordmarkClassName)}>
          {restaurant.name}
        </span>
        {showArabic && (
          <span className="font-arabic text-xs text-gold-mid">{restaurant.arabicName}</span>
        )}
      </span>
    </span>
  );
}
