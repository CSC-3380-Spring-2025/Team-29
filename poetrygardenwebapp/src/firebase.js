// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

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

// Export Auth instance
export const auth = getAuth(app);

// Export Firestore instance
export const db   = getFirestore(app);

// Reference to the /gardens collection
const gardensCol = collection(db, 'gardens');

// Load all poems from Firestore
export async function fetchGardens() {
  const snap = await getDocs(gardensCol);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Add a new poem to Firestore
export async function addGarden(poem) {
  return await addDoc(gardensCol, {
    ...poem,
    createdAt: serverTimestamp()
  });
}

// Real-time listener
export function onGardensUpdate(cb) {
  return onSnapshot(gardensCol, snapshot =>
    cb(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
  );
}
