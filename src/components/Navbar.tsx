import React from "react";
import { LayoutDashboard, Users, Calculator, Map, FileText, SlidersHorizontal } from "lucide-react";
import { ActiveTab } from "../types";

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  confirmedCount: number;
  totalAttendeesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  confirmedCount,
  totalAttendeesCount,
}) => {
  const navItems = [
    {
      id: "overview" as ActiveTab,
      label: "Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "budget" as ActiveTab,
      label: "Budget Breakdown",
      icon: Calculator,
      badge: null,
    },
    {
      id: "payments" as ActiveTab,
      label: "Payment Tracker",
      icon: Users,
      badge: `${confirmedCount}/${totalAttendeesCount || 0}`,
    },
    {
      id: "comparison" as ActiveTab,
      label: "Package Comparison",
      icon: SlidersHorizontal,
      badge: "1D1N vs 2D1N",
    },
    {
      id: "guide" as ActiveTab,
      label: "Itinerary & Guide",
      icon: Map,
      badge: null,
    },
    {
      id: "reports" as ActiveTab,
      label: "Reports & Docs",
      icon: FileText,
      badge: null,
    },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex space-x-1 sm:space-x-2 py-1.5 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-[#0B4F6C] to-[#115d7e] text-white shadow-sm ring-1 ring-[#C9911D]/40"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C9911D]" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-amber-400/20 text-amber-200 border border-amber-300/30"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

