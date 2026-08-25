import React from "react";
import { Attendee, TripType } from "../../types";
import { Countdown } from "../Countdown";
import { TripTypeToggle } from "../TripTypeToggle";
import { StatsOverview } from "../StatsOverview";
import { TRIP_DATE } from "../../data/costTable";
import { calculateTripMetrics, formatKwacha } from "../../utils/formatters";
import { MapPin, Anchor, Users, ArrowRight, CheckCircle2, Clock } from "lucide-react";

interface DashboardTabProps {
  attendees: Attendee[];
  activeTripType: TripType;
  tripDateStr?: string;
  onTripTypeChange: (newType: TripType) => void;
  onNavigateToAttendees: () => void;
  onNavigateToBudget: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  attendees,
  activeTripType,
  tripDateStr,
  onTripTypeChange,
  onNavigateToAttendees,
  onNavigateToBudget,
}) => {
  const metrics = calculateTripMetrics(attendees, activeTripType);
  const recentAttendees = [...attendees].slice(-4).reverse();

  return (
    <div className="space-y-6">
      
      {/* Destination Location Sub-Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-[#0B4F6C]/10 via-[#C9911D]/10 to-transparent p-4 rounded-2xl border border-[#0B4F6C]/15 gap-2 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#0B4F6C]">
          <MapPin className="w-4 h-4 text-[#C9911D] shrink-0" />
          <span>Destination: Siavonga District, Southern Province, Lake Kariba Zambia</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1">
            <Anchor className="w-3.5 h-3.5 text-cyan-700" />
            Min Capacity: 15
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-bold text-slate-900">
            Max Capacity: 24
          </span>
        </div>
      </div>

      {/* Hero Section: Countdown & Package Option Toggle */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Countdown targetDateStr={tripDateStr || TRIP_DATE} />
        </div>
        <div className="lg:col-span-1">
          <TripTypeToggle
            activeTripType={activeTripType}
            onChangeTripType={onTripTypeChange}
            confirmedHeadcount={metrics.confirmedHeadcount}
          />
        </div>
      </div>

      {/* Dashboard Metrics Overview */}
      <StatsOverview
        attendees={attendees}
        activeTripType={activeTripType}
      />

      {/* Quick Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recent Roster Activity Widget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0B4F6C]/10 text-[#0B4F6C]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm font-serif">Attendee Summary</h3>
                  <p className="text-xs text-slate-500">Live headcount status</p>
                </div>
              </div>
              <button
                id="dashboard-view-roster-btn"
                onClick={onNavigateToAttendees}
                className="text-xs font-semibold text-[#0B4F6C] hover:text-[#083a50] flex items-center gap-1 transition-colors group"
              >
                <span>View Full Roster</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {attendees.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
                <p className="font-semibold text-slate-700">No attendees added yet</p>
                <p className="mt-1">Head to the Attendee Roster tab to start adding trip participants!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentAttendees.map((att) => (
                  <div
                    key={att.id}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${att.confirmed ? "bg-emerald-500" : "bg-amber-500"}`} />
                      <span className="font-semibold text-slate-800">{att.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-slate-200 text-slate-700">
                        {att.tripType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium text-slate-700">
                        {formatKwacha(att.amountPaid)}
                      </span>
                      {att.confirmed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total Registered: <strong className="text-slate-800">{attendees.length}</strong></span>
            <span>Confirmed: <strong className="text-emerald-700">{metrics.confirmedHeadcount}</strong></span>
          </div>
        </div>

        {/* Budget Snapshot & Quick Guide Card */}
        <div className="bg-gradient-to-br from-[#0B4F6C] to-[#08384D] text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between border border-[#C9911D]/30">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                Budget Quick Look
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C9911D] text-slate-900">
                {activeTripType} Active
              </span>
            </div>

            <h3 className="text-xl font-bold font-serif text-amber-50 mb-1">
              {activeTripType === "1D1N" ? "1 Day 1 Night Package" : "2 Days 1 Night Package"}
            </h3>
            <p className="text-xs text-cyan-100/80 mb-4">
              Collection Goal @ 15 Min Baseline: <strong className="text-amber-200 font-mono text-sm ml-1">{formatKwacha(metrics.goalTotal)}</strong>
            </p>

            <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-cyan-100 font-medium">Per-Person Rate @ 15:</span>
                <span className="font-mono font-bold text-amber-200 text-sm">{formatKwacha(metrics.perPersonTarget)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-100 font-medium">Total Funds Collected:</span>
                <span className="font-mono font-bold text-emerald-300 text-sm">{formatKwacha(metrics.totalRaised)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-100 font-medium">Surplus / Shortfall:</span>
                <span className={`font-mono font-bold text-sm ${metrics.surplusOrShortfall < 0 ? "text-amber-300" : "text-emerald-300"}`}>
                  {formatKwacha(metrics.surplusOrShortfall)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-cyan-200/80">Itemized expenses & scaling table</span>
            <button
              id="dashboard-explore-budget-btn"
              onClick={onNavigateToBudget}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#C9911D] hover:bg-[#b58017] text-slate-900 transition-colors flex items-center gap-1"
            >
              <span>Explore Budget Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
