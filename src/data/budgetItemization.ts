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

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  category: "transit" | "checkin" | "activity" | "meal" | "leisure";
  expandedDetails: string;
  whereDetail: string;
  whatToBring: string;
}

export interface ItineraryDay {
  dayTitle: string;
  daySubtitle: string;
  activities: ItineraryActivity[];
}

export const ITINERARY_1D1N: ItineraryDay[] = [
  {
    dayTitle: "Day 1: Departure, Beach Volleyball Kickoff & Sunset Cruise",
    daySubtitle: "October 2, 2026",
    activities: [
      {
        id: "act-1d1-1",
        time: "06:30 AM",
        title: "Group Assembly & Bus Loading",
        description: "Meet at designated Lusaka pickup point, verify headcounts, load luggage.",
        location: "Lusaka Central",
        category: "transit",
        expandedDetails: "All travelers gather at the Lusaka Central departure station to complete attendance checks and label personal luggage. The transport team will assist with stowage in the dedicated Coaster bus storage bins before boarding starts promptly. Early arrival ensures we hit the road on schedule and avoid Lusaka morning exit traffic.",
        whereDetail: "Lusaka Central Departure Point, main parking pavilion behind the primary transit terminal",
        whatToBring: "Light jacket/sweater for the early morning breeze, packed water, physical NRC or Passport, and small hand luggage for the bus aisle."
      },
      {
        id: "act-1d1-2",
        time: "07:15 AM",
        title: "Departure to Siavonga",
        description: "Scenic 3.5-hour drive via Kafue and Chirundu hills.",
        location: "Kafue - Chirundu Highway",
        category: "transit",
        expandedDetails: "Enjoy a scenic road trip traveling south through the lush Kafue basin and winding down the iconic Chirundu escarpment. The route offers panoramic views of the Zambezi Valley landscape as we descend toward Lake Kariba. A brief 10-minute stretch stop will be conducted at the Chirundu checkpoint.",
        whereDetail: "T2 Chirundu Highway, passing through Kafue Bridge and the Chirundu Escarpment Lookout",
        whatToBring: "Travel pillow, playlist on phone, snacks, and cash for roadside fruit stalls near Chirundu."
      },
      {
        id: "act-1d1-3",
        time: "11:00 AM",
        title: "Arrival & Lodge Check-in",
        description: "Welcome drinks, room allocation, and poolside relaxation.",
        location: "Siavonga Lakeside Lodge",
        category: "checkin",
        expandedDetails: "Arrive at Siavonga Lakeside Lodge to a refreshing iced baobab welcome drink and warm hospitalities. Room keys and chalet allocations will be distributed by the ZVC executive team while luggage is moved to individual quarters. Take this opportunity to unpack, change into beachwear, or relax by the main swimming pool.",
        whereDetail: "Siavonga Lakeside Lodge, main reception hall & poolside lounge garden",
        whatToBring: "Sunhat, sandals, change of comfortable lakeside clothing, and room key card after handoff."
      },
      {
        id: "act-1d1-4",
        time: "01:00 PM",
        title: "Lakeside Buffet Lunch",
        description: "Fresh Kariba bream lunch and cold beverages by the pool.",
        location: "Lodge Terrace",
        category: "meal",
        expandedDetails: "Indulge in a lavish lakeside lunch buffet featuring freshly grilled Lake Kariba bream, charcoal chicken, traditional nshima, fresh garden salads, and local fruit platters. Enjoy dining under the thatched gazebo with panoramic views of the calm lake waters.",
        whereDetail: "Lodge Open-Air Dining Terrace, lakeside deck tables overlooking the marina",
        whatToBring: "Appetite, sunglasses, and dry clothing if coming directly from the pool."
      },
      {
        id: "act-1d1-5",
        time: "02:00 PM",
        title: "Beach Volleyball Kickoff Match",
        description: "Casual mixed-team beach volleyball to kick off the trip — nets and balls provided by the group, all skill levels welcome. Great warm-up before the sunset cruise.",
        location: "Lodge Beachfront",
        category: "activity",
        expandedDetails: "Kick off the sports schedule with an energetic, fun-filled mixed beach volleyball session right on the lodge's sandy shoreline. Teams will be randomly drafted on the spot to break the ice and warm up everyone's skills. Music, cheer squads, and cold drinks will keep the energy high throughout the 2-hour rally.",
        whereDetail: "Lodge Beachfront Sand Court, directly in front of the lower chalets near the water line",
        whatToBring: "Breathable athletic shorts, athletic top or swimsuit, water bottle, and UV-blocking sunglasses."
      },
      {
        id: "act-1d1-6",
        time: "04:30 PM",
        title: "Lake Kariba Sunset Boat Cruise",
        description: "Board the catamaran for a 2-hour sunset cruise with DJ music and drinks.",
        location: "Siavonga Harbor / Lake Kariba",
        category: "activity",
        expandedDetails: "Board the double-decker pontoon vessel for a memorable 2-hour voyage across the wide waters of Lake Kariba. As the sun dips golden over the Zimbabwean hills on the opposite shore, enjoy onboard DJ sound systems, complimentary soft drinks, and appetizers. Watch for hippos and African fish eagles along the shoreline.",
        whereDetail: "Siavonga Harbor Docking Pier, main pontoon boarding ramp #2",
        whatToBring: "Waterproof phone pouch, camera, light windbreaker jacket for the evening breeze on open water, and motion sickness tablets if needed."
      },
      {
        id: "act-1d1-7",
        time: "07:30 PM",
        title: "Poolside Braai & Evening Bonfire",
        description: "Traditional Zambian braai dinner, music, games, and lakefront bonfire.",
        location: "Lodge Gardens",
        category: "meal",
        expandedDetails: "Gather around the crackling beachside fire pit for a traditional Zambian braai featuring T-bone steak, marinated pork chops, boerewors sausages, garlic rolls, and roasted mealies. The night continues with team trivia, group games, board games, and acoustic tunes under the starry Siavonga sky.",
        whereDetail: "Lodge Central Garden Lawn, bonfire pit and lower poolside bar deck",
        whatToBring: "Insect repellent / Peace Full spray, cozy evening wear, and any personal board games."
      }
    ]
  },
  {
    dayTitle: "Day 2: Morning Kariba Dam Sightseeing, ZVC Tournament & Departure",
    daySubtitle: "October 3, 2026",
    activities: [
      {
        id: "act-1d2-1",
        time: "07:30 AM",
        title: "Buffet Breakfast",
        description: "Full hot breakfast overlooking Lake Kariba.",
        location: "Lodge Dining Hall",
        category: "meal",
        expandedDetails: "Start your morning with a nutritious buffet spread including made-to-order eggs, sausages, baked beans, toasted artisan loaves, fresh tropical fruit, hot Zambian coffee, and chilled juices while watching the morning mist rise over Lake Kariba.",
        whereDetail: "Lodge Dining Hall, indoor buffet station & upper sun balcony",
        whatToBring: "Sunglasses, morning appetite, and comfortable morning wear."
      },
      {
        id: "act-1d2-2",
        time: "09:00 AM",
        title: "Kariba Dam Wall Tour & Photo Stop",
        description: "Guided excursion to the historic Kariba Dam wall border point.",
        location: "Kariba Dam Viewpoint",
        category: "activity",
        expandedDetails: "Take a short group bus ride to the world-famous Kariba Dam Wall, one of the engineering marvels of Africa. Our local guide will explain the history of Operation Noah and the dam construction while we walk up to the border vantage point for incredible photo opportunities over the Zambezi gorge.",
        whereDetail: "Kariba Dam Wall Observation Deck, North Bank immigration lookout station",
        whatToBring: "Valid NRC or Passport (required for border security clearance), camera/phone, walking shoes, and sun visor."
      },
      {
        id: "act-1d2-3",
        time: "10:30 AM",
        title: "ZVC Tournament Session",
        description: "Bracket-style mini tournament between trip squads — the main volleyball block of the trip. Bragging rights on the line before checkout.",
        location: "Lodge Beachfront / Lawn Court",
        category: "activity",
        expandedDetails: "The competitive pinnacle of the weekend! Seeded squad teams fight through a fast-paced bracket tournament on the beachfront court. Complete with refereeing, scoreboards, commentary, and official ZVC bragging rights. Medals and prizes awarded at the end.",
        whereDetail: "Lodge Beachfront Court & adjacent spectator shade pavilion",
        whatToBring: "Volleyball footwear or barefoot sand play, knee pads if desired, squad jersey/colors, hydration bottle, and high-energy spirit."
      },
      {
        id: "act-1d2-4",
        time: "12:30 PM",
        title: "Lodge Check-out & Souvenir Shopping",
        description: "Pack up, return keys, and browse local craft markets.",
        location: "Siavonga Town",
        category: "checkin",
        expandedDetails: "Return room keys to reception and settle any personal extras before loading bags onto the Coaster bus. Afterwards, the bus makes a stop at the Siavonga craft stalls where you can buy hand-carved wooden hippos, Zambian chitenge fabrics, and lake stone souvenirs from local artisans.",
        whereDetail: "Lodge Reception Desk & Siavonga Central Craft Market on Dam Road",
        whatToBring: "Packed luggage, room key, and Zambian Kwacha cash for local souvenir vendor purchases."
      },
      {
        id: "act-1d2-5",
        time: "01:30 PM",
        title: "Return Transit to Lusaka",
        description: "Coaster bus trip back to Lusaka.",
        location: "En Route to Lusaka",
        category: "transit",
        expandedDetails: "Board the air-conditioned Coaster bus for our comfortable return trip to Lusaka. Relax, share photos from the tournament, and enjoy music during the scenic afternoon ascent up the Chirundu escarpment back into Lusaka Province.",
        whereDetail: "Coaster Bus, T2 Chirundu-Lusaka Main Highway",
        whatToBring: "Headphones, loaded power bank, snacks, and water for the journey."
      },
      {
        id: "act-1d2-6",
        time: "05:00 PM",
        title: "Arrival in Lusaka",
        description: "Safe drop-off at Lusaka central point.",
        location: "Lusaka Central",
        category: "transit",
        expandedDetails: "Arrive back at the central Lusaka drop-off location. Luggage offloading will be assisted by the transport crew. Safe onward travel home with wonderful memories, new friends, and ZVC tournament trophies!",
        whereDetail: "Lusaka Central Station, main arrival parking concourse",
        whatToBring: "All personal belongings, luggage tag check, and farewell hugs for the ZVC crew!"
      }
    ]
  }
];

export const ITINERARY_2D1N: ItineraryDay[] = [
  {
    dayTitle: "Day 1: Departure, Beach Volleyball Kickoff & Sunset Cruise",
    daySubtitle: "October 2, 2026",
    activities: [ ...ITINERARY_1D1N[0].activities ]
  },
  {
    dayTitle: "Day 2: Morning Kariba Dam Sightseeing, ZVC Tournament & Departure",
    daySubtitle: "October 3, 2026",
    activities: [ ...ITINERARY_1D1N[1].activities ]
  }
];
