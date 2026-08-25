import React from "react";
import { motion } from "motion/react";
import { Attendee, TripType } from "../../types";
import { Countdown } from "../Countdown";
import { TRIP_DATE } from "../../data/costTable";
import { calculateTripMetrics, formatKwacha } from "../../utils/formatters";
import {
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building2,
  Bus,
  Utensils,
  Anchor,
  ShieldAlert,
  Sparkles,
  Zap,
  TrendingUp,
  DollarSign
} from "lucide-react";

interface OverviewTabProps {
  attendees: Attendee[];
  activeTripType: TripType;
  selectedGroupSize: number;
  tripDateStr?: string;
  onTripTypeChange: (newType: TripType) => void;
  onGroupSizeChange: (newSize: number) => void;
  onNavigateToPayments: () => void;
  onNavigateToBudget: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  attendees,
  activeTripType,
  selectedGroupSize,
  tripDateStr,
  onTripTypeChange,
  onGroupSizeChange,
  onNavigateToPayments,
  onNavigateToBudget,
}) => {
  const metrics = calculateTripMetrics(attendees, activeTripType, selectedGroupSize);
  const { categoryBreakdown } = metrics;

  const recentAttendees = [...attendees].slice(-5).reverse();

  // Category definitions with bold distinct colors as requested in UPDATE 3
  const categoryCards = [
    {
      id: "accommodation",
      label: "Accommodation",
      amount: categoryBreakdown.accommodation,
      colorClass: "from-orange-500 to-amber-600",
      bgLight: "bg-orange-50/80 border-orange-200/80",
      textDark: "text-orange-950",
      accentText: "text-orange-700",
      progressBar: "bg-orange-500",
      icon: Building2,
      note: "Lodge & beach resort block",
    },
    {
      id: "transport",
      label: "Transport & Transit",
      amount: categoryBreakdown.transport,
      colorClass: "from-teal-500 to-emerald-600",
      bgLight: "bg-teal-50/80 border-teal-200/80",
      textDark: "text-teal-950",
      accentText: "text-teal-700",
      progressBar: "bg-teal-500",
      icon: Bus,
      note: "Coaster hire (Fuel sponsor-covered)",
    },
    {
      id: "foodCatering",
      label: "Food & Catering",
      amount: categoryBreakdown.foodCatering,
      colorClass: "from-amber-500 to-yellow-600",
      bgLight: "bg-amber-50/80 border-amber-200/80",
      textDark: "text-amber-950",
      accentText: "text-amber-700",
      progressBar: "bg-amber-500",
      icon: Utensils,
      note: "Group BBQ & meals catering",
    },
    {
      id: "activities",
      label: "Activities & Cruise",
      amount: categoryBreakdown.activities,
      colorClass: "from-purple-600 to-indigo-600",
      bgLight: "bg-purple-50/80 border-purple-200/80",
      textDark: "text-purple-950",
      accentText: "text-purple-700",
      progressBar: "bg-purple-600",
      icon: Anchor,
      note: "Sunset boat cruise + beach pass",
    },
    {
      id: "contingency",
      label: "Contingency Buffer",
      amount: categoryBreakdown.contingency,
      colorClass: "from-slate-600 to-slate-700",
      bgLight: "bg-slate-100/90 border-slate-300/80",
      textDark: "text-slate-900",
      accentText: "text-slate-700",
      progressBar: "bg-slate-600",
      icon: ShieldAlert,
      note: "Emergency reserve & incidentals",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Lake Kariba Unsplash Banner & Headline */}
      <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 text-white">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
          alt="Lake Kariba Siavonga Sunset"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 p-6 sm:p-8 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#C9911D] text-slate-950 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ZVC Zambia Volleyball Collective • Siavonga Trip</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-amber-50 tracking-tight leading-tight">
              Siavonga Getaway 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Dynamic group budget tracker auto-scaling by headcount (15–24 people). Track live collections, per-person rates, and category allocations for Lake Kariba.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-cyan-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                <MapPin className="w-4 h-4 text-amber-400" />
                Lake Kariba, Siavonga
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                <Users className="w-4 h-4 text-teal-400" />
                Headcount: {metrics.confirmedHeadcount} Confirmed ({metrics.targetGroupSize} Target Size)
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Countdown targetDateStr={tripDateStr || TRIP_DATE} />
          </div>
        </div>
      </div>

      {/* Main Interactive Controls: Package Selector & Group Size Slider */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Package Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#C9911D]" />
              <span>Select Trip Package Option</span>
            </label>
            <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 max-w-md">
              <button
                id="overview-pkg-1d1n-btn"
                onClick={() => onTripTypeChange("1D1N")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTripType === "1D1N"
                    ? "bg-[#0B4F6C] text-white shadow-sm ring-1 ring-[#0B4F6C]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>1 Day 1 Night (1D1N)</span>
                {activeTripType === "1D1N" && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
              <button
                id="overview-pkg-2d1n-btn"
                onClick={() => onTripTypeChange("2D1N")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTripType === "2D1N"
                    ? "bg-[#0B4F6C] text-white shadow-sm ring-1 ring-[#0B4F6C]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>2 Days 1 Night (2D1N)</span>
                {activeTripType === "2D1N" && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            </div>
          </div>

          {/* Prominent Per-Person Rate Badge */}
          <div className="bg-gradient-to-br from-[#0B4F6C] to-[#0d5d7f] text-white p-4 sm:p-5 rounded-2xl shadow-sm border border-[#C9911D]/30 flex items-center justify-between gap-6 shrink-0">
            <div>
              <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                Per-Person Rate ({activeTripType})
              </p>
              <h3 className="text-2xl sm:text-3xl font-black font-mono text-white mt-0.5">
                {formatKwacha(metrics.perPersonTarget)}
              </h3>
              <p className="text-[11px] text-cyan-100/90 mt-0.5">
                Calculated for group size of <strong>{metrics.targetGroupSize} people</strong>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 font-bold shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Group Size Scaling Selector (15 to 24) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 font-serif flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0B4F6C]" />
                Group Size Budget Scaler (15 to 24 People)
              </h4>
              <p className="text-xs text-slate-500">
                Adjust headcount to dynamically update the required per-person contribution and category allocations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="overview-sync-headcount-btn"
                onClick={() => onGroupSizeChange(metrics.confirmedHeadcount || 20)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors flex items-center gap-1.5"
                title="Set group size equal to current confirmed attendee count"
              >
                <Users className="w-3.5 h-3.5 text-[#0B4F6C]" />
                <span>Sync Confirmed ({metrics.confirmedHeadcount})</span>
              </button>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">Min Capacity: 15 People</span>
              <span className="text-lg font-black text-[#0B4F6C] font-mono px-3 py-1 bg-white rounded-xl border border-slate-300 shadow-2xs">
                {selectedGroupSize} Attendees Selected
              </span>
              <span className="text-slate-500">Max Capacity: 24 People</span>
            </div>

            <input
              type="range"
              min={15}
              max={24}
              step={1}
              value={selectedGroupSize}
              onChange={(e) => onGroupSizeChange(parseInt(e.target.value, 10))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B4F6C]"
            />

            {/* Quick Pill Buttons 15-24 */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-2">
              {[15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((size) => (
                <button
                  key={size}
                  id={`group-size-pill-${size}`}
                  onClick={() => onGroupSizeChange(size)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedGroupSize === size
                      ? "bg-[#0B4F6C] text-white shadow-xs ring-1 ring-[#0B4F6C]"
                      : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Top Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Funds Collected */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Total Collected</p>
            <h3 className="text-2xl font-black font-mono text-emerald-700 mt-1">
              {formatKwacha(metrics.totalRaised)}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              From {metrics.confirmedHeadcount} confirmed attendees
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Total Budget Target */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Target Expected Budget</p>
            <h3 className="text-2xl font-black font-mono text-[#0B4F6C] mt-1">
              {formatKwacha(metrics.goalTotal)}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {metrics.targetGroupSize} people × {formatKwacha(metrics.perPersonTarget)}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#0B4F6C] border border-cyan-200 flex items-center justify-center font-bold shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Shortfall / Surplus */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {metrics.surplusOrShortfall >= 0 ? "Current Surplus" : "Current Shortfall"}
            </p>
            <h3 className={`text-2xl font-black font-mono mt-1 ${
              metrics.surplusOrShortfall >= 0 ? "text-emerald-700" : "text-amber-700"
            }`}>
              {formatKwacha(metrics.surplusOrShortfall)}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {metrics.surplusOrShortfall >= 0 ? "Funding cap exceeded!" : "Outstanding balance to collect"}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 border ${
            metrics.surplusOrShortfall >= 0
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Running Total vs Budget Cap Gauge / Progress Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold font-serif text-slate-900">
              Live Funding Progress vs. Target Budget
            </h3>
            <p className="text-xs text-slate-500">
              Running total collected compared against the overall {metrics.targetGroupSize}-person {activeTripType} budget cap.
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold font-mono shrink-0 border ${
            metrics.progressPercentage >= 100
              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
              : "bg-amber-100 text-amber-900 border-amber-300"
          }`}>
            {metrics.progressPercentage}% Funded
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2">
          <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, metrics.progressPercentage)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full transition-all ${
                metrics.progressPercentage >= 100
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                  : "bg-gradient-to-r from-[#0B4F6C] via-[#C9911D] to-amber-500"
              }`}
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-600">
            <span>Collected: {formatKwacha(metrics.totalRaised)}</span>
            <span>Target: {formatKwacha(metrics.goalTotal)}</span>
          </div>
        </div>
      </div>

      {/* Category Subtotals Section with Vibrant Distinct Colors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black font-serif text-slate-900">
              Category Cost Breakdown & Allocations
            </h3>
            <p className="text-xs text-slate-500">
              Itemized budget subtotals auto-calculated for {metrics.targetGroupSize} people ({activeTripType})
            </p>
          </div>
          <button
            id="overview-full-budget-link"
            onClick={onNavigateToBudget}
            className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1"
          >
            <span>View Full Detail Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            const categorySharePercent = Math.round((cat.amount / metrics.goalTotal) * 100);
            
            return (
              <div
                key={cat.id}
                className={`p-4 rounded-2xl border ${cat.bgLight} shadow-2xs flex flex-col justify-between space-y-3 transition-all hover:scale-[1.01]`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${cat.colorClass} text-white shadow-xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-extrabold font-mono px-2 py-0.5 rounded-full ${cat.bgLight} ${cat.accentText} border border-current`}>
                      {categorySharePercent}% of total
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-xs font-extrabold ${cat.textDark}`}>{cat.label}</h4>
                    <p className={`text-lg font-black font-mono ${cat.accentText} mt-0.5`}>
                      {formatKwacha(cat.amount)}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{cat.note}</p>
                  </div>
                </div>

                {/* Category Mini Progress Bar */}
                <div className="space-y-1 pt-2 border-t border-slate-200/60">
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, metrics.progressPercentage)}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-full rounded-full ${cat.progressBar}`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>Target</span>
                    <span className="font-bold">{formatKwacha(cat.amount)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Roster & Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Payment Tracker Quick Snapshot */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#0B4F6C]/10 text-[#0B4F6C]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm font-serif">Recent Payment Activity</h3>
                  <p className="text-xs text-slate-500">Who's paid / who owes status</p>
                </div>
              </div>

              <button
                id="overview-[#0B4F6C]-view-payments-btn"
                onClick={onNavigateToPayments}
                className="text-xs font-bold text-[#0B4F6C] hover:text-[#083a50] flex items-center gap-1 transition-colors group"
              >
                <span>Open Payment Tracker</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="space-y-2.5">
              {recentAttendees.map((att) => {
                const status =
                  att.amountPaid >= metrics.perPersonTarget
                    ? "fully_paid"
                    : att.amountPaid > 0
                    ? "partially_paid"
                    : "unpaid";

                return (
                  <div
                    key={att.id}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/60 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        status === "fully_paid"
                          ? "bg-emerald-500"
                          : status === "partially_paid"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`} />
                      <span className="font-bold text-slate-800">{att.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-700">
                        {formatKwacha(att.amountPaid)}
                      </span>
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase ${
                        status === "fully_paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : status === "partially_paid"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}>
                        {status === "fully_paid" ? "Paid" : status === "partially_paid" ? "Partial" : "Unpaid"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Fully Paid: <strong className="text-emerald-700">{metrics.fullyPaidCount}</strong></span>
            <span>Partial: <strong className="text-amber-700">{metrics.partiallyPaidCount}</strong></span>
            <span>Unpaid: <strong className="text-rose-700">{metrics.unpaidCount}</strong></span>
          </div>
        </div>

        {/* Quick Highlights Card */}
        <div className="bg-gradient-to-br from-[#0B4F6C] to-[#08384D] text-white p-6 rounded-3xl shadow-sm border border-[#C9911D]/30 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
              Trip Essentials Summary
            </span>
            <h3 className="text-xl font-bold font-serif text-amber-50">
              Lake Kariba, Siavonga
            </h3>
            <p className="text-xs text-cyan-100/80 leading-relaxed">
              ZVC group getaway featuring sunset boat cruise, lakeside beach volleyball, catered meals, and Coaster bus transport.
            </p>

            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-cyan-100">Bus Hire & Transit:</span>
                <span className="font-bold text-teal-300">
                  {formatKwacha(categoryBreakdown.transport)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-100">Accommodation:</span>
                <span className="font-bold text-orange-300">
                  {formatKwacha(categoryBreakdown.accommodation)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-100">Food & Catering:</span>
                <span className="font-bold text-amber-200">
                  {formatKwacha(categoryBreakdown.foodCatering)}
                </span>
              </div>
            </div>
          </div>

          <button
            id="overview-open-budget-btn"
            onClick={onNavigateToBudget}
            className="w-full mt-4 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#C9911D] hover:bg-[#b58017] text-slate-900 transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Budget Breakdown</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
