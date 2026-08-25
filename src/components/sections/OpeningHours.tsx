"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { restaurant, type OpeningDay } from "@/data/restaurant";

function isOpenNow(now: Date): boolean {
  const day = restaurant.hours.find((d) => d.idx === now.getDay());
  if (!day) return false;
  const [oh, om] = day.open.split(":").map(Number);
  const [ch, cm] = day.close.split(":").map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = oh * 60 + om;
  let close = ch * 60 + cm;
  if (close < open) close += 24 * 60; // past-midnight close
  return mins >= open && mins <= close;
}

export default function OpeningHours() {
  const { t } = useI18n();
  const now = new Date();
  const todayIdx = now.getDay();
  const open = isOpenNow(now);

  // present Monday-first
  const ordered: OpeningDay[] = [...restaurant.hours].sort(
    (a, b) => ((a.idx + 6) % 7) - ((b.idx + 6) % 7)
  );

  return (
    <section className="relative overflow-hidden bg-ink section-pad">
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-gold/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.hours.eyebrow}
          arabic={t.hours.arabic}
          title={t.hours.title}
          subtitle={t.hours.subtitle}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="glass flex h-full flex-col justify-between rounded-3xl p-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                        open ? "bg-emerald-light/70" : "bg-crimson/60"
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-3 w-3 rounded-full ${
                        open ? "bg-emerald-light" : "bg-crimson"
                      }`}
                    />
                  </span>
                  <span
                    className={`text-sm font-semibold uppercase tracking-[0.25em] ${
                      open ? "text-emerald-light" : "text-crimson-light"
                    }`}
                  >
                    {open ? t.hours.openNow : t.hours.closed}
                  </span>
                </div>
                <p className="mt-6 font-display text-4xl leading-tight text-gold-light md:text-5xl">
                  {t.hours.headline1}
                  <br />
                  <span className="text-gold-gradient">{t.hours.headline2}</span>
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-gold-light/50">
                  {t.hours.lastOrders}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gold/15 bg-ink/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-mid">{t.hours.lunch}</p>
                  <p className="mt-1 font-display text-2xl text-gold-light">12:00 — 15:30</p>
                </div>
                <div className="rounded-2xl border border-gold/15 bg-ink/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-mid">{t.hours.dinner}</p>
                  <p className="mt-1 font-display text-2xl text-gold-light">{t.hours.dinnerHours}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass overflow-hidden rounded-3xl p-2">
              {ordered.map((d, i) => {
                const isToday = d.idx === todayIdx;
                return (
                  <motion.div
                    key={d.key}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={`flex items-center justify-between rounded-2xl px-6 py-4 transition-colors ${
                      isToday ? "bg-gold/10" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-glow" />
                      )}
                      <span
                        className={`font-display text-xl ${
                          isToday ? "text-gold" : "text-gold-light/80"
                        }`}
                      >
                        {t.hours.days[d.key]}
                      </span>
                    </div>
                    <span
                      className={`text-sm tabular-nums ${
                        isToday ? "text-gold-light" : "text-gold-light/50"
                      }`}
                    >
                      {d.open} — {d.close}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
