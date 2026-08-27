import React, { useState } from "react";
import { TripType } from "../../types";
import { ITINERARY_1D1N, ITINERARY_2D1N, ItineraryActivity } from "../../data/budgetItemization";
import {
  Clock,
  MapPin,
  CheckSquare,
  Square,
  Sun,
  ShieldAlert,
  Luggage,
  Calendar,
  Compass
} from "lucide-react";

interface GuideTabProps {
  activeTripType: TripType;
}

const DEFAULT_PACKING_ITEMS = [
  { id: "pack-1", label: "National ID / Passport (for Chirundu border checkpoint)", category: "Documents", checked: false },
  { id: "pack-2", label: "Light summer cotton clothing & shorts", category: "Clothing", checked: true },
  { id: "pack-3", label: "Swimwear / trunks & lake towel", category: "Clothing", checked: true },
  { id: "pack-4", label: "High SPF Sunscreen & UV sunglasses", category: "Essentials", checked: false },
  { id: "pack-5", label: "Wide-brim hat or sun cap", category: "Clothing", checked: false },
  { id: "pack-6", label: "Insect repellent / Peace Full spray", category: "Essentials", checked: false },
  { id: "pack-7", label: "Personal toiletries & sandals / flip-flops", category: "Essentials", checked: false },
  { id: "pack-8", label: "Power bank & smartphone chargers", category: "Tech", checked: false },
  { id: "pack-9", label: "Extra cash (Zambian Kwacha) for personal snacks & souvenirs", category: "Money", checked: false },
  { id: "pack-10", label: "Waterproof pouch for phones during boat cruise", category: "Tech", checked: false },
];

export const GuideTab: React.FC<GuideTabProps> = ({ activeTripType }) => {
  const [itineraryPackage, setItineraryPackage] = useState<TripType>(activeTripType);
  const [packingList, setPackingList] = useState(DEFAULT_PACKING_ITEMS);

  const activeItinerary = itineraryPackage === "1D1N" ? ITINERARY_1D1N : ITINERARY_2D1N;

  const togglePackingItem = (id: string) => {
    setPackingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = packingList.filter((p) => p.checked).length;
  const progressPercent = Math.round((checkedCount / packingList.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B4F6C] via-[#115d7e] to-[#0B4F6C] text-white p-6 rounded-2xl shadow-sm border border-[#C9911D]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#C9911D]" />
            <h2 className="text-xl font-bold font-serif text-amber-50">Siavonga & Lake Kariba Trip Guide</h2>
          </div>
          <p className="text-xs text-cyan-100/80 mt-1 max-w-2xl">
            Trip schedule, packing checklist, and Siavonga travel tips.
          </p>
        </div>

        {/* Itinerary Package Switch */}
        <div className="flex items-center gap-2 bg-slate-900/40 p-1.5 rounded-xl border border-white/20 self-start md:self-auto">
          <button
            id="guide-switch-1d1n-btn"
            onClick={() => setItineraryPackage("1D1N")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              itineraryPackage === "1D1N"
                ? "bg-[#C9911D] text-slate-900 shadow-sm"
                : "text-cyan-100 hover:text-white"
            }`}
          >
            1D1N Schedule
          </button>
          <button
            id="guide-switch-2d1n-btn"
            onClick={() => setItineraryPackage("2D1N")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              itineraryPackage === "2D1N"
                ? "bg-[#C9911D] text-slate-900 shadow-sm"
                : "text-cyan-100 hover:text-white"
            }`}
          >
            2D1N Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Timeline Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0B4F6C]" />
                <h3 className="font-bold text-slate-900 font-serif text-base">
                  Trip Schedule ({itineraryPackage})
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full">
                October 2, 2026 Departure
              </span>
            </div>

            <div className="space-y-8">
              {activeItinerary.map((day, dayIdx) => (
                <div key={dayIdx} className="space-y-3">
                  {/* Day Header */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm font-serif">{day.dayTitle}</h4>
                      <p className="text-xs text-slate-500 font-medium">{day.daySubtitle}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#0B4F6C] px-2 py-0.5 bg-white rounded border border-slate-200">
                      Day {dayIdx + 1}
                    </span>
                  </div>

                  {/* Activity Timeline List */}
                  <div className="relative pl-6 space-y-3 border-l-2 border-[#0B4F6C]/20 ml-2">
                    {day.activities.map((act: ItineraryActivity) => (
                      <div key={act.id} className="relative group">
                        {/* Timeline dot indicator */}
                        <div className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full border-2 bg-white border-[#0B4F6C] group-hover:bg-[#C9911D] transition-all" />

                        {/* Static Activity Card */}
                        <div className="p-3.5 rounded-xl border bg-white border-slate-200/80 shadow-2xs">
                          {/* Card Top Row */}
                          <div className="flex items-center justify-between gap-2 text-xs mb-1">
                            <span className="font-mono font-bold text-[#0B4F6C] flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#C9911D]" />
                              {act.time}
                            </span>

                            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-cyan-700" />
                              {act.location}
                            </span>
                          </div>

                          {/* Card Title & Summary Description */}
                          <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{act.title}</h5>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{act.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Packing Checklist & Travel Tips */}
        <div className="space-y-6">
          
          {/* Packing Checklist Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Luggage className="w-5 h-5 text-[#0B4F6C]" />
                <h3 className="font-bold text-slate-900 text-sm font-serif">Packing Checklist</h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#0B4F6C]">
                {checkedCount}/{packingList.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-[#0B4F6C] to-[#C9911D] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-2 text-xs max-h-[380px] overflow-y-auto pr-1">
              {packingList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => togglePackingItem(item.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    item.checked
                      ? "bg-slate-50 text-slate-400 border-slate-200 line-through"
                      : "bg-white text-slate-800 border-slate-200/80 hover:border-[#0B4F6C]/40 shadow-2xs"
                  }`}
                >
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Siavonga Weather & Travel Advice */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-5 rounded-2xl border border-amber-200 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold font-serif text-sm">
              <Sun className="w-5 h-5 text-amber-600" />
              <span>Siavonga Climate & Travel Advice</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Siavonga experiences warm tropical weather year-round (approx. 28°C - 34°C in October). Keep hydrated, wear sunscreen during beach volleyball and the boat cruise, and ensure phone waterproof pouches are secured!
            </p>
            <div className="pt-2 border-t border-amber-200/60 flex items-center gap-1.5 text-amber-900 font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Carry physical National ID / Passport for Chirundu border post.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
