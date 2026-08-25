import React from "react";
import { COST_TABLE } from "../../data/costTable";
import { formatKwacha, getCategoryBreakdown } from "../../utils/formatters";
import {
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Building2,
  Bus,
  Utensils,
  Anchor,
  ShieldAlert,
  Clock
} from "lucide-react";

interface ComparisonTabProps {
  selectedGroupSize: number;
  onGroupSizeChange: (size: number) => void;
  onSelectPackage: (pkg: "1D1N" | "2D1N") => void;
}

export const ComparisonTab: React.FC<ComparisonTabProps> = ({
  selectedGroupSize,
  onGroupSizeChange,
  onSelectPackage,
}) => {
  const size = Math.max(15, Math.min(24, selectedGroupSize));

  const tier1D1N = COST_TABLE["1D1N"][size];
  const tier2D1N = COST_TABLE["2D1N"][size];

  const breakdown1D1N = getCategoryBreakdown("1D1N", size);
  const breakdown2D1N = getCategoryBreakdown("2D1N", size);

  const perPersonDiff = tier2D1N.perPerson - tier1D1N.perPerson;
  const totalDiff = tier2D1N.total - tier1D1N.total;

  const groupSizes = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  return (
    <div className="space-y-6">
      
      {/* Unsplash Header Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 text-white p-6 sm:p-8">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80"
          alt="Lake Kariba Boat Charter"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#C9911D] text-slate-950">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Package Comparison Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-serif text-amber-50">
            1 Day 1 Night vs. 2 Days 1 Night
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
            Side-by-side rate comparison, category cost deltas, and value analysis across all group sizes (15–24 people).
          </p>
        </div>
      </div>

      {/* Group Size Selector Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 font-serif">
            Select Group Headcount Scaler: <span className="text-[#0B4F6C] font-mono text-base">{size} Attendees</span>
          </h3>
          <p className="text-xs text-slate-500">
            Comparing rate differences for {size} people
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {groupSizes.map((s) => (
            <button
              key={s}
              id={`comp-size-btn-${s}`}
              onClick={() => onGroupSizeChange(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                size === s
                  ? "bg-[#0B4F6C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1D1N Package Card */}
        <div className="bg-white p-6 rounded-3xl border-2 border-cyan-200 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-cyan-100 text-[#0B4F6C] px-4 py-1 text-[11px] font-extrabold rounded-bl-2xl">
            Popular Quick Getaway
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-cyan-700 uppercase tracking-wider">Option A</span>
              <h3 className="text-2xl font-black font-serif text-slate-900">1 Day 1 Night Package</h3>
              <p className="text-xs text-slate-500">Express Kariba trip, departs Saturday morning, returns Sunday afternoon.</p>
            </div>

            <div className="p-4 bg-cyan-50/80 rounded-2xl border border-cyan-200/80 space-y-1">
              <span className="text-xs text-slate-600 font-semibold">Per-Person Rate @ {size} People:</span>
              <div className="text-3xl font-black font-mono text-[#0B4F6C]">
                {formatKwacha(tier1D1N.perPerson)}
              </div>
              <p className="text-[11px] text-slate-500">Total Group Goal: <strong className="text-slate-800 font-mono">{formatKwacha(tier1D1N.total)}</strong></p>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Overnight lodge stay (1 Night)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Coaster transit (Hire {formatKwacha(3500)}, fuel sponsor-covered)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sunset Lake Kariba boat cruise + beach pass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full group BBQ & meal catering</span>
              </div>
            </div>
          </div>

          <button
            id="comp-select-1d1n-btn"
            onClick={() => onSelectPackage("1D1N")}
            className="w-full py-3 rounded-2xl text-xs font-extrabold bg-[#0B4F6C] hover:bg-[#083a50] text-white transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Activate 1D1N Package</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>

        {/* 2D1N Package Card */}
        <div className="bg-white p-6 rounded-3xl border-2 border-amber-300 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#C9911D] text-slate-950 px-4 py-1 text-[11px] font-extrabold rounded-bl-2xl">
            Extended Experience
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">Option B</span>
              <h3 className="text-2xl font-black font-serif text-slate-900">2 Days 1 Night Package</h3>
              <p className="text-xs text-slate-500">Extended 2-day getaway with extra lake time, double transit charter, and additional meals.</p>
            </div>

            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-1">
              <span className="text-xs text-slate-600 font-semibold">Per-Person Rate @ {size} People:</span>
              <div className="text-3xl font-black font-mono text-amber-900">
                {formatKwacha(tier2D1N.perPerson)}
              </div>
              <p className="text-[11px] text-slate-500">Total Group Goal: <strong className="text-slate-800 font-mono">{formatKwacha(tier2D1N.total)}</strong></p>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Extended lodge access & overnight accommodation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full 2-day Coaster transit charter ({formatKwacha(7000)})</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Extended boat cruise & beach volleyball tournament</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2-day complete meal & refreshment catering</span>
              </div>
            </div>
          </div>

          <button
            id="comp-select-2d1n-btn"
            onClick={() => onSelectPackage("2D1N")}
            className="w-full py-3 rounded-2xl text-xs font-extrabold bg-[#C9911D] hover:bg-[#b58017] text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Activate 2D1N Package</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Delta Analysis Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-3xl shadow-sm border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Value Analysis @ {size} Attendees</span>
          </div>
          <h3 className="text-xl font-bold font-serif text-white mt-1">
            2D1N Upgrade Cost Delta: <span className="text-amber-300 font-mono">+{formatKwacha(perPersonDiff)}</span> / person
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Upgrading to 2D1N adds {formatKwacha(totalDiff)} total to the group pool, providing 2 full days of transit, extra meals, and extended resort time.
          </p>
        </div>

        <div className="p-3 bg-white/10 rounded-2xl border border-white/15 text-xs font-mono font-bold text-center shrink-0">
          <p className="text-slate-400 text-[10px] uppercase">Group Budget Delta</p>
          <p className="text-lg text-emerald-300">+{formatKwacha(totalDiff)}</p>
        </div>
      </div>

      {/* Category Cost Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-extrabold text-slate-900 font-serif text-base">
            Category-by-Category Cost Comparison (@ {size} People)
          </h3>
          <p className="text-xs text-slate-500">Side-by-side expense breakdown</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-extrabold uppercase tracking-wider">
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5 text-right">1D1N Package</th>
                <th className="py-3.5 px-5 text-right">2D1N Package</th>
                <th className="py-3.5 px-5 text-right">Difference (2D1N - 1D1N)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              
              <tr className="hover:bg-slate-50/80">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-orange-600" />
                    <span className="font-bold text-slate-900">Accommodation</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown1D1N.accommodation)}</td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown2D1N.accommodation)}</td>
                <td className="py-4 px-5 text-right font-mono font-bold text-amber-700">+{formatKwacha(breakdown2D1N.accommodation - breakdown1D1N.accommodation)}</td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-teal-600" />
                    <span className="font-bold text-slate-900">Transport (Coaster Hire)</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown1D1N.transport)}</td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown2D1N.transport)}</td>
                <td className="py-4 px-5 text-right font-mono font-bold text-amber-700">+{formatKwacha(breakdown2D1N.transport - breakdown1D1N.transport)}</td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-slate-900">Food & Catering</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown1D1N.foodCatering)}</td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown2D1N.foodCatering)}</td>
                <td className="py-4 px-5 text-right font-mono font-bold text-amber-700">+{formatKwacha(breakdown2D1N.foodCatering - breakdown1D1N.foodCatering)}</td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-slate-900">Activities & Boat Cruise</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown1D1N.activities)}</td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown2D1N.activities)}</td>
                <td className="py-4 px-5 text-right font-mono font-bold text-amber-700">+{formatKwacha(breakdown2D1N.activities - breakdown1D1N.activities)}</td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-slate-600" />
                    <span className="font-bold text-slate-900">Contingency Reserve</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown1D1N.contingency)}</td>
                <td className="py-4 px-5 text-right font-mono text-slate-800">{formatKwacha(breakdown2D1N.contingency)}</td>
                <td className="py-4 px-5 text-right font-mono font-bold text-amber-700">+{formatKwacha(breakdown2D1N.contingency - breakdown1D1N.contingency)}</td>
              </tr>

            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white font-bold">
                <td className="py-4 px-5 text-amber-300 uppercase tracking-wider">Total Collection Goal</td>
                <td className="py-4 px-5 text-right font-mono text-[#C9911D] text-sm">{formatKwacha(tier1D1N.total)}</td>
                <td className="py-4 px-5 text-right font-mono text-amber-300 text-sm">{formatKwacha(tier2D1N.total)}</td>
                <td className="py-4 px-5 text-right font-mono text-emerald-300 text-sm">+{formatKwacha(totalDiff)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Full Scaling Matrix Side-by-Side (15-24) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 font-serif text-base">
          Full Per-Person Rate Scaling Comparison (Group Sizes 15 to 24)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-extrabold">
                <th className="py-3 px-4">Group Size</th>
                <th className="py-3 px-4 text-right">1D1N Per Person</th>
                <th className="py-3 px-4 text-right">2D1N Per Person</th>
                <th className="py-3 px-4 text-right">Upgrade Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {groupSizes.map((s) => {
                const p1 = COST_TABLE["1D1N"][s].perPerson;
                const p2 = COST_TABLE["2D1N"][s].perPerson;
                const diff = p2 - p1;
                const isSelected = s === size;

                return (
                  <tr key={s} className={`hover:bg-slate-50 ${isSelected ? "bg-amber-50/80 font-bold" : ""}`}>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {s} Attendees {s === size && "(Active Scaler)"}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[#0B4F6C]">{formatKwacha(p1)}</td>
                    <td className="py-3 px-4 text-right font-mono text-amber-900">{formatKwacha(p2)}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-amber-700">+{formatKwacha(diff)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
