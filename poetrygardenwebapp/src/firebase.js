// frontend/app/src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helpers
export const gardensCol = collection(db, 'gardens');
export async function createGardenPoem(poem) {
  return await addDoc(gardensCol, poem);
}
export async function fetchAllGardens() {
  const snapshot = await getDocs(gardensCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
// Real‑time listener (optional)
export function onGardensUpdate(cb) {
  return onSnapshot(gardensCol, snapshot =>
    cb(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
  );
}