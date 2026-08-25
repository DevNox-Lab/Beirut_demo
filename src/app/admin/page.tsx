"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { dishes as seedDishes, type Dish } from "@/data/menu";
import { localize } from "@/i18n/types";

/* ------------------------- Demo data ------------------------- */
type Status = "today" | "upcoming" | "cancelled";

interface Booking {
  id: string;
  name: string;
  guests: number;
  time: string;
  date: string;
  zone: string;
  table: string;
  status: Status;
}

const seedBookings: Booking[] = [
  { id: "b1", name: "Karim Haddad", guests: 4, time: "20:00", date: "Today", zone: "Main Hall", table: "T2", status: "today" },
  { id: "b2", name: "Nadia Fassi", guests: 2, time: "19:30", date: "Today", zone: "Outdoor", table: "T5", status: "today" },
  { id: "b3", name: "Omar Benjelloun", guests: 6, time: "21:00", date: "Today", zone: "Family Area", table: "F1", status: "today" },
  { id: "b4", name: "Sofia Marchetti", guests: 2, time: "20:30", date: "Tomorrow", zone: "Main Hall", table: "T1", status: "upcoming" },
  { id: "b5", name: "Youssef Tazi", guests: 8, time: "19:00", date: "Fri 28", zone: "Private Dining", table: "P1", status: "upcoming" },
  { id: "b6", name: "Leila Saab", guests: 3, time: "13:00", date: "Sat 29", zone: "Outdoor", table: "T4", status: "upcoming" },
  { id: "b7", name: "Rachid Alami", guests: 5, time: "20:00", date: "Yesterday", zone: "Main Hall", table: "T3", status: "cancelled" },
];

const bookingTimes = [
  { time: "12:00", count: 8 },
  { time: "13:00", count: 22 },
  { time: "14:00", count: 15 },
  { time: "18:00", count: 18 },
  { time: "19:00", count: 34 },
  { time: "20:00", count: 48 },
  { time: "21:00", count: 39 },
  { time: "22:00", count: 17 },
];

type Tab = "reservations" | "menu" | "analytics";

const statusMeta: Record<Status, { label: string; color: string }> = {
  today: { label: "Today", color: "text-emerald-light border-emerald-light/40 bg-emerald-brand/15" },
  upcoming: { label: "Upcoming", color: "text-gold border-gold/40 bg-gold/10" },
  cancelled: { label: "Cancelled", color: "text-crimson-light border-crimson/40 bg-crimson/15" },
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("reservations");

  return (
    <div className="flex min-h-screen bg-ink text-gold-light">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-gold/10 bg-ink-900 p-6 lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 font-arabic text-lg text-gold">
            ب
          </span>
          <div>
            <p className="font-display text-lg text-gold-light">Beirut Dishes</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold-mid">Admin Suite</p>
          </div>
        </Link>

        <nav className="mt-10 flex flex-col gap-1">
          {([
            ["reservations", "Reservations", "M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"],
            ["menu", "Menu", "M4 6h16M4 12h16M4 18h10"],
            ["analytics", "Analytics", "M4 20V10M10 20V4M16 20v-8M22 20H2"],
          ] as [Tab, string, string][]).map(([id, label, path]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                tab === id
                  ? "bg-gold/10 text-gold"
                  : "text-gold-light/50 hover:bg-white/5 hover:text-gold-light"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={path} />
              </svg>
              {label}
            </button>
          ))}
        </nav>

        <Link
          href="/"
          className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-light/40 hover:text-gold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to site
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-x-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gold/10 bg-ink/80 px-6 py-4 backdrop-blur-xl md:px-10">
          <div>
            <h1 className="font-display text-2xl text-gold-light md:text-3xl">
              {tab === "reservations" && "Reservation Management"}
              {tab === "menu" && "Menu Management"}
              {tab === "analytics" && "Analytics Overview"}
            </h1>
            <p className="text-xs text-gold-light/40">
              Welcome back, let&apos;s make today exceptional.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* mobile tab switch */}
            <div className="flex rounded-full border border-gold/15 p-1 lg:hidden">
              {(["reservations", "menu", "analytics"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-3 py-1 text-[11px] capitalize ${
                    tab === t ? "bg-gold text-ink" : "text-gold-light/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient font-display font-semibold text-ink">
              BD
            </span>
          </div>
        </header>

        <div className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {tab === "reservations" && <ReservationsPanel />}
              {tab === "menu" && <MenuPanel />}
              {tab === "analytics" && <AnalyticsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ------------------------- Reservations ------------------------- */
/**
 * Simulates loading reservations from the backend so the dashboard exercises
 * real loading / error / empty states.
 *
 * TODO(backend): replace the timeout below with a call to
 *   getReservations(filter) from "@/services/reservationService" and map the
 *   returned Reservation[] into the Booking view-model used by this table.
 */
function fetchBookings(): Promise<Booking[]> {
  return new Promise((resolve) => setTimeout(() => resolve(seedBookings), 650));
}

const filterKeys = ["all", "today", "upcoming", "cancelled"] as const;

function ReservationsPanel() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Status | "all">("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch {
      setError("We couldn't load reservations. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const list = bookings ?? [];
  const counts = {
    today: list.filter((b) => b.status === "today").length,
    upcoming: list.filter((b) => b.status === "upcoming").length,
    cancelled: list.filter((b) => b.status === "cancelled").length,
  };
  const guestsToday = list
    .filter((b) => b.status === "today")
    .reduce((a, b) => a + b.guests, 0);

  const filterCount = (f: (typeof filterKeys)[number]) =>
    f === "all" ? list.length : list.filter((b) => b.status === f).length;

  const shown = filter === "all" ? list : list.filter((b) => b.status === filter);

  const cancel = (id: string) =>
    setBookings((prev) =>
      prev ? prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)) : prev
    );

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Bookings" value={counts.today} accent="emerald" loading={loading} />
        <StatCard label="Upcoming" value={counts.upcoming} accent="gold" loading={loading} />
        <StatCard label="Cancelled" value={counts.cancelled} accent="crimson" loading={loading} />
        <StatCard label="Guests Today" value={guestsToday} accent="gold" loading={loading} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterKeys.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            disabled={loading || !!error}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
              filter === f
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-gold/15 text-gold-light/50 hover:border-gold/40"
            }`}
          >
            {f}
            {!loading && !error && (
              <span className="ml-2 text-gold-light/40">{filterCount(f)}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content: loading / error / empty / table */}
      {loading ? (
        <ReservationsSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : shown.length === 0 ? (
        <EmptyState filter={filter} onReset={() => setFilter("all")} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gold/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.15em] text-gold-mid">
              <tr>
                <th className="px-5 py-4">Guest</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Time</th>
                <th className="hidden px-5 py-4 sm:table-cell">Party</th>
                <th className="hidden px-5 py-4 md:table-cell">Seating</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((b) => (
                <tr key={b.id} className="border-t border-gold/5 transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4 font-medium text-gold-light">{b.name}</td>
                  <td className="px-5 py-4 text-gold-light/60">{b.date}</td>
                  <td className="px-5 py-4 text-gold-light/60">{b.time}</td>
                  <td className="hidden px-5 py-4 text-gold-light/60 sm:table-cell">{b.guests}</td>
                  <td className="hidden px-5 py-4 text-gold-light/60 md:table-cell">
                    {b.zone} · {b.table}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.1em] ${statusMeta[b.status].color}`}>
                      {statusMeta[b.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {b.status !== "cancelled" ? (
                      <button
                        onClick={() => cancel(b.id)}
                        className="text-xs text-crimson-light/80 hover:text-crimson-light"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-xs text-gold-light/30">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------- Reservation states ------------------------- */
function ReservationsSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold/10">
      <div className="flex items-center gap-4 border-b border-gold/5 bg-white/[0.03] px-5 py-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-3 flex-1 animate-pulse rounded bg-gold/10" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 border-t border-gold/5 px-5 py-5">
          {Array.from({ length: 5 }).map((_, c) => (
            <div
              key={c}
              className="h-3 flex-1 animate-pulse rounded bg-gold/5"
              style={{ animationDelay: `${(r * 5 + c) * 60}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  filter,
  onReset,
}: {
  filter: Status | "all";
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gold/20 bg-white/[0.02] px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-gold">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="mt-5 font-display text-2xl text-gold-light">
        No {filter === "all" ? "" : filter} reservations
      </h3>
      <p className="mt-2 max-w-sm text-sm text-gold-light/50">
        {filter === "all"
          ? "New bookings from the website will appear here in real time."
          : `There are no ${filter} reservations right now.`}
      </p>
      {filter !== "all" && (
        <button
          onClick={onReset}
          className="mt-6 rounded-full border border-gold/30 px-5 py-2 text-xs uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold/10"
        >
          View all
        </button>
      )}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-crimson/25 bg-crimson/5 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-crimson/40 bg-crimson/10 text-crimson-light">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 9v4M12 17h.01M10.3 3.9l-8 14A2 2 0 004 21h16a2 2 0 001.7-3.1l-8-14a2 2 0 00-3.4 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="mt-5 font-display text-2xl text-gold-light">Something went wrong</h3>
      <p className="mt-2 max-w-sm text-sm text-gold-light/60">{message}</p>
      <button
        onClick={onRetry}
        className="btn-luxe mt-6 bg-gold-gradient text-ink shadow-glow"
      >
        Try again
      </button>
    </div>
  );
}

/* ------------------------- Menu ------------------------- */
function MenuPanel() {
  const [items, setItems] = useState<Dish[]>(seedDishes.slice(0, 6));
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Lebanese Plates");

  const addDish = () => {
    if (!name || !price) return;
    setItems((prev) => [
      {
        id: `new-${Date.now()}`,
        name,
        arabicName: "طبق جديد",
        category: category as Dish["category"],
        price: Number(price),
        currency: "MAD",
        shortDesc: "Newly added dish.",
        ingredients: [],
        story: "",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      },
      ...prev,
    ]);
    setName("");
    setPrice("");
  };

  const updatePrice = (id: string, val: number) =>
    setItems((prev) => prev.map((d) => (d.id === id ? { ...d, price: val } : d)));

  const remove = (id: string) =>
    setItems((prev) => prev.filter((d) => d.id !== id));

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
      {/* Add dish */}
      <div className="glass h-fit rounded-2xl p-6">
        <h3 className="font-display text-xl text-gold-light">Add a Dish</h3>
        <label className="mt-5 block text-xs uppercase tracking-[0.2em] text-gold-mid">Dish name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Manakish Zaatar"
          className="mt-2 w-full rounded-xl border border-gold/20 bg-ink/60 px-4 py-2.5 text-sm outline-none focus:border-gold/60"
        />
        <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-gold-mid">Price (MAD)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="45"
          className="mt-2 w-full rounded-xl border border-gold/20 bg-ink/60 px-4 py-2.5 text-sm outline-none focus:border-gold/60"
        />
        <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-gold-mid">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 w-full rounded-xl border border-gold/20 bg-ink/60 px-4 py-2.5 text-sm outline-none focus:border-gold/60"
        >
          {["Lebanese Plates", "Small Plates", "Grills", "Desserts", "Drinks"].map((c) => (
            <option key={c} value={c} className="bg-ink">{c}</option>
          ))}
        </select>

        <div className="mt-4 flex items-center justify-center rounded-xl border border-dashed border-gold/25 bg-ink/40 py-6 text-center text-xs text-gold-light/40">
          <div>
            <svg className="mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 16V4M8 8l4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Upload dish image
          </div>
        </div>

        <button
          onClick={addDish}
          className="btn-luxe mt-5 w-full bg-gold-gradient text-ink shadow-glow"
        >
          Add Dish
        </button>
      </div>

      {/* Dish list */}
      <div className="space-y-3">
        {items.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-4 rounded-2xl border border-gold/10 bg-white/[0.02] p-3 pr-5 transition-colors hover:border-gold/30"
          >
            <img src={d.image} alt={localize(d.name, "en")} className="h-16 w-16 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg text-gold-light">{localize(d.name, "en")}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-gold-mid">{d.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={d.price}
                onChange={(e) => updatePrice(d.id, Number(e.target.value))}
                className="w-20 rounded-lg border border-gold/20 bg-ink/60 px-3 py-2 text-sm text-gold-light outline-none focus:border-gold/60"
              />
              <span className="text-xs text-gold-light/40">MAD</span>
            </div>
            <button
              onClick={() => remove(d.id)}
              aria-label="Remove"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-crimson/30 text-crimson-light/70 transition-colors hover:bg-crimson/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------- Analytics ------------------------- */
function AnalyticsPanel() {
  const max = useMemo(() => Math.max(...bookingTimes.map((b) => b.count)), []);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Guests (30d)" value={"2,480"} accent="gold" />
        <StatCard label="Avg. Party Size" value={"3.6"} accent="emerald" />
        <StatCard label="Occupancy Rate" value={"82%"} accent="gold" />
        <StatCard label="Repeat Guests" value={"41%"} accent="crimson" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Popular booking times */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-xl text-gold-light">Popular Booking Times</h3>
          <p className="text-xs text-gold-light/40">Reservations by hour, last 30 days</p>
          <div className="mt-8 flex h-56 items-end justify-between gap-3">
            {bookingTimes.map((b, i) => (
              <div key={b.time} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(b.count / max) * 100}%` }}
                  transition={{ delay: i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-full rounded-t-lg ${
                    b.count === max ? "bg-gold-gradient shadow-glow" : "bg-gold/25"
                  }`}
                />
                <span className="text-[10px] text-gold-light/40">{b.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer count / zone split */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-xl text-gold-light">Seating Demand</h3>
          <p className="text-xs text-gold-light/40">Share of reservations by zone</p>
          <div className="mt-6 space-y-4">
            {[
              { z: "Main Hall", pct: 44, c: "bg-gold-gradient" },
              { z: "Outdoor", pct: 28, c: "bg-emerald-brand" },
              { z: "Family Area", pct: 18, c: "bg-crimson" },
              { z: "Private Dining", pct: 10, c: "bg-gold-mid" },
            ].map((row, i) => (
              <div key={row.z}>
                <div className="flex justify-between text-xs text-gold-light/60">
                  <span>{row.z}</span>
                  <span>{row.pct}%</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gold/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{ delay: i * 0.1, duration: 0.9 }}
                    className={`h-full rounded-full ${row.c}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-gold/15 bg-ink/40 p-4 text-center">
            <p className="font-display text-4xl text-gold-gradient">114</p>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-light/50">
              Google Reviews · 4.3★
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Shared ------------------------- */
function StatCard({
  label,
  value,
  accent,
  loading = false,
}: {
  label: string;
  value: number | string;
  accent: "gold" | "emerald" | "crimson";
  loading?: boolean;
}) {
  const ring =
    accent === "emerald"
      ? "before:bg-emerald-brand/50"
      : accent === "crimson"
      ? "before:bg-crimson/50"
      : "before:bg-gold/50";
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-gold/10 bg-white/[0.02] p-6 before:absolute before:left-0 before:top-0 before:h-full before:w-1 ${ring}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-gold-mid">{label}</p>
      {loading ? (
        <div className="mt-4 h-8 w-16 animate-pulse rounded bg-gold/10" />
      ) : (
        <p className="mt-3 font-display text-4xl text-gold-light">{value}</p>
      )}
    </div>
  );
}
