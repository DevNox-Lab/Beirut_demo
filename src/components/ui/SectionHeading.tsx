"use client";

import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  arabic?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  arabic,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={cn(
              "mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.4em] text-gold-mid",
              align === "center" && "justify-center"
            )}
          >
            <span className="h-px w-8 bg-gold-mid/60" />
            {eyebrow}
            <span className="h-px w-8 bg-gold-mid/60" />
          </div>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        {arabic && (
          <p className="mb-2 font-arabic text-2xl text-crimson-light md:text-3xl">
            {arabic}
          </p>
        )}
        <h2 className="text-balance font-display text-4xl font-light leading-tight text-gold-light md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-5 text-balance text-base leading-relaxed text-gold-light/60 md:text-lg",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
