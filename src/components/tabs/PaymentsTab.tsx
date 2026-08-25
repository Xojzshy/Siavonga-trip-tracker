import React from "react";
import { Attendee, TripType } from "../../types";
import { AttendeeRoster } from "../AttendeeRoster";
import { calculateTripMetrics, formatKwacha } from "../../utils/formatters";
import { Users, CheckCircle2, Wallet, AlertCircle, ShieldAlert } from "lucide-react";

interface PaymentsTabProps {
  attendees: Attendee[];
  activeTripType: TripType;
  selectedGroupSize: number;
  onToggleConfirmed: (id: string) => void;
  onEditAttendee: (attendee: Attendee) => void;
  onDeleteAttendee: (id: string) => void;
  onOpenAddModal: () => void;
  onResetMockData: () => void;
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({
  attendees,
  activeTripType,
  selectedGroupSize,
  onToggleConfirmed,
  onEditAttendee,
  onDeleteAttendee,
  onOpenAddModal,
  onResetMockData,
}) => {
  const metrics = calculateTripMetrics(attendees, activeTripType, selectedGroupSize);

  const fullyPaidCount = metrics.attendeesWithStatus.filter((a) => a.status === "fully_paid").length;
  const partiallyPaidCount = metrics.attendeesWithStatus.filter((a) => a.status === "partially_paid").length;
  const unpaidCount = metrics.attendeesWithStatus.filter((a) => a.status === "unpaid").length;

  const totalOutstanding = Math.max(0, metrics.goalTotal - metrics.totalRaised);

  return (
    <div className="space-y-6">
      
      {/* Unsplash Volleyball Team Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 text-white p-6 sm:p-8">
        <img
          src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1600&q=80"
          alt="ZVC Volleyball Team"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#C9911D] text-slate-950">
            <Wallet className="w-3.5 h-3.5" />
            <span>ZVC Payment & Collections Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-amber-50">
            Who's Paid & Who Owes Status
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
            Real-time individual payment records, balance due alerts, status badges, and roster entry manager for Siavonga 2026.
          </p>
        </div>
      </div>

      {/* Top Roster & Payment Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Registered</p>
            <h4 className="text-2xl font-black font-mono text-slate-900 mt-1">{attendees.length}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Capacity target: {metrics.targetGroupSize} people</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#0B4F6C]/10 text-[#0B4F6C] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Confirmed Status</p>
            <h4 className="text-2xl font-black font-mono text-emerald-700 mt-1">
              {metrics.confirmedHeadcount} <span className="text-xs font-sans text-slate-500 font-normal">/ 15 Min</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {metrics.isViable ? "Min 15 goal met!" : `${metrics.neededForMin} more needed`}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Funds Raised</p>
            <h4 className="text-xl font-black font-mono text-emerald-700 mt-1">{formatKwacha(metrics.totalRaised)}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Target rate: {formatKwacha(metrics.perPersonTarget)} / person
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Payment Breakdown</p>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-extrabold">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{fullyPaidCount} Paid</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">{partiallyPaidCount} Part</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">{unpaidCount} Unpaid</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Outstanding: <strong className="text-rose-700 font-mono">{formatKwacha(totalOutstanding)}</strong></p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Roster Table Component */}
      <AttendeeRoster
        attendees={attendees}
        activeTripType={activeTripType}
        onToggleConfirmed={onToggleConfirmed}
        onEditAttendee={onEditAttendee}
        onDeleteAttendee={onDeleteAttendee}
        onOpenAddModal={onOpenAddModal}
        onResetMockData={onResetMockData}
      />

    </div>
  );
};
