import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANeY_aXJIIbTgYE3ezP08pzTQAjjpK5Ko",
  authDomain: "web-institucional-3f888.firebaseapp.com",
  projectId: "web-institucional-3f888",
  storageBucket: "web-institucional-3f888.firebasestorage.app",
  messagingSenderId: "931579284239",
  appId: "1:931579284239:web:4b684425147724d4b48c7a",
  measurementId: "G-WGJNH8SPY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Exporta las instancias que necesitaremos
export const auth = getAuth(app);
export const db = getFirestore(app);