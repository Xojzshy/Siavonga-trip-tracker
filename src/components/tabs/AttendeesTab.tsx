import React from "react";
import { Attendee, TripType } from "../../types";
import { AttendeeRoster } from "../AttendeeRoster";
import { calculateTripMetrics, formatKwacha } from "../../utils/formatters";
import { Users, CheckCircle2, Wallet, Plus, AlertCircle } from "lucide-react";

interface AttendeesTabProps {
  attendees: Attendee[];
  activeTripType: TripType;
  onToggleConfirmed: (id: string) => void;
  onEditAttendee: (attendee: Attendee) => void;
  onDeleteAttendee: (id: string) => void;
  onOpenAddModal: () => void;
  onResetMockData: () => void;
}

export const AttendeesTab: React.FC<AttendeesTabProps> = ({
  attendees,
  activeTripType,
  onToggleConfirmed,
  onEditAttendee,
  onDeleteAttendee,
  onOpenAddModal,
  onResetMockData,
}) => {
  const metrics = calculateTripMetrics(attendees, activeTripType);

  const fullyPaidCount = metrics.attendeesWithStatus.filter(a => a.status === "fully_paid").length;
  const partiallyPaidCount = metrics.attendeesWithStatus.filter(a => a.status === "partially_paid").length;
  const unpaidCount = metrics.attendeesWithStatus.filter(a => a.status === "unpaid").length;

  return (
    <div className="space-y-6">
      
      {/* Top Roster Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Registered</p>
            <h4 className="text-2xl font-bold font-serif text-slate-900 mt-0.5">{attendees.length}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Capacity: Max 24 attendees</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#0B4F6C]/10 text-[#0B4F6C] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Confirmed Status</p>
            <h4 className="text-2xl font-bold font-serif text-emerald-700 mt-0.5">
              {metrics.confirmedHeadcount} <span className="text-xs font-sans text-slate-500 font-normal">/ 15 Min</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {metrics.isViable ? "Minimum viability reached!" : `${metrics.neededForMin} more needed for min goal`}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Funds Collected</p>
            <h4 className="text-xl font-bold font-mono text-emerald-700 mt-0.5">{formatKwacha(metrics.totalRaised)}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Target Rate: {formatKwacha(metrics.perPersonTarget)} / person
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#C9911D]/15 text-[#b58017] flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Tiers</p>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-bold">
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">{fullyPaidCount} Paid</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">{partiallyPaidCount} Part</span>
              <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">{unpaidCount} Unpaid</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Based on active package ({activeTripType})</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-700 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
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
