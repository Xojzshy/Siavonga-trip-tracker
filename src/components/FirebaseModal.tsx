import React, { useState } from "react";
import { Database, X, Check, Save, ExternalLink, HelpCircle, Layers, FileCode } from "lucide-react";
import { firebaseConfig, isFirebaseConfigured } from "../firebase";

interface FirebaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig: (config: typeof firebaseConfig) => void;
  currentConfig: typeof firebaseConfig;
}

export const FirebaseModal: React.FC<FirebaseModalProps> = ({
  isOpen,
  onClose,
  onSaveConfig,
  currentConfig
}) => {
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || "");
  const [projectId, setProjectId] = useState(currentConfig.projectId || "");
  const [authDomain, setAuthDomain] = useState(currentConfig.authDomain || "");
  const [storageBucket, setStorageBucket] = useState(currentConfig.storageBucket || "");
  const [messagingSenderId, setMessagingSenderId] = useState(currentConfig.messagingSenderId || "");
  const [appId, setAppId] = useState(currentConfig.appId || "");

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const isConfigured = isFirebaseConfigured({
    ...currentConfig,
    apiKey,
    projectId,
    authDomain,
    storageBucket,
    messagingSenderId,
    appId
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newConfig = {
      ...currentConfig,
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim() || `${projectId.trim()}.firebaseapp.com`,
      projectId: projectId.trim(),
      storageBucket: storageBucket.trim() || `${projectId.trim()}.firebasestorage.app`,
      messagingSenderId: messagingSenderId.trim(),
      appId: appId.trim()
    };

    onSaveConfig(newConfig);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
        
        {/* Header */}
        <div className="bg-[#0B4F6C] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-400/20 text-cyan-200 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-amber-50">
                Firestore & Firebase Integration Setup
              </h3>
              <p className="text-xs text-cyan-200">
                Configure live synchronization or test Firestore `onSnapshot` listeners
              </p>
            </div>
          </div>

          <button
            id="firebase-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-cyan-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Status Alert Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              isConfigured
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : "bg-amber-50 border-amber-200 text-amber-950"
            }`}
          >
            <Database
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                isConfigured ? "text-emerald-600" : "text-amber-600"
              }`}
            />
            <div>
              <h4 className="font-bold text-sm">
                {isConfigured
                  ? "Firestore Configuration Active!"
                  : "Currently Running on Local Mock Data"}
              </h4>
              <p className="text-xs mt-0.5 leading-relaxed">
                {isConfigured
                  ? "Your app is connected to Firestore and listening for live onSnapshot updates."
                  : "Paste your Firebase project credentials below to connect to your live Firestore database."}
              </p>
            </div>
          </div>

          {/* Firestore Schema Guide */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm font-serif">
              <Layers className="w-4 h-4 text-[#0B4F6C]" />
              Required Firestore Collections & Document Shapes
            </h4>

            <div className="space-y-2 text-slate-700">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-[#0B4F6C] block">
                  1. Collection: <code className="bg-cyan-50 px-1 py-0.5 rounded border border-cyan-200">attendees</code>
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Documents represent trip members with these fields:
                </p>
                <pre className="bg-slate-900 text-amber-200 p-2 rounded text-[11px] font-mono mt-1 overflow-x-auto">
{`{
  name: "Chipo Mwansa",
  confirmed: true,
  amountPaid: 1370.00,
  tripType: "1D1N" // or "2D1N"
}`}
                </pre>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-[#0B4F6C] block">
                  2. Document: <code className="bg-cyan-50 px-1 py-0.5 rounded border border-cyan-200">settings/trip</code>
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Path: Collection <code className="font-mono">settings</code>, Document ID <code className="font-mono">trip</code>
                </p>
                <pre className="bg-slate-900 text-amber-200 p-2 rounded text-[11px] font-mono mt-1 overflow-x-auto">
{`{
  tripDate: "2026-10-02T00:00:00+02:00",
  activeTripType: "1D1N" // or "2D1N"
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <form onSubmit={handleSave} className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm font-serif">
              Firebase Project Credentials
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  API Key
                </label>
                <input
                  type="text"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C]"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Project ID
                </label>
                <input
                  type="text"
                  placeholder="siavonga-trip-2026"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C]"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Auth Domain
                </label>
                <input
                  type="text"
                  placeholder="siavonga-trip-2026.firebaseapp.com"
                  value={authDomain}
                  onChange={(e) => setAuthDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C]"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  App ID
                </label>
                <input
                  type="text"
                  placeholder="1:123456789:web:abcdef..."
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:ring-2 focus:ring-[#0B4F6C]/20 focus:border-[#0B4F6C]"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg font-bold text-slate-900 bg-[#C9911D] hover:bg-[#b58017] flex items-center gap-1.5 shadow-sm"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Saved! Reconnecting...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Config</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
