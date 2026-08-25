export type Zone = "Main Hall" | "Outdoor" | "Family Area" | "Private Dining";

export interface RestaurantTable {
  id: string;
  label: string;
  zone: Zone;
  seats: number;
  reserved: boolean;
  x: number; // percentage position in floor plan
  y: number;
}

export const zones: Zone[] = [
  "Main Hall",
  "Outdoor",
  "Family Area",
  "Private Dining",
];

export const tables: RestaurantTable[] = [
  // Main Hall
  { id: "T1", label: "Table 1", zone: "Main Hall", seats: 2, reserved: false, x: 22, y: 30 },
  { id: "T2", label: "Table 2", zone: "Main Hall", seats: 4, reserved: true, x: 50, y: 26 },
  { id: "T3", label: "Table 3", zone: "Main Hall", seats: 4, reserved: false, x: 78, y: 32 },
  { id: "T7", label: "Table 7", zone: "Main Hall", seats: 6, reserved: false, x: 36, y: 62 },
  { id: "T8", label: "Table 8", zone: "Main Hall", seats: 2, reserved: true, x: 66, y: 66 },
  // Outdoor
  { id: "T4", label: "Table 4", zone: "Outdoor", seats: 2, reserved: false, x: 26, y: 34 },
  { id: "T5", label: "Table 5", zone: "Outdoor", seats: 4, reserved: false, x: 54, y: 40 },
  { id: "T6", label: "Table 6", zone: "Outdoor", seats: 4, reserved: true, x: 76, y: 30 },
  { id: "T9", label: "Table 9", zone: "Outdoor", seats: 6, reserved: false, x: 48, y: 70 },
  // Family Area
  { id: "F1", label: "Booth 1", zone: "Family Area", seats: 6, reserved: false, x: 30, y: 34 },
  { id: "F2", label: "Booth 2", zone: "Family Area", seats: 8, reserved: false, x: 66, y: 36 },
  { id: "F3", label: "Booth 3", zone: "Family Area", seats: 6, reserved: true, x: 50, y: 68 },
  // Private Dining
  { id: "P1", label: "Majlis 1", zone: "Private Dining", seats: 10, reserved: false, x: 34, y: 44 },
  { id: "P2", label: "Majlis 2", zone: "Private Dining", seats: 12, reserved: false, x: 70, y: 48 },
];

export const timeSlots: string[] = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

// The restaurant WhatsApp number in international format (no + or spaces).
export const WHATSAPP_NUMBER = "212669090588";
