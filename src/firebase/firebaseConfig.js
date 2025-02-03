import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGq3XOUNV7kelI2ufZgCZu5_3Z1rkuLj0",
  authDomain: "hackathons-top.firebaseapp.com",
  projectId: "hackathons-top",
  storageBucket: "hackathons-top.firebasestorage.app",
  messagingSenderId: "799294874446",
  appId: "1:799294874446:web:7b64a06f78f6fd3700341f",
  measurementId: "G-SMPVNKQD5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore
export { db };
