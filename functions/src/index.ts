import * as functions from "firebase-functions/v1";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

// Reference to adminStats/global document
const statsRef = db.doc("adminStats/global");

// Trigger when a new Firebase Auth user is created
export const onAuthUserCreate = functions.auth.user().onCreate(async () => {
  await statsRef.set(
    {
      totalStudents: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
});
