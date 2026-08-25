import { Attendee, CostTableData, TripSettings } from "../types";

export const TRIP_DATE = "2026-10-02T00:00:00+02:00"; // October 2, 2026 (Zambia Time GMT+2)

export const COST_TABLE: CostTableData = {
  "1D1N": {
    15: { total: 19050.00, perPerson: 1270.00 },
    16: { total: 19344.00, perPerson: 1209.00 },
    17: { total: 19941.00, perPerson: 1173.00 },
    18: { total: 20538.00, perPerson: 1141.00 },
    19: { total: 21128.00, perPerson: 1112.00 },
    20: { total: 21725.00, perPerson: 1086.00 },
    21: { total: 22323.00, perPerson: 1063.00 },
    22: { total: 22924.00, perPerson: 1042.00 },
    23: { total: 23506.00, perPerson: 1022.00 },
    24: { total: 24096.00, perPerson: 1004.00 }
  },
  "2D1N": {
    15: { total: 24795.00, perPerson: 1653.00 },
    16: { total: 25280.00, perPerson: 1580.00 },
    17: { total: 26027.00, perPerson: 1531.00 },
    18: { total: 26766.00, perPerson: 1487.00 },
    19: { total: 27531.00, perPerson: 1449.00 },
    20: { total: 28270.00, perPerson: 1414.00 },
    21: { total: 29022.00, perPerson: 1382.00 },
    22: { total: 29766.00, perPerson: 1353.00 },
    23: { total: 30521.00, perPerson: 1327.00 },
    24: { total: 31272.00, perPerson: 1303.00 }
  }
};

export const DEFAULT_TRIP_SETTINGS: TripSettings = {
  tripDate: TRIP_DATE,
  activeTripType: "1D1N",
  selectedGroupSize: 20
};

export const INITIAL_MOCK_ATTENDEES: Attendee[] = [
  { id: "att-1", name: "Josh (Organizer)", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-2", name: "Chipo M.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-3", name: "Kachinga B.", confirmed: true, amountPaid: 600.00, tripType: "1D1N" },
  { id: "att-4", name: "Mwamba K.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-5", name: "Mutale S.", confirmed: true, amountPaid: 0.00, tripType: "1D1N" },
  { id: "att-6", name: "Natasha Z.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-7", name: "Thandiwe P.", confirmed: true, amountPaid: 500.00, tripType: "1D1N" },
  { id: "att-8", name: "Bwalya N.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-9", name: "Kondwani T.", confirmed: false, amountPaid: 0.00, tripType: "1D1N" },
  { id: "att-10", name: "Sepo M.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-11", name: "Tembo G.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-12", name: "Lubasi K.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-13", name: "Mulenga C.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-14", name: "Chisomo M.", confirmed: true, amountPaid: 600.00, tripType: "1D1N" },
  { id: "att-15", name: "Banda F.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-16", name: "Mwiinga L.", confirmed: false, amountPaid: 0.00, tripType: "1D1N" },
  { id: "att-17", name: "Zulu E.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-18", name: "Phiri R.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-19", name: "Lungu W.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" },
  { id: "att-20", name: "Siame J.", confirmed: true, amountPaid: 1086.00, tripType: "1D1N" }
];

