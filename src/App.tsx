import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Attendee, TripSettings, TripType, ActiveTab } from "./types";
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
import { Navbar } from "./components/Navbar";
import { OverviewTab } from "./components/tabs/OverviewTab";
import { PaymentsTab } from "./components/tabs/PaymentsTab";
import { BudgetTab } from "./components/tabs/BudgetTab";
import { ComparisonTab } from "./components/tabs/ComparisonTab";
import { GuideTab } from "./components/tabs/GuideTab";
import { ReportsTab } from "./components/tabs/ReportsTab";

import { AddEditAttendeeModal } from "./components/AddEditAttendeeModal";
import { ReportModal } from "./components/ReportModal";
import { FirebaseModal } from "./components/FirebaseModal";
import { DocGuideModal } from "./components/DocGuideModal";
import { calculateTripMetrics } from "./utils/formatters";

const STORAGE_KEY_ATTENDEES = "siavonga_trip_attendees_v1";
const STORAGE_KEY_SETTINGS = "siavonga_trip_settings_v1";
const STORAGE_KEY_FIREBASE = "siavonga_trip_firebase_config_v1";
const STORAGE_KEY_GROUP_SIZE = "siavonga_selected_group_size_v1";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // Selected scaling group size (15 to 24, default 20)
  const [selectedGroupSize, setSelectedGroupSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GROUP_SIZE);
      if (saved) {
        const val = parseInt(saved, 10);
        if (val >= 15 && val <= 24) return val;
      }
    } catch (e) {
      console.warn("Could not read saved group size:", e);
    }
    return 20;
  });

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

  // Sync group size to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_GROUP_SIZE, selectedGroupSize.toString());
  }, [selectedGroupSize]);

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

    const unsubscribeAttendees = subscribeAttendeesFirestore(
      (liveAttendees) => {
        if (liveAttendees) {
          setAttendees(liveAttendees);
        }
      },
      (err) => console.warn("Firestore attendees snapshot error:", err),
      fbConfig
    );

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

  // Change group size scaler
  const handleGroupSizeChange = (newSize: number) => {
    const clamped = Math.max(15, Math.min(24, newSize));
    setSelectedGroupSize(clamped);
    setTripSettings((prev) => ({ ...prev, selectedGroupSize: clamped }));
    if (isFirebaseActive) {
      updateTripSettingsFirestore({ selectedGroupSize: clamped }, fbConfig);
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
      setAttendees((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );
      if (isFirebaseActive) {
        await updateAttendeeFirestore(id, data, fbConfig);
      }
    } else {
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
    setSelectedGroupSize(20);
    localStorage.removeItem(STORAGE_KEY_ATTENDEES);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);
    localStorage.removeItem(STORAGE_KEY_GROUP_SIZE);
  };

  // Save Custom Firebase Config
  const handleSaveFirebaseConfig = (newConfig: typeof firebaseConfig) => {
    setFbConfig(newConfig);
    localStorage.setItem(STORAGE_KEY_FIREBASE, JSON.stringify(newConfig));
  };

  const metrics = calculateTripMetrics(attendees, tripSettings.activeTripType, selectedGroupSize);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans selection:bg-[#C9911D]/30 selection:text-slate-900 pb-16">
      
      {/* Header */}
      <Header />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        confirmedCount={metrics.confirmedHeadcount}
        totalAttendeesCount={attendees.length}
      />

      {/* Main Multi-page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {(activeTab === "overview" || (activeTab as string) === "dashboard") && (
              <OverviewTab
                attendees={attendees}
                activeTripType={tripSettings.activeTripType}
                selectedGroupSize={selectedGroupSize}
                tripDateStr={tripSettings.tripDate}
                onTripTypeChange={handleTripTypeChange}
                onGroupSizeChange={handleGroupSizeChange}
                onNavigateToPayments={() => setActiveTab("payments")}
                onNavigateToBudget={() => setActiveTab("budget")}
              />
            )}

            {(activeTab === "payments" || (activeTab as string) === "attendees") && (
              <PaymentsTab
                attendees={attendees}
                activeTripType={tripSettings.activeTripType}
                selectedGroupSize={selectedGroupSize}
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
            )}

            {activeTab === "budget" && (
              <BudgetTab
                activeTripType={tripSettings.activeTripType}
                selectedGroupSize={selectedGroupSize}
                onTripTypeChange={handleTripTypeChange}
                onGroupSizeChange={handleGroupSizeChange}
                confirmedCount={metrics.confirmedHeadcount}
              />
            )}

            {activeTab === "comparison" && (
              <ComparisonTab
                selectedGroupSize={selectedGroupSize}
                onGroupSizeChange={handleGroupSizeChange}
                onSelectPackage={(pkg) => handleTripTypeChange(pkg)}
              />
            )}

            {activeTab === "guide" && (
              <GuideTab
                activeTripType={tripSettings.activeTripType}
              />
            )}

            {activeTab === "reports" && (
              <ReportsTab
                attendees={attendees}
                activeTripType={tripSettings.activeTripType}
                tripDateStr={tripSettings.tripDate || TRIP_DATE}
                onOpenDocsModal={() => setIsDocsModalOpen(true)}
                onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
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
