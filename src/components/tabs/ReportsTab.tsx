import React, { useState } from "react";
import { Attendee, TripType } from "../../types";
import { generatePlainTextReport, calculateTripMetrics, formatKwacha } from "../../utils/formatters";
import { FileText, Copy, Check, Share2, BookOpen, Database, Sparkles, CheckCircle } from "lucide-react";

interface ReportsTabProps {
  attendees: Attendee[];
  activeTripType: TripType;
  tripDateStr: string;
  onOpenDocsModal: () => void;
  onOpenFirebaseModal: () => void;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  attendees,
  activeTripType,
  tripDateStr,
  onOpenDocsModal,
  onOpenFirebaseModal,
}) => {
  const [copied, setCopied] = useState(false);
  const reportText = generatePlainTextReport(attendees, activeTripType, tripDateStr);
  const metrics = calculateTripMetrics(attendees, activeTripType);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4F6C] via-[#115d7e] to-[#0B4F6C] text-white p-6 rounded-2xl shadow-sm border border-[#C9911D]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#C9911D]" />
            <h2 className="text-xl font-bold font-serif text-amber-50">Reports & Documentation Hub</h2>
          </div>
          <p className="text-xs text-cyan-100/80 mt-1 max-w-2xl">
            Export structured summary updates for group members or copy documentation for Google Docs & Firestore.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="reports-copy-btn"
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C9911D] hover:bg-[#b58017] text-slate-900 transition-colors flex items-center gap-2 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Report Copied!" : "Copy Executive Summary"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Executive Summary Live Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 font-serif text-base">Executive Trip Summary Report</h3>
                <p className="text-xs text-slate-500">Live text format ready for WhatsApp broadcasts or Docs</p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                {activeTripType} Active
              </span>
            </div>

            <div className="relative">
              <pre className="bg-slate-900 text-amber-100 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-[480px] overflow-y-auto border border-slate-800 selection:bg-[#C9911D] selection:text-slate-900">
                {reportText}
              </pre>

              <button
                id="reports-copy-floating-btn"
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors border border-white/20 text-xs flex items-center gap-1.5"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Quick Actions & Documentation Links */}
        <div className="space-y-6">
          
          {/* Quick Stats Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm font-serif">Report Snapshot</h3>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-600">Active Package:</span>
                <span className="font-bold text-slate-900">{activeTripType}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-600">Total Confirmed:</span>
                <span className="font-bold text-emerald-700">{metrics.confirmedHeadcount} Attendees</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-600">Total Funds Collected:</span>
                <span className="font-mono font-bold text-[#0B4F6C]">{formatKwacha(metrics.totalRaised)}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-600">Surplus / Shortfall:</span>
                <span className="font-mono font-bold text-amber-800">{formatKwacha(metrics.surplusOrShortfall)}</span>
              </div>
            </div>
          </div>

          {/* Project Docs & Firebase Setup Cards */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm font-serif">System Setup & Docs</h3>
            
            <div className="space-y-2.5">
              <button
                id="reports-open-docs-btn"
                onClick={onOpenDocsModal}
                className="w-full p-3 bg-cyan-50 hover:bg-cyan-100/80 rounded-xl border border-cyan-200 text-left transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 text-xs">
                  <BookOpen className="w-4 h-4 text-[#0B4F6C]" />
                  <div>
                    <p className="font-bold text-[#0B4F6C]">Google Docs Guide</p>
                    <p className="text-[11px] text-slate-500">Copy structured project outline</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0B4F6C] group-hover:translate-x-0.5 transition-transform">
                  View →
                </span>
              </button>

              <button
                id="reports-open-firebase-btn"
                onClick={onOpenFirebaseModal}
                className="w-full p-3 bg-amber-50 hover:bg-amber-100/80 rounded-xl border border-amber-200 text-left transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 text-xs">
                  <Database className="w-4 h-4 text-amber-700" />
                  <div>
                    <p className="font-bold text-amber-900">Firestore Settings</p>
                    <p className="text-[11px] text-slate-500">Configure Cloud Firestore credentials</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-800 group-hover:translate-x-0.5 transition-transform">
                  Configure →
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
