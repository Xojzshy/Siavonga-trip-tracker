export type TripType = "1D1N" | "2D1N";

export interface Attendee {
  id: string;
  name: string;
  confirmed: boolean;
  amountPaid: number;
  tripType: TripType;
}

export interface TripSettings {
  tripDate: string; // ISO String or "2026-10-02"
  activeTripType: TripType;
  selectedGroupSize: number; // Group size scaling 15 - 24
}

export interface CostTier {
  total: number;
  perPerson: number;
}

export type CostTableData = Record<TripType, Record<number, CostTier>>;

export type PaymentStatus = "fully_paid" | "partially_paid" | "unpaid";

export interface AttendeeWithStatus extends Attendee {
  status: PaymentStatus;
  targetAmount: number;
  balanceDue: number;
}

export type ActiveTab = "overview" | "budget" | "payments" | "comparison" | "guide" | "reports";

export interface CategoryBreakdown {
  accommodation: number;
  transport: number;
  foodCatering: number;
  activities: number;
  contingency: number;
  total: number;
}

