import React from "react";
import { TripType } from "../types";
import { formatKwacha } from "../utils/formatters";
import { COST_TABLE } from "../data/costTable";
import { Sun, Moon, Sparkles } from "lucide-react";

interface TripTypeToggleProps {
  activeTripType: TripType;
  onChangeTripType: (type: TripType) => void;
  confirmedHeadcount: number;
}

export const TripTypeToggle: React.FC<TripTypeToggleProps> = ({
  activeTripType,
  onChangeTripType,
  confirmedHeadcount
}) => {
  const is1D1N = activeTripType === "1D1N";

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0B4F6C] font-serif flex items-center gap-2">
            <span>Trip Package Option</span>
            <span className="text-xs px-2 py-0.5 rounded-md font-sans font-semibold bg-amber-100 text-amber-900 border border-amber-300/60">
              Active Selection
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Switching packages instantly recalculates funding goals & per-person target rates.
          </p>
        </div>

        {/* Toggle Pills */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            id="trip-toggle-1d1n-btn"
            type="button"
            onClick={() => onChangeTripType("1D1N")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              is1D1N
                ? "bg-[#0B4F6C] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Sun className={`w-4 h-4 ${is1D1N ? "text-amber-300" : "text-amber-500"}`} />
            <span>1 Day 1 Night</span>
          </button>

          <button
            id="trip-toggle-2d1n-btn"
            type="button"
            onClick={() => onChangeTripType("2D1N")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              !is1D1N
                ? "bg-[#0B4F6C] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Moon className={`w-4 h-4 ${!is1D1N ? "text-amber-300" : "text-indigo-400"}`} />
            <span>2 Days 1 Night</span>
          </button>
        </div>
      </div>

      {/* Package Specs Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        
        {/* 1D1N Card */}
        <div
          onClick={() => onChangeTripType("1D1N")}
          className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
            is1D1N
              ? "border-[#0B4F6C] bg-cyan-50/50 shadow-sm ring-2 ring-[#0B4F6C]/20"
              : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[#0B4F6C] flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              1 Day 1 Night (1D1N)
            </span>
            {is1D1N && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="flex justify-between">
              <span>Min Headcount Goal (15):</span>
              <span className="font-semibold text-slate-900">{formatKwacha(COST_TABLE["1D1N"][15].total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Max Capacity Goal (24):</span>
              <span className="font-semibold text-slate-900">{formatKwacha(COST_TABLE["1D1N"][24].total)}</span>
            </div>
            <div className="flex justify-between text-[#0B4F6C] font-semibold pt-1 border-t border-slate-200/60">
              <span>Per Person Rate @ 15:</span>
              <span>{formatKwacha(COST_TABLE["1D1N"][15].perPerson)}</span>
            </div>
          </div>
        </div>

        {/* 2D1N Card */}
        <div
          onClick={() => onChangeTripType("2D1N")}
          className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
            !is1D1N
              ? "border-[#0B4F6C] bg-amber-50/40 shadow-sm ring-2 ring-[#0B4F6C]/20"
              : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[#0B4F6C] flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              2 Days 1 Night (2D1N)
            </span>
            {!is1D1N && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="flex justify-between">
              <span>Min Headcount Goal (15):</span>
              <span className="font-semibold text-slate-900">{formatKwacha(COST_TABLE["2D1N"][15].total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Max Capacity Goal (24):</span>
              <span className="font-semibold text-slate-900">{formatKwacha(COST_TABLE["2D1N"][24].total)}</span>
            </div>
            <div className="flex justify-between text-[#0B4F6C] font-semibold pt-1 border-t border-slate-200/60">
              <span>Per Person Rate @ 15:</span>
              <span>{formatKwacha(COST_TABLE["2D1N"][15].perPerson)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
