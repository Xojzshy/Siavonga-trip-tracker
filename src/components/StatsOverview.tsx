import React from "react";
import { Attendee, TripType } from "../types";
import { calculateTripMetrics, formatKwacha } from "../utils/formatters";
import { Users, DollarSign, Target, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck, UserCheck, CreditCard } from "lucide-react";

interface StatsOverviewProps {
  attendees: Attendee[];
  activeTripType: TripType;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  attendees,
  activeTripType
}) => {
  const metrics = calculateTripMetrics(attendees, activeTripType);

  const isSurplus = metrics.surplusOrShortfall >= 0;

  return (
    <div className="space-y-4">
      
      {/* Headcount Viability Alert Banner */}
      {!metrics.isViable ? (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Trip Not Yet Viable — Need {metrics.neededForMin} More Confirmation{metrics.neededForMin > 1 ? "s" : ""}
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                A minimum of 15 confirmed attendees is required to launch the Siavonga trip. Currently at {metrics.confirmedHeadcount} confirmed.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-200 text-amber-900 shrink-0">
            {metrics.confirmedHeadcount} / 15 Min Required
          </div>
        </div>
      ) : metrics.isFull ? (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-emerald-950">
                🎉 Maximum Headcount Reached! (24 / 24 Confirmed)
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                The Siavonga trip is fully booked at maximum capacity. No further seats available.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 shrink-0">
            24 / 24 Capacity Cap
          </span>
        </div>
      ) : (
        <div className="bg-emerald-50/80 border-l-4 border-emerald-600 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-emerald-950">
                ✅ Trip Is Viable! ({metrics.confirmedHeadcount} Confirmed)
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                Minimum headcount of 15 met. {metrics.neededForCap} more seat{metrics.neededForCap > 1 ? "s" : ""} open to reach the maximum 24-person cap.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 shrink-0 border border-emerald-300">
            {metrics.neededForCap} Seats Remaining
          </span>
        </div>
      )}

      {/* Main Grid: Headcount & Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Headcount Status */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Confirmed Headcount
              </span>
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#0B4F6C] flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#0B4F6C] font-serif">
                {metrics.confirmedHeadcount}
              </span>
              <span className="text-sm font-semibold text-slate-500">
                / 24 Max
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1 font-medium">
              {metrics.isViable
                ? `${metrics.neededForCap} more needed to hit full cap (${metrics.confirmedHeadcount}/24 confirmed)`
                : `${metrics.neededForMin} more needed for minimum viability (${metrics.confirmedHeadcount}/15 confirmed)`}
            </p>
          </div>

          {/* Mini Headcount Progress Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
              <span>Progress to 24 Cap</span>
              <span>{Math.round((metrics.confirmedHeadcount / 24) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#0B4F6C] h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (metrics.confirmedHeadcount / 24) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Total Funds Raised */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Funds Raised
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C9911D] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif block">
                {formatKwacha(metrics.totalRaised)}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <Target className="w-3.5 h-3.5 text-amber-600" />
              <span>Goal ({metrics.clampedHeadcount} people): </span>
              <span className="font-bold text-slate-800">{formatKwacha(metrics.goalTotal)}</span>
            </div>
          </div>

          {/* Funding Progress Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
              <span>Funding Progress</span>
              <span className="text-[#0B4F6C] font-bold">{metrics.progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0B4F6C] to-[#C9911D] h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, metrics.progressPercentage)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Per-Person Target & Rate */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Per-Person Target
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B4F6C] font-serif block">
                {formatKwacha(metrics.perPersonTarget)}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              {metrics.confirmedHeadcount >= 15
                ? `Based on active headcount cost of ${metrics.confirmedHeadcount} confirmed (${activeTripType}).`
                : `Based on planning baseline of 15 people (${activeTripType}).`}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex justify-between items-center">
            <span>Package Active:</span>
            <span className="font-bold text-[#0B4F6C] bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              {activeTripType === "1D1N" ? "1 Day 1 Night" : "2 Days 1 Night"}
            </span>
          </div>
        </div>

        {/* Card 4: Shortfall / Surplus Status */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Funding Status
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isSurplus ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <span
                className={`text-2xl sm:text-3xl font-extrabold font-serif block ${
                  isSurplus ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {formatKwacha(metrics.surplusOrShortfall)}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1 font-medium">
              {isSurplus
                ? "Surplus raised over active headcount goal"
                : "Shortfall remaining to hit budget goal"}
            </p>
          </div>

          {/* Payment Count Badges */}
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-1 text-center text-[10px]">
            <div className="bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
              <span className="block font-bold text-emerald-800 text-xs">{metrics.fullyPaidCount}</span>
              <span className="text-emerald-700 font-medium">Paid</span>
            </div>
            <div className="bg-amber-50 p-1.5 rounded-lg border border-amber-200">
              <span className="block font-bold text-amber-800 text-xs">{metrics.partiallyPaidCount}</span>
              <span className="text-amber-700 font-medium">Partial</span>
            </div>
            <div className="bg-rose-50 p-1.5 rounded-lg border border-rose-200">
              <span className="block font-bold text-rose-800 text-xs">{metrics.unpaidCount}</span>
              <span className="text-rose-700 font-medium">Unpaid</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
