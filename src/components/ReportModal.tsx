import React, { useState } from "react";
import { Attendee, TripType } from "../types";
import { generatePlainTextReport } from "../utils/formatters";
import { X, Copy, Check, FileText, ExternalLink, Sparkles } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendees: Attendee[];
  activeTripType: TripType;
  tripDateStr: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  attendees,
  activeTripType,
  tripDateStr
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reportText = generatePlainTextReport(attendees, activeTripType, tripDateStr);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#0B4F6C] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-amber-50">
                Generate Executive Report
              </h3>
              <p className="text-xs text-cyan-200">
                Formatted as clean plain text for direct pasting into Google Docs or WhatsApp
              </p>
            </div>
          </div>

          <button
            id="report-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-cyan-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Plain Text Codebox */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Document Preview (Plain Text format)
            </span>
            <button
              id="report-copy-top-btn"
              onClick={handleCopy}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-[#C9911D] hover:bg-[#b58017] text-slate-900"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
          </div>

          {/* Plain Text Display Area */}
          <textarea
            id="report-text-area"
            readOnly
            value={reportText}
            rows={14}
            className="w-full p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-xl border border-slate-800 leading-relaxed focus:outline-none select-all"
          />

          {/* Optional / TODO Section for Direct Google Docs API Export */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Optional Integration TODO: Direct Google Docs API Export</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              To enable 1-click creation of a Google Doc file directly in Google Drive, configure Google Workspace OAuth credentials with the scope:
              <code className="bg-amber-100 px-1.5 py-0.5 rounded text-[11px] font-mono mx-1">https://www.googleapis.com/auth/documents</code>.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-amber-900/80">
              Note: The plain-text copy button above works instantly without any API keys or authentication!
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Paste directly into Google Docs or email to group organizers
          </span>
          <div className="flex items-center gap-2">
            <button
              id="report-modal-cancel-btn"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              id="report-copy-bottom-btn"
              onClick={handleCopy}
              className={`px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-[#C9911D] hover:bg-[#b58017] text-slate-900"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
