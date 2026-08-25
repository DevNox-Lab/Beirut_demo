"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ratingSummary, reviews } from "@/data/reviews";
import { useI18n } from "@/i18n/LanguageProvider";

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - (i - 1)));
        return (
          <span key={i} className="relative" style={{ width: size, height: size }}>
            <Star size={size} color="rgba(250,234,174,0.2)" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={size} color="#faeaae" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Star({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
    </svg>
  );
}

export default function Reviews() {
  const { t, tf } = useI18n();
  return (
    <section id="reviews" className="relative overflow-hidden bg-ink section-pad">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.reviews.eyebrow}
          arabic={t.reviews.arabic}
          title={t.reviews.title}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[360px_1fr]">
          {/* Rating summary */}
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center gap-4">
                <span className="font-display text-6xl text-gold-gradient">
                  {ratingSummary.average}
                </span>
                <div>
                  <Stars rating={ratingSummary.average} size={20} />
                  <p className="mt-1 text-sm text-gold-light/50">
                    {ratingSummary.total} {t.reviews.googleReviews}
                  </p>
                </div>
              </div>

              <div className="my-6 gold-hairline" />

              <div className="space-y-2.5">
                {ratingSummary.breakdown.map((b) => {
                  const pct = (b.count / ratingSummary.total) * 100;
                  return (
                    <div key={b.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-3 text-gold-light/60">{b.stars}</span>
                      <Star size={12} color="#c8a13d" />
                      <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-gold/10">
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="absolute inset-y-0 left-0 rounded-full bg-gold-gradient"
                        />
                      </span>
                      <span className="w-6 text-right text-gold-light/40">
                        {b.count}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center gap-2 rounded-xl border border-gold/15 bg-ink/40 p-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10c5 0 9.2-3.7 9.9-8.5H12v-3h9.8c.1.5.2 1 .2 1.5z" fill="#c8a13d" opacity="0.8" />
                </svg>
                <span className="text-xs text-gold-light/60">
                  {t.reviews.verified}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Review cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-gold/10 bg-white/[0.02] p-6 transition-all hover:border-gold/30 hover:bg-white/[0.04]"
              >
                <span className="absolute right-5 top-2 font-display text-7xl text-gold/10 transition-colors group-hover:text-gold/20">
                  &rdquo;
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient font-display text-sm font-semibold text-ink">
                    {r.initials}
                  </span>
                  <div>
                    <p className="font-medium text-gold-light">{r.name}</p>
                    <p className="text-xs text-gold-light/40">{tf(r.date)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Stars rating={r.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gold-light/70">
                  {tf(r.text)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
