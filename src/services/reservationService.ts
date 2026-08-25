import { tables, type Zone } from "@/data/tables";
import { config } from "@/lib/config";

/**
 * Reservation service layer.
 *
 * The UI only ever imports the four public functions at the bottom of this
 * file — it never knows or cares where the data lives. Storage is provided by
 * a swappable `ReservationProvider`, selected at runtime via
 * `NEXT_PUBLIC_RESERVATION_BACKEND` (see .env.example).
 *
 *   demo     → in-memory store (default, zero config)
 *   supabase → persist to a real database (stub below, ready to implement)
 *
 * To go live, implement `supabaseProvider` and set the env var to `supabase`.
 * No component changes are required.
 */

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------
export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface ReservationInput {
  name?: string;
  phone?: string;
  email?: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:MM
  guests: number;
  zone: Zone;
  tableId: string;
  notes?: string;
}

export interface Reservation extends ReservationInput {
  id: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface AvailabilityQuery {
  date: string;
  time: string;
  zone?: Zone;
  guests?: number;
}

export interface Availability {
  available: string[];
  reserved: string[];
}

export interface ReservationFilter {
  date?: string;
  status?: ReservationStatus;
}

/** The contract every storage backend must satisfy. */
export interface ReservationProvider {
  createReservation(input: ReservationInput): Promise<Reservation>;
  checkAvailability(query: AvailabilityQuery): Promise<Availability>;
  getReservations(filter?: ReservationFilter): Promise<Reservation[]>;
  cancelReservation(id: string): Promise<boolean>;
}

// --------------------------------------------------------------------------
// Shared helpers
// --------------------------------------------------------------------------
function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function makeId(): string {
  return `res_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Compute availability from the seed floor plan + a set of booked table ids. */
function resolveAvailability(
  query: AvailabilityQuery,
  bookedIds: Set<string>
): Availability {
  const pool = query.zone ? tables.filter((t) => t.zone === query.zone) : tables;
  const available: string[] = [];
  const reserved: string[] = [];
  for (const t of pool) {
    const isReserved =
      t.reserved ||
      bookedIds.has(t.id) ||
      (query.guests ? t.seats < query.guests : false);
    (isReserved ? reserved : available).push(t.id);
  }
  return { available, reserved };
}

// --------------------------------------------------------------------------
// Demo provider — in-memory store (default)
// --------------------------------------------------------------------------
function createDemoProvider(): ReservationProvider {
  const store: Reservation[] = [];

  return {
    async createReservation(input) {
      const reservation: Reservation = {
        ...input,
        id: makeId(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      store.push(reservation);
      return delay(reservation);
    },

    async checkAvailability(query) {
      const booked = new Set(
        store
          .filter(
            (r) =>
              r.status !== "cancelled" &&
              r.date === query.date &&
              r.time === query.time
          )
          .map((r) => r.tableId)
      );
      return delay(resolveAvailability(query, booked));
    },

    async getReservations(filter) {
      let result = [...store];
      if (filter?.date) result = result.filter((r) => r.date === filter.date);
      if (filter?.status)
        result = result.filter((r) => r.status === filter.status);
      return delay(result);
    },

    async cancelReservation(id) {
      const r = store.find((x) => x.id === id);
      if (!r) return delay(false);
      r.status = "cancelled";
      return delay(true);
    },
  };
}

// --------------------------------------------------------------------------
// Supabase provider — real database (stub, ready to implement)
// --------------------------------------------------------------------------
function createSupabaseProvider(): ReservationProvider {
  // TODO(backend): install and initialise the client, e.g.
  //   npm install @supabase/supabase-js
  //   import { createClient } from "@supabase/supabase-js";
  //   const supabase = createClient(config.supabase.url, config.supabase.anonKey);
  // The `reservations` table schema lives in supabase/schema.sql.

  const notImplemented = (fn: string) =>
    new Error(
      `reservationService: supabase backend not implemented (${fn}). ` +
        `Implement createSupabaseProvider() or set NEXT_PUBLIC_RESERVATION_BACKEND=demo.`
    );

  return {
    async createReservation() {
      // TODO(backend): map ReservationInput → row and insert:
      //   const { data, error } = await supabase
      //     .from("reservations")
      //     .insert({ customer_name: input.name, phone: input.phone, email: input.email,
      //               date: input.date, time: input.time, guests: input.guests,
      //               table_number: input.tableId, status: "pending" })
      //     .select().single();
      //   if (error) throw error;
      //   return mapRowToReservation(data);
      throw notImplemented("createReservation");
    },

    async checkAvailability() {
      // TODO(backend): query existing rows for the slot, then reuse
      //   resolveAvailability(query, bookedIds) with the DB result.
      throw notImplemented("checkAvailability");
    },

    async getReservations() {
      // TODO(backend): select with optional .eq("date", ...) / .eq("status", ...)
      //   ordered by created_at desc.
      throw notImplemented("getReservations");
    },

    async cancelReservation() {
      // TODO(backend): update status = "cancelled" where id = ...
      throw notImplemented("cancelReservation");
    },
  };
}

// --------------------------------------------------------------------------
// Provider selection + public API
// --------------------------------------------------------------------------
function selectProvider(): ReservationProvider {
  switch (config.reservationBackend) {
    case "supabase":
      return createSupabaseProvider();
    case "demo":
    default:
      return createDemoProvider();
  }
}

// Instantiate once per runtime.
const provider: ReservationProvider = selectProvider();

/** Create a new reservation (status: pending until confirmed by staff). */
export function createReservation(input: ReservationInput): Promise<Reservation> {
  return provider.createReservation(input);
}

/** Return which tables are available / reserved for a given slot. */
export function checkAvailability(query: AvailabilityQuery): Promise<Availability> {
  return provider.checkAvailability(query);
}

/** Retrieve reservations, optionally filtered by date and/or status. */
export function getReservations(filter?: ReservationFilter): Promise<Reservation[]> {
  return provider.getReservations(filter);
}

/** Mark a reservation as cancelled. */
export function cancelReservation(id: string): Promise<boolean> {
  return provider.cancelReservation(id);
}
