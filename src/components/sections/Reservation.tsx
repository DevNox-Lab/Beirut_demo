"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  tables as allTables,
  timeSlots,
  zones,
  type Zone,
  type RestaurantTable,
} from "@/data/tables";
import { whatsappLink } from "@/data/restaurant";
import { createReservation } from "@/services/reservationService";
import { useI18n } from "@/i18n/LanguageProvider";

function todayISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

type Step = "idle" | "summary" | "success";

export default function Reservation() {
  const { t } = useI18n();
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("20:00");
  const [guests, setGuests] = useState(2);
  const [zone, setZone] = useState<Zone>("Main Hall");
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [step, setStep] = useState<Step>("idle");

  const zoneTables = useMemo(
    () => allTables.filter((t) => t.zone === zone),
    [zone]
  );

  const canConfirm = date && time && guests > 0 && selectedTable;
  const zoneLabel = (z: Zone) => t.reservation.zones[z];

  const whatsappHref = useMemo(() => {
    const L = t.reservation.labels;
    const msg = `${t.reservation.whatsappMessage}\n\n${L.date}: ${date}\n${L.time}: ${time}\n${L.guests}: ${guests}\n${L.seating}: ${zoneLabel(zone)}${
      selectedTable
        ? `\n${L.table}: ${selectedTable.label} (${selectedTable.seats} ${t.common.seats})`
        : ""
    }`;
    return whatsappLink(msg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time, guests, zone, selectedTable, t]);

  const handleConfirm = () => {
    if (selectedTable) {
      // Persist through the service layer (demo: in-memory store)
      void createReservation({
        date,
        time,
        guests,
        zone,
        tableId: selectedTable.id,
      });
    }
    setStep("success");
  };

  const detailRows = selectedTable
    ? [
        { label: t.reservation.labels.date, value: date },
        { label: t.reservation.labels.time, value: time },
        { label: t.reservation.labels.guests, value: `${guests}` },
        { label: t.reservation.labels.seating, value: zoneLabel(zone) },
        {
          label: t.reservation.labels.table,
          value: `${selectedTable.label} · ${selectedTable.seats} ${t.common.seats}`,
        },
      ]
    : [];

  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-ink-900 section-pad noise"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-emerald-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.reservation.eyebrow}
          arabic={t.reservation.arabic}
          title={t.reservation.title}
          subtitle={t.reservation.subtitle}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* --- Details form --- */}
          <div className="glass rounded-3xl p-6 md:p-8">
            <h3 className="font-display text-2xl text-gold-light">
              {t.reservation.yourDetails}
            </h3>

            <label className="mt-6 block text-xs uppercase tracking-[0.25em] text-gold-mid">
              {t.reservation.date}
            </label>
            <input
              type="date"
              value={date}
              min={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gold/20 bg-ink/60 px-4 py-3 text-gold-light outline-none transition-colors focus:border-gold/60 [color-scheme:dark]"
            />

            <label className="mt-6 block text-xs uppercase tracking-[0.25em] text-gold-mid">
              {t.reservation.time}
            </label>
            <div className="no-scrollbar mt-2 flex flex-wrap gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                    time === slot
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-gold/15 text-gold-light/60 hover:border-gold/40"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <label className="mt-6 block text-xs uppercase tracking-[0.25em] text-gold-mid">
              {t.reservation.guests}
            </label>
            <div className="mt-2 flex items-center gap-4">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-xl text-gold transition-colors hover:bg-gold/10"
              >
                −
              </button>
              <span className="min-w-[3ch] text-center font-display text-3xl text-gold-light">
                {guests}
              </span>
              <button
                onClick={() => setGuests((g) => Math.min(16, g + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-xl text-gold transition-colors hover:bg-gold/10"
              >
                +
              </button>
              <span className="text-sm text-gold-light/50">
                {guests >= 16 ? t.reservation.forLarger : t.common.guests}
              </span>
            </div>

            <label className="mt-6 block text-xs uppercase tracking-[0.25em] text-gold-mid">
              {t.reservation.seatingPreference}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {zones.map((z) => (
                <button
                  key={z}
                  onClick={() => {
                    setZone(z);
                    setSelectedTable(null);
                  }}
                  className={`rounded-xl border px-4 py-3 text-sm transition-all ${
                    zone === z
                      ? "border-gold/50 bg-gold/10 text-gold"
                      : "border-gold/15 text-gold-light/60 hover:border-gold/40"
                  }`}
                >
                  {zoneLabel(z)}
                </button>
              ))}
            </div>
          </div>

          {/* --- Floor plan --- */}
          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl text-gold-light">
                {zoneLabel(zone)} · {t.reservation.floorPlan}
              </h3>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-gold-light/60">
                  <span className="h-3 w-3 rounded-full bg-emerald-light" /> {t.reservation.available}
                </span>
                <span className="flex items-center gap-1.5 text-gold-light/60">
                  <span className="h-3 w-3 rounded-full bg-crimson" /> {t.reservation.reserved}
                </span>
              </div>
            </div>

            <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl border border-gold/15 bg-[radial-gradient(circle_at_50%_40%,rgba(250,234,174,0.06),transparent_70%)]">
              <div className="arabesque absolute inset-0 opacity-30" />
              <div className="absolute inset-x-0 top-3 text-center text-[10px] uppercase tracking-[0.3em] text-gold-mid/60">
                {t.reservation.entrance} · {zoneLabel(zone)}
              </div>

              <AnimatePresence mode="popLayout">
                {zoneTables.map((tbl, idx) => {
                  const isSelected = selectedTable?.id === tbl.id;
                  const disabled = tbl.reserved;
                  return (
                    <motion.button
                      key={`${zone}-${tbl.id}`}
                      disabled={disabled}
                      onClick={() => setSelectedTable(tbl)}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={{
                        delay: idx * 0.06,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={disabled ? undefined : { scale: 1.12 }}
                      whileTap={disabled ? undefined : { scale: 0.95 }}
                      style={{ left: `${tbl.x}%`, top: `${tbl.y}%` }}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 ${
                        disabled ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <span
                        className={`flex flex-col items-center justify-center rounded-xl border text-[10px] font-medium transition-colors duration-300 ${
                          tbl.seats >= 8 ? "h-16 w-16" : tbl.seats >= 4 ? "h-14 w-14" : "h-12 w-12"
                        } ${
                          disabled
                            ? "border-crimson/50 bg-crimson/20 text-crimson-light/70"
                            : isSelected
                            ? "border-gold bg-gold/30 text-gold shadow-glow"
                            : "border-emerald-light/50 bg-emerald-brand/15 text-emerald-light hover:border-emerald-light hover:bg-emerald-brand/25"
                        }`}
                      >
                        <span className="font-display text-sm leading-none">
                          {tbl.label.replace(/[^0-9]/g, "") || tbl.label}
                        </span>
                        <span className="mt-0.5 opacity-70">{tbl.seats}p</span>
                      </span>
                      {!disabled && !isSelected && (
                        <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-emerald-light">
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-light/70" />
                        </span>
                      )}
                      {isSelected && (
                        <motion.span
                          layoutId="table-ring"
                          className="absolute -inset-1.5 rounded-2xl border-2 border-gold shadow-glow"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gold/15 bg-ink/40 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gold-light/70">
                {selectedTable ? (
                  <>
                    <span className="text-gold">{selectedTable.label}</span> ·{" "}
                    {selectedTable.seats} {t.common.seats} · {zoneLabel(zone)}
                  </>
                ) : (
                  t.reservation.selectPrompt
                )}
                <div className="mt-1 text-xs text-gold-light/40">
                  {date} · {time} · {guests}{" "}
                  {guests > 1 ? t.common.guests : t.common.guest}
                </div>
              </div>
              <button
                disabled={!canConfirm}
                onClick={() => setStep("summary")}
                className={`btn-luxe shrink-0 ${
                  canConfirm
                    ? "bg-gold-gradient text-ink shadow-glow"
                    : "cursor-not-allowed border border-gold/15 text-gold-light/30"
                }`}
              >
                {t.reservation.review}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay: summary → success */}
      <AnimatePresence>
        {step !== "idle" && selectedTable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-ink-900/92 backdrop-blur-xl"
              onClick={() => setStep("idle")}
            />

            <motion.div
              initial={{ scale: 0.92, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gold/25 bg-ink-800 p-8 text-center shadow-luxe md:p-10"
            >
              <div className="arabesque pointer-events-none absolute inset-0 opacity-25" />

              <AnimatePresence mode="wait">
                {step === "summary" && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] text-gold-mid">
                      {t.reservation.step}
                    </span>
                    <h3 className="mt-3 font-display text-3xl text-gold-light">
                      {t.reservation.reviewTitle}
                    </h3>
                    <p className="mt-2 font-arabic text-crimson-light">
                      {t.reservation.reviewArabic}
                    </p>
                    <p className="mt-3 text-sm text-gold-light/60">
                      {t.reservation.reviewDesc}
                    </p>

                    <div className="mt-6 space-y-2 rounded-2xl border border-gold/15 bg-ink/50 p-5 text-start text-sm">
                      {detailRows.map((r) => (
                        <Row key={r.label} label={r.label} value={r.value} />
                      ))}
                    </div>

                    <button
                      onClick={handleConfirm}
                      className="btn-luxe mt-6 w-full bg-gold-gradient text-ink shadow-glow"
                    >
                      {t.reservation.confirmHold}
                    </button>
                    <button
                      onClick={() => setStep("idle")}
                      className="mt-4 text-xs uppercase tracking-[0.2em] text-gold-light/40 hover:text-gold"
                    >
                      {t.common.edit}
                    </button>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2">
                      {Array.from({ length: 14 }).map((_, i) => {
                        const angle = (i / 14) * Math.PI * 2;
                        return (
                          <motion.span
                            key={i}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{
                              x: Math.cos(angle) * 120,
                              y: Math.sin(angle) * 120,
                              opacity: 0,
                              scale: 0.2,
                            }}
                            transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
                            className="absolute h-1.5 w-1.5 rounded-full bg-gold"
                          />
                        );
                      })}
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14 }}
                      className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-light/50 bg-emerald-brand/20"
                    >
                      <motion.span
                        className="absolute inset-0 rounded-full border-2 border-emerald-light/40"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                      />
                      <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                        <motion.path
                          d="M5 13l4 4L19 7"
                          stroke="#16a018"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.25, ease: "easeInOut" }}
                        />
                      </svg>
                    </motion.div>

                    <h3 className="mt-6 font-display text-3xl text-gold-light">
                      {t.reservation.tableHeld}
                    </h3>
                    <p className="mt-2 font-arabic text-crimson-light">
                      {t.reservation.heldArabic}
                    </p>
                    <p className="mt-3 text-sm text-gold-light/60">
                      {t.reservation.heldDesc}
                    </p>

                    <div className="mt-6 space-y-2 rounded-2xl border border-gold/15 bg-ink/50 p-5 text-start text-sm">
                      {detailRows.map((r) => (
                        <Row key={r.label} label={r.label} value={r.value} />
                      ))}
                    </div>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-luxe mt-6 w-full bg-emerald-brand text-gold-light shadow-[0_0_40px_-10px_rgba(13,115,15,0.8)] hover:bg-emerald-light"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.5-.3z M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1120.2 12 8.2 8.2 0 0112 20.2z" />
                      </svg>
                      {t.reservation.confirmWhatsApp}
                    </a>
                    <button
                      onClick={() => setStep("idle")}
                      className="mt-4 text-xs uppercase tracking-[0.2em] text-gold-light/40 hover:text-gold"
                    >
                      {t.common.done}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gold-mid/70">{label}</span>
      <span className="text-gold-light">{value}</span>
    </div>
  );
}
