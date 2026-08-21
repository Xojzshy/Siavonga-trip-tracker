import React from "react";
import { Compass, FileText, Database, Sparkles, Plus, BookOpen } from "lucide-react";

interface HeaderProps {
  isFirebaseActive: boolean;
  onOpenReport: () => void;
  onOpenFirebaseModal: () => void;
  onOpenDocsModal: () => void;
  onOpenAddAttendee: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isFirebaseActive,
  onOpenReport,
  onOpenFirebaseModal,
  onOpenDocsModal,
  onOpenAddAttendee
}) => {
  return (
    <header className="bg-gradient-to-r from-[#0B4F6C] via-[#115d7e] to-[#0B4F6C] text-white shadow-lg border-b border-[#C9911D]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Subtitle */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C9911D] to-[#F1C40F] flex items-center justify-center shadow-md text-[#0B4F6C] shrink-0 border border-white/20">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif text-amber-50">
                  Siavonga Trip Tracker
                </h1>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C9911D]/30 text-amber-200 border border-[#C9911D]/50">
                  Lake Kariba 2026 🌅
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-100/80 font-medium mt-0.5">
                Live Group Attendance & Funding Dashboard • Zambia
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Mode Badge */}
            <button
              id="header-firebase-status-btn"
              onClick={onOpenFirebaseModal}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${
                isFirebaseActive
                  ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40 hover:bg-emerald-500/30"
                  : "bg-amber-500/20 text-amber-200 border-amber-400/40 hover:bg-amber-500/30"
              }`}
              title="Click to configure Firebase"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isFirebaseActive ? "Firestore Live" : "Local Mock Data"}</span>
              <span className="w-2 h-2 rounded-full animate-pulse bg-current ml-0.5" />
            </button>

            {/* Quick Add Attendee */}
            <button
              id="header-add-attendee-btn"
              onClick={onOpenAddAttendee}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#C9911D] hover:bg-[#b58017] text-slate-900 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Attendee</span>
            </button>

            {/* Generate Report */}
            <button
              id="header-generate-report-btn"
              onClick={onOpenReport}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Generate Report</span>
            </button>

            {/* Project Overview Docs */}
            <button
              id="header-docs-guide-btn"
              onClick={onOpenDocsModal}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-900/40 hover:bg-cyan-900/60 text-cyan-100 border border-cyan-400/30 flex items-center gap-1.5 transition-colors"
              title="View & copy project documentation for Google Docs"
            >
              <BookOpen className="w-4 h-4 text-cyan-300" />
              <span className="hidden sm:inline">Docs & Setup</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
