import React, { useState } from "react";
import { TripType } from "../../types";
import { COST_TABLE } from "../../data/costTable";
import { formatKwacha, getCategoryBreakdown } from "../../utils/formatters";
import {
  Calculator,
  Building2,
  Bus,
  Utensils,
  Anchor,
  ShieldAlert,
  TrendingDown,
  Info,
  Check,
  Sparkles,
  Users
} from "lucide-react";

interface BudgetTabProps {
  activeTripType: TripType;
  selectedGroupSize: number;
  onTripTypeChange: (newType: TripType) => void;
  onGroupSizeChange: (newSize: number) => void;
  confirmedCount: number;
}

export const BudgetTab: React.FC<BudgetTabProps> = ({
  activeTripType,
  selectedGroupSize,
  onTripTypeChange,
  onGroupSizeChange,
  confirmedCount,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<TripType>(activeTripType);

  const breakdown = getCategoryBreakdown(selectedPackage, selectedGroupSize);
  const currentCostTable = COST_TABLE[selectedPackage];
  const headcountKeys = Object.keys(currentCostTable).map(Number).sort((a, b) => a - b);

  const handlePackageSwitch = (pkg: TripType) => {
    setSelectedPackage(pkg);
    onTripTypeChange(pkg);
  };

  const categories = [
    {
      key: "accommodation",
      label: "Accommodation",
      icon: Building2,
      amount: breakdown.accommodation,
      color: "bg-orange-500 text-white",
      badgeClass: "bg-orange-100 text-orange-800 border-orange-200",
      description: "Resort lodge & beach rooms allocation",
      sponsorNote: "Lodge group discount applied",
    },
    {
      key: "transport",
      label: "Transport & Transit",
      icon: Bus,
      amount: breakdown.transport,
      color: "bg-teal-500 text-white",
      badgeClass: "bg-teal-100 text-teal-800 border-teal-200",
      description: selectedPackage === "1D1N" ? "Coaster Bus Hire (1D1N)" : "Coaster Bus Hire (2D1N)",
      sponsorNote: "Fuel & toll fees sponsor-covered!",
    },
    {
      key: "foodCatering",
      label: "Food & Catering",
      icon: Utensils,
      amount: breakdown.foodCatering,
      color: "bg-amber-500 text-white",
      badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
      description: `Meals & refreshments (~${formatKwacha(selectedPackage === "1D1N" ? 290 : 383)}/person)`,
      sponsorNote: "Group BBQ & lakeside dining",
    },
    {
      key: "activities",
      label: "Activities & Cruise",
      icon: Anchor,
      amount: breakdown.activities,
      color: "bg-purple-600 text-white",
      badgeClass: "bg-purple-100 text-purple-800 border-purple-200",
      description: "Sunset Lake Kariba boat cruise & beach access",
      sponsorNote: "Exclusive private cruise charter",
    },
    {
      key: "contingency",
      label: "Contingency Reserve",
      icon: ShieldAlert,
      amount: breakdown.contingency,
      color: "bg-slate-600 text-white",
      badgeClass: "bg-slate-200 text-slate-800 border-slate-300",
      description: "Safety buffer for incidentals & extra snacks",
      sponsorNote: "Unused funds refunded to group",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Unsplash Siavonga Lakeside Resort Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 text-white p-6 sm:p-8">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
          alt="Siavonga Resort Kariba"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#C9911D] text-slate-900">
              <Calculator className="w-3.5 h-3.5" />
              <span>Siavonga Budget & Financial Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-amber-50">
              Category Breakdown & Cost Matrix
            </h2>
            <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
              Real-time cost allocations for accommodation, transport, boat cruise, food, and contingency buffers scaled from 15 to 24 attendees.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-white/20 backdrop-blur-md self-start md:self-auto">
            <button
              id="budget-toggle-1d1n-btn"
              onClick={() => handlePackageSwitch("1D1N")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedPackage === "1D1N"
                  ? "bg-[#C9911D] text-slate-900 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span>1D1N Package</span>
              {selectedPackage === "1D1N" && <Check className="w-4 h-4 text-slate-950" />}
            </button>
            <button
              id="budget-toggle-2d1n-btn"
              onClick={() => handlePackageSwitch("2D1N")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedPackage === "2D1N"
                  ? "bg-[#C9911D] text-slate-900 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span>2D1N Package</span>
              {selectedPackage === "2D1N" && <Check className="w-4 h-4 text-slate-950" />}
            </button>
          </div>
        </div>
      </div>

      {/* Group Size Scaler Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 font-serif flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0B4F6C]" />
            Active Scaling Group Size: <span className="text-[#0B4F6C] font-mono font-black text-base">{selectedGroupSize} People</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Per-person target: <strong className="text-slate-800 font-mono">{formatKwacha(breakdown.total / selectedGroupSize)}</strong> | Total budget: <strong className="text-[#0B4F6C] font-mono">{formatKwacha(breakdown.total)}</strong>
          </p>
        </div>

        {/* Quick Group Size Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((size) => (
            <button
              key={size}
              id={`budget-size-btn-${size}`}
              onClick={() => onGroupSizeChange(size)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedGroupSize === size
                  ? "bg-[#0B4F6C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Category Subtotals Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const sharePercent = Math.round((cat.amount / breakdown.total) * 100);

          return (
            <div key={cat.key} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl ${cat.color} shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${cat.badgeClass}`}>
                    {sharePercent}%
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">{cat.label}</h4>
                  <h3 className="text-xl font-black font-mono text-slate-900 mt-0.5">
                    {formatKwacha(cat.amount)}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{cat.description}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{cat.sponsorNote}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Itemized Budget Categories Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 font-serif text-base">
              Itemized Expense Categories ({selectedPackage} Package)
            </h3>
            <p className="text-xs text-slate-500">
              Allocations calculated for {selectedGroupSize} attendees
            </p>
          </div>
          <span className="text-xs font-mono font-black px-3.5 py-1.5 bg-slate-900 text-amber-300 rounded-xl self-start sm:self-auto">
            Package Budget: {formatKwacha(breakdown.total)}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Description & Sponsor Coverage</th>
                <th className="py-3.5 px-5 text-right">Amount ({selectedGroupSize} Headcount)</th>
                <th className="py-3.5 px-5 text-right">% Budget Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const sharePercent = ((cat.amount / breakdown.total) * 100).toFixed(1);

                return (
                  <tr key={cat.key} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${cat.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-slate-900">{cat.label}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 max-w-md">
                      <p className="font-bold text-slate-800">{cat.description}</p>
                      <p className="text-emerald-700 text-[11px] font-semibold mt-0.5">
                        ✓ {cat.sponsorNote}
                      </p>
                    </td>
                    <td className="py-4 px-5 text-right font-mono font-bold text-slate-900 text-sm">
                      {formatKwacha(cat.amount)}
                    </td>
                    <td className="py-4 px-5 text-right font-mono font-bold text-[#0B4F6C]">
                      {sharePercent}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white font-bold">
                <td colSpan={2} className="py-4 px-5 text-right uppercase tracking-wider text-amber-300">
                  Total Expected Budget ({selectedPackage} @ {selectedGroupSize} Attendees)
                </td>
                <td className="py-4 px-5 text-right font-mono text-amber-300 text-base">
                  {formatKwacha(breakdown.total)}
                </td>
                <td className="py-4 px-5 text-right font-mono text-cyan-200">
                  100.0%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Headcount Cost Scaling Matrix Table (15 to 24) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 font-serif text-base">
                Full Headcount Cost Scaling Matrix (15–24 Attendees)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Auto-selects exact per-person rate and total package budget as actual group size changes ({selectedPackage})
            </p>
          </div>
          <span className="text-xs text-[#0B4F6C] font-extrabold bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
            Confirmed Attendees: {confirmedCount}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-extrabold">
                <th className="py-3 px-4">Group Size</th>
                <th className="py-3 px-4 text-right">Total Package Cost</th>
                <th className="py-3 px-4 text-right">Per-Person Rate</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {headcountKeys.map((hc) => {
                const tier = currentCostTable[hc];
                const isSelectedGroup = hc === selectedGroupSize;
                const isCurrentConfirmed = hc === confirmedCount;

                return (
                  <tr
                    key={hc}
                    className={`hover:bg-slate-50 transition-colors ${
                      isSelectedGroup ? "bg-amber-50/80 font-bold" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-slate-800">
                      <span className="font-extrabold">{hc} Attendees</span>
                      {hc === 15 && " (Min Baseline)"}
                      {hc === 20 && " (Standard Target)"}
                      {hc === 24 && " (Max Cap)"}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-700">
                      {formatKwacha(tier.total)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-[#0B4F6C]">
                      {formatKwacha(tier.perPerson)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isSelectedGroup ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0B4F6C] text-white">
                          Selected Scaler
                        </span>
                      ) : isCurrentConfirmed ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                          Confirmed Headcount
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#0B4F6C] shrink-0 mt-0.5" />
          <span>
            <strong>Note on Transport Sponsor Coverage:</strong> Coaster bus vehicle hire is {formatKwacha(3500)} for 1D1N and {formatKwacha(7000)} for 2D1N. All fuel and toll fees are sponsor-covered for ZVC team members!
          </span>
        </div>
      </div>

    </div>
  );
};
