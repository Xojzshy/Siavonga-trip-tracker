import React from "react";
import { Compass, FileText, Database, Sparkles, Plus, BookOpen } from "lucide-react";

export const Header: React.FC = () => {
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
                  Josh's Travel Tracker
                </h1>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C9911D]/30 text-amber-200 border border-[#C9911D]/50">
                  Siavonga 2026 🌅
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-100/80 font-medium mt-0.5">
                Lake Kariba Getaway • Live Group Attendance & Funding Dashboard
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
