import { Attendee, CostTableData, TripSettings } from "../types";

export const TRIP_DATE = "2026-10-02T00:00:00+02:00"; // October 2, 2026 (Zambia Time GMT+2)

export const COST_TABLE: CostTableData = {
  "1D1N": {
    15: { total: 19500.00, perPerson: 1300.00 },
    16: { total: 21109.00, perPerson: 1319.31 },
    17: { total: 21813.00, perPerson: 1283.12 },
    18: { total: 22517.00, perPerson: 1250.94 },
    19: { total: 23221.00, perPerson: 1222.16 },
    20: { total: 23925.00, perPerson: 1196.25 },
    21: { total: 24629.00, perPerson: 1172.81 },
    22: { total: 25333.00, perPerson: 1151.50 },
    23: { total: 26037.00, perPerson: 1132.04 },
    24: { total: 26741.00, perPerson: 1114.21 }
  },
  "2D1N": {
    15: { total: 25500.00, perPerson: 1700.00 },
    16: { total: 23422.67, perPerson: 1463.92 },
    17: { total: 24295.33, perPerson: 1429.14 },
    18: { total: 25168.00, perPerson: 1398.22 },
    19: { total: 26040.67, perPerson: 1370.56 },
    20: { total: 26913.33, perPerson: 1345.67 },
    21: { total: 27786.00, perPerson: 1323.14 },
    22: { total: 28658.67, perPerson: 1302.67 },
    23: { total: 29531.33, perPerson: 1283.97 },
    24: { total: 30404.00, perPerson: 1266.83 }
  }
};

export const DEFAULT_TRIP_SETTINGS: TripSettings = {
  tripDate: TRIP_DATE,
  activeTripType: "1D1N"
};

export const INITIAL_MOCK_ATTENDEES: Attendee[] = [];
