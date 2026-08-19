import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  // @ts-ignore
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD0y0Kt81KDwp74D_DN2e_TlyLa7tKrvnQ",
  // @ts-ignore
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "formulir-7d32e.firebaseapp.com",
  // @ts-ignore
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "formulir-7d32e",
  // @ts-ignore
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "formulir-7d32e.firebasestorage.app",
  // @ts-ignore
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "845052648008",
  // @ts-ignore
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:845052648008:web:563158a7166608735b167d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, query, orderBy, Timestamp };




