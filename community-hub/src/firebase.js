// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyA8a1fYSagmKb41CjTSI5PuwsMthN0Om_o",
  authDomain: "poetrygardenfirebase.firebaseapp.com",
  projectId: "poetrygardenfirebase",
  storageBucket: "poetrygardenfirebase.firebasestorage.app",
  messagingSenderId: "555010384916",
  appId: "1:555010384916:web:ef1e7c2f5e8b83e96cf301",
  measurementId: "G-3PXXRHKZYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in your components
export const auth = getAuth(app);
export const db = getFirestore(app);


export default app;
