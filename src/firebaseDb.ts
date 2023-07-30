import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { app } from "./firebaseConfig";

export const db = getFirestore(app);

// helpers

// add data
export const firestoreAddData = async (user: User): Promise<void> => {
  const collectionRef = collection(db, "users");
  await setDoc(doc(collectionRef, user.userId), user);
};

// get data
export const firestoreGetData = async (
  id: string
): Promise<DocumentData | null> => {
  const docRef = doc(db, "users", id);
  return getDoc(docRef);
};
