
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { auth, db } from "./firebase.ts";
import { User, UserProgress, JournalEntry } from "../types.ts";

// Helper to check if Firebase is effectively initialized
const isFirebaseReady = () => {
  return auth && auth.app && auth.app.options && (auth.app.options as any).apiKey;
};

// --- User Services ---

export const createUserProfile = async (user: User) => {
  if (!isFirebaseReady()) return; // Skip if offline/demo
  try {
    const userRef = doc(db, "users", user.id);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        ...user,
        createdAt: Timestamp.now(),
        xp: 0,
        streak: 0
      });
      // Initialize progress
      await setDoc(doc(db, "users", user.id, "data", "progress"), {
        completedChapters: [],
        quizScores: {}
      });
    }
  } catch (e) {
    console.warn("Firestore error (createUserProfile):", e);
  }
};

export const getUserProfile = async (userId: string): Promise<User | null> => {
  if (!isFirebaseReady()) return null;
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    return snap.exists() ? (snap.data() as User) : null;
  } catch (e) {
    console.warn("Firestore error (getUserProfile):", e);
    return null;
  }
};

export const updateUserProfileData = async (userId: string, data: Partial<User>) => {
  if (!isFirebaseReady()) return;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, data);
  } catch (e) {
    console.warn("Firestore error (updateUserProfileData):", e);
  }
};

export const updateUserPaymentStatus = async (userId: string) => {
  if (!isFirebaseReady()) return;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isPaid: true });
  } catch (e) {
    console.warn("Firestore error (updateUserPaymentStatus):", e);
  }
};

// --- Progress Services ---

export const saveUserProgress = async (userId: string, progress: UserProgress) => {
  if (!isFirebaseReady()) return;
  try {
    const progressRef = doc(db, "users", userId, "data", "progress");
    await setDoc(progressRef, progress, { merge: true });
  } catch (e) {
    console.warn("Firestore error (saveUserProgress):", e);
  }
};

export const getUserProgress = async (userId: string): Promise<UserProgress> => {
  if (!isFirebaseReady()) return { completedChapters: [], quizScores: {} };
  try {
    const progressRef = doc(db, "users", userId, "data", "progress");
    const snap = await getDoc(progressRef);
    if (snap.exists()) return snap.data() as UserProgress;
    return { completedChapters: [], quizScores: {} };
  } catch (e) {
    console.warn("Firestore error (getUserProgress):", e);
    return { completedChapters: [], quizScores: {} };
  }
};

// --- Journal Services ---

export const saveJournalEntry = async (userId: string, entry: JournalEntry) => {
  if (!isFirebaseReady()) return;
  try {
    const journalRef = doc(db, "users", userId, "journal", entry.id);
    await setDoc(journalRef, entry);
  } catch (e) {
    console.warn("Firestore error (saveJournalEntry):", e);
  }
};

export const getJournalEntries = async (userId: string): Promise<JournalEntry[]> => {
  if (!isFirebaseReady()) return [];
  try {
    const journalCollectionRef = collection(db, "users", userId, "journal");
    const querySnapshot = await getDocs(journalCollectionRef);
    return querySnapshot.docs.map(doc => doc.data() as JournalEntry);
  } catch (e) {
    console.warn("Firestore error (getJournalEntries):", e);
    return [];
  }
};

// --- Game/Simulator Stats Services ---

export const updateGameStats = async (userId: string, xp: number, streak: number) => {
  if (!isFirebaseReady()) return;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { xp, streak });
  } catch (e) {
    console.warn("Firestore error (updateGameStats):", e);
  }
};

export const getGameStats = async (userId: string) => {
  if (!isFirebaseReady()) return { xp: 0, streak: 0 };
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      return { xp: data?.xp || 0, streak: data?.streak || 0 };
    }
    return { xp: 0, streak: 0 };
  } catch (e) {
    console.warn("Firestore error (getGameStats):", e);
    return { xp: 0, streak: 0 };
  }
};
