export interface BudgetItem {
  id: string;
  category: string;
  title: string;
  description: string;
  cost1D1N: number;
  cost2D1N: number;
  iconName: string;
}

export const BUDGET_ITEMS: BudgetItem[] = [
  {
    id: "item-1",
    category: "Accommodation",
    title: "Lakefront Lodge & Chalets",
    description: "Private lakeside lodge stay in Siavonga overlooking Lake Kariba with pool access.",
    cost1D1N: 8500.00,
    cost2D1N: 13000.00,
    iconName: "Home"
  },
  {
    id: "item-2",
    category: "Activities",
    title: "Lake Kariba Sunset Boat Cruise",
    description: "2-hour guided catamaran/pontoon boat cruise with music and sunset views.",
    cost1D1N: 4200.00,
    cost2D1N: 4200.00,
    iconName: "Anchor"
  },
  {
    id: "item-3",
    category: "Transport",
    title: "Coaster Bus Transit & Fuel",
    description: "Roundtrip group bus transit from Lusaka to Siavonga including toll fees and fuel.",
    cost1D1N: 3500.00,
    cost2D1N: 7000.00,
    iconName: "Bus"
  },
  {
    id: "item-4",
    category: "Catering",
    title: "Group Meals & BBQ Refreshments",
    description: "Welcome lunch, poolside braai/BBQ dinner, soft drinks, and breakfast.",
    cost1D1N: 2000.00,
    cost2D1N: 2750.00,
    iconName: "Utensils"
  },
  {
    id: "item-5",
    category: "Buffer",
    title: "Emergency Contingency Reserve",
    description: "Built-in price fluctuation buffer & unforeseen incidentals reserve.",
    cost1D1N: 450.00,
    cost2D1N: 700.00,
    iconName: "ShieldCheck"
  }
];

export interface ItineraryDay {
  dayTitle: string;
  daySubtitle: string;
  activities: {
    time: string;
    title: string;
    description: string;
    location: string;
    category: "transit" | "checkin" | "activity" | "meal" | "leisure";
  }[];
}

export const ITINERARY_1D1N: ItineraryDay[] = [
  {
    dayTitle: "Day 1: Departure & Kariba Sunset Cruise",
    daySubtitle: "October 2, 2026",
    activities: [
      {
        time: "06:30 AM",
        title: "Group Assembly & Bus Loading",
        description: "Meet at designated Lusaka pickup point, verify headcounts, load luggage.",
        location: "Lusaka Central",
        category: "transit"
      },
      {
        time: "07:15 AM",
        title: "Departure to Siavonga",
        description: "Scenic 3.5-hour drive via Kafue and Chirundu hills.",
        location: "Kafue - Chirundu Highway",
        category: "transit"
      },
      {
        time: "11:00 AM",
        title: "Arrival & Lodge Check-in",
        description: "Welcome drinks, room allocation, and poolside relaxation.",
        location: "Siavonga Lakeside Lodge",
        category: "checkin"
      },
      {
        time: "01:00 PM",
        title: "Lakeside Buffet Lunch",
        description: "Fresh Kariba bream lunch and cold beverages by the pool.",
        location: "Lodge Terrace",
        category: "meal"
      },
      {
        time: "04:30 PM",
        title: "Lake Kariba Sunset Boat Cruise",
        description: "Board the catamaran for a 2-hour sunset cruise with DJ music and drinks.",
        location: "Siavonga Harbor / Lake Kariba",
        category: "activity"
      },
      {
        time: "07:30 PM",
        title: "Poolside Braai & Evening Bonfire",
        description: "Traditional Zambian braai dinner, music, games, and lakefront bonfire.",
        location: "Lodge Gardens",
        category: "meal"
      }
    ]
  },
  {
    dayTitle: "Day 2: Morning Kariba Dam Sightseeing & Departure",
    daySubtitle: "October 3, 2026",
    activities: [
      {
        time: "07:30 AM",
        title: "Buffet Breakfast",
        description: "Full hot breakfast overlooking Lake Kariba.",
        location: "Lodge Dining Hall",
        category: "meal"
      },
      {
        time: "09:30 AM",
        title: "Kariba Dam Wall Tour & Photo Stop",
        description: "Guided excursion to the historic Kariba Dam wall border point.",
        location: "Kariba Dam Viewpoint",
        category: "activity"
      },
      {
        time: "11:30 AM",
        title: "Lodge Check-out & Souvenir Shopping",
        description: "Pack up, return keys, and browse local craft markets.",
        location: "Siavonga Town",
        category: "checkin"
      },
      {
        time: "01:00 PM",
        title: "Return Transit to Lusaka",
        description: "Coaster bus trip back to Lusaka.",
        location: "En Route to Lusaka",
        category: "transit"
      },
      {
        time: "04:30 PM",
        title: "Arrival in Lusaka",
        description: "Safe drop-off at Lusaka central point.",
        location: "Lusaka Central",
        category: "transit"
      }
    ]
  }
];

export const ITINERARY_2D1N: ItineraryDay[] = [
  ...ITINERARY_1D1N,
  {
    dayTitle: "Day 3: Extended Lake Leisure & Return",
    daySubtitle: "October 4, 2026",
    activities: [
      {
        time: "08:00 AM",
        title: "Lazy Sunday Breakfast",
        description: "Extended breakfast by the lake shore.",
        location: "Lodge Restaurant",
        category: "meal"
      },
      {
        time: "10:00 AM",
        title: "Morning Water Sports / Fishing Excursion",
        description: "Optional jet skiing, kayaking, or bream fishing on the lake.",
        location: "Lake Kariba Waters",
        category: "activity"
      },
      {
        time: "01:00 PM",
        title: "Farewell Lunch & Check-out",
        description: "Final group meal before loading the bus.",
        location: "Lodge Pool Bar",
        category: "meal"
      },
      {
        time: "02:30 PM",
        title: "Return Journey to Lusaka",
        description: "Relaxing afternoon ride back to Lusaka.",
        location: "En Route to Lusaka",
        category: "transit"
      }
    ]
  }
];
