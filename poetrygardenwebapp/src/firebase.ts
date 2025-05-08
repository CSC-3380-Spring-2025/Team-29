import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDuMBGqmjeLFdbNQZ77k27JCDgZIK-lcKA",
  authDomain: "poetrygardenfirebase.firebaseapp.com",
  projectId: "poetrygardenfirebase",
  storageBucket: "poetrygardenfirebase.firebasestorage.app",
  messagingSenderId: "555010384916",
  appId: "1:555010384916:web:ef1e7c2f5e8b83e96cf301",
  measurementId: "G-3PXXRHKZYM"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export async function fetchGardens() {
  const snapshot = await getDocs(collection(db, "gardens"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addGarden(poem: { title: string; content: string; author?: string }) {
  await addDoc(collection(db, "gardens"), poem);
}
