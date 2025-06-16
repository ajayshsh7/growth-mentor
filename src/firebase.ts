import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const APIKEY = import.meta.env.FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "bookwise-7da3c.firebaseapp.com",
  projectId: "bookwise-7da3c",
  appId: "1:213466128975:web:575d48fae2031a7be0003a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);