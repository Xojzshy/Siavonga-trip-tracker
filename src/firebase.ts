import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDocFromServer,
  Firestore,
  Unsubscribe
} from "firebase/firestore";
import { Attendee, TripSettings, TripType } from "./types";
import appletFirebaseConfig from "../firebase-applet-config.json";

export const firebaseConfig = appletFirebaseConfig;

// Initialize app & database instance
const app: FirebaseApp = !getApps().length ? initializeApp(appletFirebaseConfig) : getApp();
export const db: Firestore = getFirestore(app, appletFirebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

// Helper to check if Firebase is configured
export function isFirebaseConfigured(config = firebaseConfig): boolean {
  return (
    Boolean(config && config.apiKey) &&
    config.apiKey !== "YOUR_API_KEY" &&
    Boolean(config.projectId) &&
    config.projectId !== "YOUR_PROJECT_ID"
  );
}

/**
 * Helper to get active Firestore database instance
 */
export function getFirestoreDb(customConfig = firebaseConfig): Firestore | null {
  if (customConfig.projectId === appletFirebaseConfig.projectId) {
    return db;
  }
  if (!isFirebaseConfigured(customConfig)) return null;

  try {
    const customApp = initializeApp(customConfig, "custom-app-" + Date.now());
    return getFirestore(customApp, (customConfig as any).firestoreDatabaseId);
  } catch (err) {
    console.warn("Failed to initialize custom Firebase config:", err);
    return db;
  }
}

/**
 * Real-time listener for the `attendees` Firestore collection.
 */
export function subscribeAttendeesFirestore(
  onData: (attendees: Attendee[]) => void,
  onError?: (error: Error) => void,
  customConfig = firebaseConfig
): Unsubscribe | null {
  const targetDb = getFirestoreDb(customConfig) || db;
  const path = "attendees";
  const attendeesCol = collection(targetDb, path);

  return onSnapshot(
    attendeesCol,
    (snapshot) => {
      const list: Attendee[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name || "Unnamed",
          confirmed: Boolean(data.confirmed),
          amountPaid: typeof data.amountPaid === "number" ? data.amountPaid : 0,
          tripType: (data.tripType === "2D1N" ? "2D1N" : "1D1N") as TripType
        };
      });
      onData(list);
    },
    (err) => {
      if (onError) onError(err);
      handleFirestoreError(err, OperationType.GET, path);
    }
  );
}

/**
 * Real-time listener for the `settings/trip` Firestore document.
 */
export function subscribeTripSettingsFirestore(
  onData: (settings: TripSettings) => void,
  onError?: (error: Error) => void,
  customConfig = firebaseConfig
): Unsubscribe | null {
  const targetDb = getFirestoreDb(customConfig) || db;
  const path = "settings/trip";
  const tripDocRef = doc(targetDb, "settings", "trip");

  return onSnapshot(
    tripDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onData({
          tripDate: data.tripDate || "2026-10-02T00:00:00+02:00",
          activeTripType: data.activeTripType === "2D1N" ? "2D1N" : "1D1N",
          selectedGroupSize: data.selectedGroupSize || 20
        });
      }
    },
    (err) => {
      if (onError) onError(err);
      handleFirestoreError(err, OperationType.GET, path);
    }
  );
}

// ============================================================================
// FIRESTORE MUTATION HELPERS
// ============================================================================

export async function addAttendeeFirestore(
  attendee: Omit<Attendee, "id">,
  customConfig = firebaseConfig
): Promise<string | null> {
  const targetDb = getFirestoreDb(customConfig) || db;
  const path = "attendees";
  try {
    const docRef = await addDoc(collection(targetDb, path), {
      name: attendee.name,
      confirmed: attendee.confirmed,
      amountPaid: attendee.amountPaid,
      tripType: attendee.tripType
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
    return null;
  }
}

export async function updateAttendeeFirestore(
  id: string,
  data: Partial<Omit<Attendee, "id">>,
  customConfig = firebaseConfig
): Promise<boolean> {
  const targetDb = getFirestoreDb(customConfig) || db;
  const path = `attendees/${id}`;
  try {
    const docRef = doc(targetDb, "attendees", id);
    await updateDoc(docRef, data);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
    return false;
  }
}

export async function deleteAttendeeFirestore(
  id: string,
  customConfig = firebaseConfig
): Promise<boolean> {
  const targetDb = getFirestoreDb(customConfig) || db;
  const path = `attendees/${id}`;
  try {
    const docRef = doc(targetDb, "attendees", id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
    return false;
  }
}

export async function updateTripSettingsFirestore(
  settings: Partial<TripSettings>,
  customConfig = firebaseConfig
): Promise<boolean> {
  const targetDb = getFirestoreDb(customConfig) || db;
  const path = "settings/trip";
  try {
    const docRef = doc(targetDb, "settings", "trip");
    await setDoc(docRef, settings, { merge: true });
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
    return false;
  }
}
