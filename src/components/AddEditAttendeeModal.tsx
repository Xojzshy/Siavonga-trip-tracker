import React, { useState, useEffect } from "react";
import { Attendee, TripType } from "../types";
import { X, User, DollarSign, CheckSquare, Sun, Moon } from "lucide-react";

interface AddEditAttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (attendeeData: Omit<Attendee, "id">, id?: string) => void;
  editingAttendee: Attendee | null;
  defaultTripType: TripType;
}

export const AddEditAttendeeModal: React.FC<AddEditAttendeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingAttendee,
  defaultTripType
}) => {
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(true);
  const [amountPaid, setAmountPaid] = useState<number | "">("");
  const [tripType, setTripType] = useState<TripType>(defaultTripType);

  useEffect(() => {
    if (editingAttendee) {
      setName(editingAttendee.name);
      setConfirmed(editingAttendee.confirmed);
      setAmountPaid(editingAttendee.amountPaid);
      setTripType(editingAttendee.tripType);
    } else {
      setName("");
      setConfirmed(true);
      setAmountPaid("");
      setTripType(defaultTripType);
    }
  }, [editingAttendee, defaultTripType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave(
      {
        name: name.trim(),
        confirmed,
        amountPaid: typeof amountPaid === "number" ? Math.max(0, amountPaid) : 0,
        tripType
      },
      editingAttendee ? editingAttendee.id : undefined
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0B4F6C] text-white p-5 flex items-center justify-between">
          <h3 className="text-lg font-bold font-serif text-amber-50">
            {editingAttendee ? "Edit Attendee Details" : "Add New Trip Attendee"}
          </h3>
          <button
            id="attendee-modal-close-btn"
            onClick={onClose}
            className="p-1 rounded-lg text-cyan-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-medium text-slate-700">
          
          {/* Name Field */}
          <div>
            <label className="block mb-1 font-bold text-slate-900">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                id="attendee-modal-name-input"
                type="text"
                required
                placeholder="e.g. Chipo Mwansa"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C] font-semibold text-slate-900"
              />
            </div>
          </div>

          {/* Amount Paid Field */}
          <div>
            <label className="block mb-1 font-bold text-slate-900">
              Amount Paid (Zambian Kwacha K)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 font-bold text-slate-400">K</span>
              <input
                id="attendee-modal-amount-input"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value === "" ? "" : parseFloat(e.target.value))}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C] font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Trip Type Package Selection */}
          <div>
            <label className="block mb-1 font-bold text-slate-900">
              Selected Package
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="attendee-modal-1d1n-btn"
                type="button"
                onClick={() => setTripType("1D1N")}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 font-bold transition-all ${
                  tripType === "1D1N"
                    ? "border-[#0B4F6C] bg-cyan-50 text-[#0B4F6C] ring-2 ring-[#0B4F6C]/20"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>1 Day 1 Night</span>
              </button>

              <button
                id="attendee-modal-2d1n-btn"
                type="button"
                onClick={() => setTripType("2D1N")}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 font-bold transition-all ${
                  tripType === "2D1N"
                    ? "border-[#0B4F6C] bg-amber-50 text-amber-900 ring-2 ring-[#0B4F6C]/20"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>2 Days 1 Night</span>
              </button>
            </div>
          </div>

          {/* Confirmed Toggle Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200 hover:bg-slate-100/60 transition-colors">
              <input
                id="attendee-modal-confirmed-checkbox"
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 text-[#0B4F6C] rounded focus:ring-[#0B4F6C] border-slate-300"
              />
              <div>
                <span className="font-bold text-slate-900 block">
                  Confirmed Attendance
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Check if this person has confirmed their spot on the trip.
                </span>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              id="attendee-modal-cancel-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              id="attendee-modal-submit-btn"
              type="submit"
              className="px-5 py-2 rounded-lg font-bold text-slate-900 bg-[#C9911D] hover:bg-[#b58017] transition-colors shadow-sm"
            >
              {editingAttendee ? "Save Changes" : "Add Attendee"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
