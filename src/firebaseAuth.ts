import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebaseConfig";

export const auth = getAuth(app);

export async function firebaseRegisterEmailAndPassword(
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function firebaseSignInEmailAndPassword(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function firebaseSignOut() {
  return signOut(auth);
}

export function firebaseCheckAuthStatus() {
  return onAuthStateChanged(auth, (user) => {
    if (user) return true;
    else return false;
  });
}
