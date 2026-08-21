import React, { useState } from "react";
import { BookOpen, Copy, Check, X, Sparkles } from "lucide-react";

interface DocGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PROJECT_DOCUMENTATION_TEXT = `================================================================================
SIAVONGA TRIP TRACKER - PROJECT OVERVIEW & SETUP DOCUMENTATION
================================================================================

PROJECT OVERVIEW
--------------------------------------------------------------------------------
The Siavonga Trip Tracker is a live, group trip management dashboard built for a 
getaway to Siavonga, Zambia on Lake Kariba. The application tracks confirmed 
headcounts, monitors total funds raised against dynamic cost goals, calculates 
per-person payment targets, and maintains a real-time countdown to the trip date 
(October 2, 2026).

Key Capabilities:
• Dynamic Trip Package Toggling: Switch between "1 Day 1 Night" (1D1N) and 
  "2 Days 1 Night" (2D1N) packages, updating all budget goals and target rates 
  instantaneously.
• Dynamic Funding Goals: Recalculates funding goals automatically based on the 
  exact number of confirmed attendees (clamped between 15 minimum and 24 maximum).
• Live Departure Countdown: Provides a real-time countdown to October 2, 2026, 
  transitioning into a festive "Trip Day" state once reached.
• Attendee Payment Roster: Manages member confirmation status, individual payment 
  contributions, and package selections with filterable status indicators.
• Executive Summary Exporter: Generates plain-text summaries ready to paste 
  directly into Google Docs or share with organizers.


FIRESTORE DATA MODEL (TO BE CREATED BY HAND IN FIREBASE CONSOLE)
--------------------------------------------------------------------------------
To connect your live Firebase project, create the following collections and 
document structures in your Firestore Database:

1. Collection: "attendees"
   Location: /attendees/{attendeeId}
   
   Document Fields:
   • name (string, required): Full name of attendee (e.g., "Chipo Mwansa")
   • confirmed (boolean, required): Confirmation status (true or false)
   • amountPaid (number, required): Total Kwacha contributed (e.g., 1300.00)
   • tripType (string, required): Selected package ("1D1N" or "2D1N")

2. Document: "settings/trip"
   Location: /settings/trip  (Collection: "settings", Document ID: "trip")
   
   Document Fields:
   • tripDate (string / timestamp, required): Target trip date string 
     (e.g., "2026-10-02T00:00:00+02:00")
   • activeTripType (string, required): Default active package ("1D1N" or "2D1N")


STEP-BY-STEP FIREBASE SETUP INSTRUCTIONS
--------------------------------------------------------------------------------
1. Step 1: Create a Firebase Project
   • Go to the Firebase Console (https://console.firebase.google.com).
   • Click "Add project" and name your project (e.g., "siavonga-trip-2026").
   • Complete project setup and select "Firestore Database" from the sidebar.

2. Step 2: Provision Firestore Database
   • Click "Create database" in Firestore.
   • Choose a database location closest to your users (e.g., europe-west2 or us-central).
   • Select "Start in test mode" or configure security rules to allow read/write 
     access to authenticated users.

3. Step 3: Create Collections and Initial Documents
   • Create collection "attendees" and add sample documents using the field shape above.
   • Create collection "settings", add a document with ID "trip", and populate the 
     fields specified above.

4. Step 4: Obtain Your Firebase Configuration Credentials
   • In the Firebase Console, go to Project Settings (gear icon) > General.
   • Under "Your apps", click the Web icon (</>) to register a Web app.
   • Copy the generated firebaseConfig object containing apiKey, authDomain, 
     projectId, storageBucket, messagingSenderId, and appId.

5. Step 5: Plug Configuration into the App
   • Open the Siavonga Trip Tracker application.
   • Click the "Local Mock Data / Firestore" button in the top toolbar.
   • Paste your Firebase credentials into the provided configuration form and save.
   • The app will automatically connect via real-time onSnapshot listeners!

================================================================================
Generated for Siavonga Trip Tracker Project Documentation
================================================================================`;

export const DocGuideModal: React.FC<DocGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PROJECT_DOCUMENTATION_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
        
        {/* Header */}
        <div className="bg-[#0B4F6C] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-400/20 text-cyan-200 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-amber-50">
                Project Overview & Documentation
              </h3>
              <p className="text-xs text-cyan-200">
                Formatted text for direct copy & paste into a Google Doc
              </p>
            </div>
          </div>

          <button
            id="doc-guide-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-cyan-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Google Doc Documentation Text
            </span>
            <button
              id="doc-guide-copy-btn"
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
                  <span>Copy for Google Docs</span>
                </>
              )}
            </button>
          </div>

          <textarea
            id="doc-guide-text-area"
            readOnly
            value={PROJECT_DOCUMENTATION_TEXT}
            rows={16}
            className="w-full p-4 bg-slate-900 text-cyan-100 font-mono text-xs rounded-xl border border-slate-800 leading-relaxed focus:outline-none select-all"
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Copy and paste this text straight into Google Docs as project documentation.
          </span>
          <button
            id="doc-guide-footer-close-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
