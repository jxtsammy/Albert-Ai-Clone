import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAniS8Sjt1uxlt3StBdv2tAkIldiVkXfpc",
  authDomain: "albet-ai.firebaseapp.com",
  projectId: "albet-ai",
  storageBucket: "albet-ai.firebasestorage.app",
  messagingSenderId: "216448877942",
  appId: "1:216448877942:web:21e31441200b20ee892657",
  measurementId: "G-VBS7D1FFR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);

// Export Firebase services
export { auth, firestore };