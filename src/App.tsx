import React, { useState, useEffect } from "react";
import { Attendee, TripSettings, TripType } from "./types";
import {
  INITIAL_MOCK_ATTENDEES,
  DEFAULT_TRIP_SETTINGS,
  TRIP_DATE
} from "./data/costTable";
import {
  firebaseConfig,
  isFirebaseConfigured,
  subscribeAttendeesFirestore,
  subscribeTripSettingsFirestore,
  addAttendeeFirestore,
  updateAttendeeFirestore,
  deleteAttendeeFirestore,
  updateTripSettingsFirestore
} from "./firebase";

import { Header } from "./components/Header";
import { Countdown } from "./components/Countdown";
import { TripTypeToggle } from "./components/TripTypeToggle";
import { StatsOverview } from "./components/StatsOverview";
import { AttendeeRoster } from "./components/AttendeeRoster";
import { AddEditAttendeeModal } from "./components/AddEditAttendeeModal";
import { ReportModal } from "./components/ReportModal";
import { FirebaseModal } from "./components/FirebaseModal";
import { DocGuideModal } from "./components/DocGuideModal";
import { calculateTripMetrics } from "./utils/formatters";
import { Compass, Sparkles, MapPin, Anchor } from "lucide-react";

const STORAGE_KEY_ATTENDEES = "siavonga_trip_attendees_v1";
const STORAGE_KEY_SETTINGS = "siavonga_trip_settings_v1";
const STORAGE_KEY_FIREBASE = "siavonga_trip_firebase_config_v1";

export default function App() {
  // Load saved custom firebase config from localStorage if present
  const [fbConfig, setFbConfig] = useState<typeof firebaseConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FIREBASE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read saved firebase config:", e);
    }
    return firebaseConfig;
  });

  const isFirebaseActive = isFirebaseConfigured(fbConfig);

  // Attendees state
  const [attendees, setAttendees] = useState<Attendee[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ATTENDEES);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean out cached legacy mock entries if present
        if (Array.isArray(parsed) && parsed.some((a) => a.id && a.id.startsWith("att-"))) {
          localStorage.removeItem(STORAGE_KEY_ATTENDEES);
          return [];
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Could not read local attendees:", e);
    }
    return INITIAL_MOCK_ATTENDEES;
  });

  // Trip Settings state
  const [tripSettings, setTripSettings] = useState<TripSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read local trip settings:", e);
    }
    return DEFAULT_TRIP_SETTINGS;
  });

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState<Attendee | null>(null);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  // Sync state to localStorage when running in local mock mode
  useEffect(() => {
    if (!isFirebaseActive) {
      localStorage.setItem(STORAGE_KEY_ATTENDEES, JSON.stringify(attendees));
    }
  }, [attendees, isFirebaseActive]);

  useEffect(() => {
    if (!isFirebaseActive) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(tripSettings));
    }
  }, [tripSettings, isFirebaseActive]);

  // Firebase Firestore live listeners (onSnapshot)
  useEffect(() => {
    if (!isFirebaseActive) return;

    // Listen to attendees collection
    const unsubscribeAttendees = subscribeAttendeesFirestore(
      (liveAttendees) => {
        if (liveAttendees) {
          setAttendees(liveAttendees);
        }
      },
      (err) => console.warn("Firestore attendees snapshot error:", err),
      fbConfig
    );

    // Listen to trip settings document
    const unsubscribeSettings = subscribeTripSettingsFirestore(
      (liveSettings) => {
        if (liveSettings) {
          setTripSettings(liveSettings);
        }
      },
      (err) => console.warn("Firestore settings snapshot error:", err),
      fbConfig
    );

    return () => {
      if (unsubscribeAttendees) unsubscribeAttendees();
      if (unsubscribeSettings) unsubscribeSettings();
    };
  }, [isFirebaseActive, fbConfig]);

  // Switch trip package option
  const handleTripTypeChange = (newType: TripType) => {
    setTripSettings((prev) => ({ ...prev, activeTripType: newType }));
    if (isFirebaseActive) {
      updateTripSettingsFirestore({ activeTripType: newType }, fbConfig);
    }
  };

  // Toggle attendee confirmation
  const handleToggleConfirmed = (id: string) => {
    const target = attendees.find((a) => a.id === id);
    if (!target) return;

    const updatedConfirmed = !target.confirmed;

    setAttendees((prev) =>
      prev.map((a) => (a.id === id ? { ...a, confirmed: updatedConfirmed } : a))
    );

    if (isFirebaseActive) {
      updateAttendeeFirestore(id, { confirmed: updatedConfirmed }, fbConfig);
    }
  };

  // Save Attendee (Add or Edit)
  const handleSaveAttendee = async (
    data: Omit<Attendee, "id">,
    id?: string
  ) => {
    if (id) {
      // Edit existing
      setAttendees((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );
      if (isFirebaseActive) {
        await updateAttendeeFirestore(id, data, fbConfig);
      }
    } else {
      // Create new
      const newId = `att-${Date.now()}`;
      const newAttendee: Attendee = { id: newId, ...data };
      setAttendees((prev) => [...prev, newAttendee]);

      if (isFirebaseActive) {
        const firestoreId = await addAttendeeFirestore(data, fbConfig);
        if (firestoreId) {
          setAttendees((prev) =>
            prev.map((a) => (a.id === newId ? { ...a, id: firestoreId } : a))
          );
        }
      }
    }
  };

  // Delete Attendee
  const handleDeleteAttendee = async (id: string) => {
    setAttendees((prev) => prev.filter((a) => a.id !== id));
    if (isFirebaseActive) {
      await deleteAttendeeFirestore(id, fbConfig);
    }
  };

  // Reset Mock Data
  const handleResetMockData = () => {
    setAttendees(INITIAL_MOCK_ATTENDEES);
    setTripSettings(DEFAULT_TRIP_SETTINGS);
    localStorage.removeItem(STORAGE_KEY_ATTENDEES);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);
  };

  // Save Custom Firebase Config
  const handleSaveFirebaseConfig = (newConfig: typeof firebaseConfig) => {
    setFbConfig(newConfig);
    localStorage.setItem(STORAGE_KEY_FIREBASE, JSON.stringify(newConfig));
  };

  const metrics = calculateTripMetrics(attendees, tripSettings.activeTripType);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans selection:bg-[#C9911D]/30 selection:text-slate-900 pb-16">
      
      {/* Header */}
      <Header
        isFirebaseActive={isFirebaseActive}
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
        onOpenDocsModal={() => setIsDocsModalOpen(true)}
        onOpenAddAttendee={() => {
          setEditingAttendee(null);
          setIsAddModalOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Destination Location Sub-Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-[#0B4F6C]/10 via-[#C9911D]/10 to-transparent p-4 rounded-2xl border border-[#0B4F6C]/15 gap-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#0B4F6C]">
            <MapPin className="w-4 h-4 text-[#C9911D]" />
            <span>Destination: Siavonga District, Southern Province, Lake Kariba Zambia</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <Anchor className="w-3.5 h-3.5 text-cyan-700" />
              Min Capacity: 15
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-bold text-slate-900">
              Max Capacity: 24
            </span>
          </div>
        </div>

        {/* Hero Section: Countdown & Package Option Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Countdown targetDateStr={tripSettings.tripDate || TRIP_DATE} />
          </div>
          <div className="lg:col-span-1">
            <TripTypeToggle
              activeTripType={tripSettings.activeTripType}
              onChangeTripType={handleTripTypeChange}
              confirmedHeadcount={metrics.confirmedHeadcount}
            />
          </div>
        </div>

        {/* Dashboard Metrics Overview */}
        <StatsOverview
          attendees={attendees}
          activeTripType={tripSettings.activeTripType}
        />

        {/* Attendee Roster Table */}
        <AttendeeRoster
          attendees={attendees}
          activeTripType={tripSettings.activeTripType}
          onToggleConfirmed={handleToggleConfirmed}
          onEditAttendee={(att) => {
            setEditingAttendee(att);
            setIsAddModalOpen(true);
          }}
          onDeleteAttendee={handleDeleteAttendee}
          onOpenAddModal={() => {
            setEditingAttendee(null);
            setIsAddModalOpen(true);
          }}
          onResetMockData={handleResetMockData}
        />

      </main>

      {/* Modals */}
      <AddEditAttendeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveAttendee}
        editingAttendee={editingAttendee}
        defaultTripType={tripSettings.activeTripType}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        attendees={attendees}
        activeTripType={tripSettings.activeTripType}
        tripDateStr={tripSettings.tripDate}
      />

      <FirebaseModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
        onSaveConfig={handleSaveFirebaseConfig}
        currentConfig={fbConfig}
      />

      <DocGuideModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

    </div>
  );
}
