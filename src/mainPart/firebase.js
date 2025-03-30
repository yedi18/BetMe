// src/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoldDnoBESH5qoRfGj9AY_IV9Xc8cM92M",
  authDomain: "betme-dfb1a.firebaseapp.com",
  projectId: "betme-dfb1a",
  storageBucket: "betme-dfb1a.firebasestorage.app",
  messagingSenderId: "8533707517",
  appId: "1:8533707517:web:97e189fa0418d6b9bd8c94",
  measurementId: "G-7V9S72Y75M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ עטוף את ההתחברות ככה כדי שיזכור את המשתמש
const loginWithGoogle = async () => {
  await setPersistence(auth, browserLocalPersistence);
  return signInWithPopup(auth, provider);
};

export { auth, provider, loginWithGoogle, signOut };
