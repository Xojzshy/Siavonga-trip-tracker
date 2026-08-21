import React, { useState, useMemo } from "react";
import { Attendee, TripType } from "../types";
import { calculateTripMetrics, formatKwacha } from "../utils/formatters";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  UserPlus,
  RotateCcw,
  CreditCard,
  ArrowUpDown,
  Sparkles
} from "lucide-react";

interface AttendeeRosterProps {
  attendees: Attendee[];
  activeTripType: TripType;
  onToggleConfirmed: (id: string) => void;
  onEditAttendee: (attendee: Attendee) => void;
  onDeleteAttendee: (id: string) => void;
  onOpenAddModal: () => void;
  onResetMockData: () => void;
}

export const AttendeeRoster: React.FC<AttendeeRosterProps> = ({
  attendees,
  activeTripType,
  onToggleConfirmed,
  onEditAttendee,
  onDeleteAttendee,
  onOpenAddModal,
  onResetMockData
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterConfirmed, setFilterConfirmed] = useState<"all" | "confirmed" | "unconfirmed">("all");
  const [filterPayment, setFilterPayment] = useState<"all" | "fully_paid" | "partially_paid" | "unpaid">("all");
  const [filterType, setFilterType] = useState<"all" | "1D1N" | "2D1N">("all");
  const [sortField, setSortField] = useState<"name" | "amountPaid" | "confirmed">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const metrics = calculateTripMetrics(attendees, activeTripType);

  // Filter & Sort attendees
  const filteredAttendees = useMemo(() => {
    return metrics.attendeesWithStatus
      .filter((att) => {
        // Search term
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          if (!att.name.toLowerCase().includes(term)) return false;
        }
        // Confirmed filter
        if (filterConfirmed === "confirmed" && !att.confirmed) return false;
        if (filterConfirmed === "unconfirmed" && att.confirmed) return false;

        // Payment status filter
        if (filterPayment !== "all" && att.status !== filterPayment) return false;

        // Trip Type filter
        if (filterType !== "all" && att.tripType !== filterType) return false;

        return true;
      })
      .sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [
    metrics.attendeesWithStatus,
    searchTerm,
    filterConfirmed,
    filterPayment,
    filterType,
    sortField,
    sortDirection
  ]);

  const toggleSort = (field: "name" | "amountPaid" | "confirmed") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
      
      {/* Table Header & Controls */}
      <div className="p-5 border-b border-slate-200/80 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold font-serif text-[#0B4F6C]">
              Attendee Roster ({attendees.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage trip confirmations, payment balances, and individual package selections.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="roster-reset-data-btn"
              onClick={onResetMockData}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Reset to default mock attendee dataset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              id="roster-add-attendee-btn"
              onClick={onOpenAddModal}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0B4F6C] hover:bg-[#083a50] rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4 text-amber-300" />
              <span>Add Attendee</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              id="roster-search-input"
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C] text-slate-800 text-xs font-medium"
            />
          </div>

          {/* Confirmed Filter */}
          <div>
            <select
              id="roster-filter-confirmed-select"
              value={filterConfirmed}
              onChange={(e: any) => setFilterConfirmed(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C] text-slate-700 font-medium text-xs"
            >
              <option value="all">Confirmation: All</option>
              <option value="confirmed">Confirmed Only</option>
              <option value="unconfirmed">Unconfirmed Only</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div>
            <select
              id="roster-filter-payment-select"
              value={filterPayment}
              onChange={(e: any) => setFilterPayment(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C] text-slate-700 font-medium text-xs"
            >
              <option value="all">Payment Status: All</option>
              <option value="fully_paid">Fully Paid</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          {/* Trip Type Filter */}
          <div>
            <select
              id="roster-filter-type-select"
              value={filterType}
              onChange={(e: any) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C] text-slate-700 font-medium text-xs"
            >
              <option value="all">Trip Option: All</option>
              <option value="1D1N">1 Day 1 Night (1D1N)</option>
              <option value="2D1N">2 Days 1 Night (2D1N)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
              <th
                onClick={() => toggleSort("name")}
                className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Name</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th
                onClick={() => toggleSort("confirmed")}
                className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Confirmed</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th
                onClick={() => toggleSort("amountPaid")}
                className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Amount Paid</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              <th className="py-3 px-4">Trip Type</th>
              <th className="py-3 px-4">Payment Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredAttendees.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                  {attendees.length === 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-700">No attendees added yet</p>
                      <p className="text-xs text-slate-500">
                        Click the <strong className="text-[#0B4F6C]">"Add Attendee"</strong> button above to start entering your actual trip participants.
                      </p>
                    </div>
                  ) : (
                    "No attendees match your search filters."
                  )}
                </td>
              </tr>
            ) : (
              filteredAttendees.map((att) => {
                const isFullyPaid = att.status === "fully_paid";
                const isPartial = att.status === "partially_paid";

                return (
                  <tr
                    key={att.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Name */}
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {att.name}
                    </td>

                    {/* Confirmed Toggle Badge */}
                    <td className="py-3 px-4">
                      <button
                        id={`toggle-confirmed-btn-${att.id}`}
                        onClick={() => onToggleConfirmed(att.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                          att.confirmed
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200"
                        }`}
                        title="Click to toggle confirmation status"
                      >
                        {att.confirmed ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Confirmed</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>Unconfirmed</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Amount Paid */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      {formatKwacha(att.amountPaid)}
                      {att.balanceDue > 0 && (
                        <span className="block text-[10px] text-rose-600 font-normal">
                          Due: {formatKwacha(att.balanceDue)}
                        </span>
                      )}
                    </td>

                    {/* Trip Type */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-50 text-[#0B4F6C] border border-cyan-200">
                        {att.tripType}
                      </span>
                    </td>

                    {/* Payment Status Badge */}
                    <td className="py-3 px-4">
                      {isFullyPaid ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Fully Paid
                        </span>
                      ) : isPartial ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Partially Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          Unpaid
                        </span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        id={`edit-attendee-btn-${att.id}`}
                        onClick={() => onEditAttendee(att)}
                        className="p-1.5 text-slate-500 hover:text-[#0B4F6C] hover:bg-cyan-50 rounded-lg transition-colors inline-flex items-center"
                        title="Edit attendee details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        id={`delete-attendee-btn-${att.id}`}
                        onClick={() => onDeleteAttendee(att.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-flex items-center"
                        title="Delete attendee"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Roster Footer Summary */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-medium">
        <div>
          Showing <span className="font-bold text-slate-900">{filteredAttendees.length}</span> of{" "}
          <span className="font-bold text-slate-900">{attendees.length}</span> total entries
        </div>
        <div className="flex items-center gap-3">
          <span>
            Confirmed: <strong className="text-emerald-700">{metrics.confirmedHeadcount}</strong>
          </span>
          <span>
            Fully Paid: <strong className="text-emerald-700">{metrics.fullyPaidCount}</strong>
          </span>
          <span>
            Unpaid: <strong className="text-rose-700">{metrics.unpaidCount}</strong>
          </span>
        </div>
      </div>

    </div>
  );
};
