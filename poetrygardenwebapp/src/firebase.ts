import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export async function fetchGardens() {
  const snapshot = await getDocs(collection(db, "gardens"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addGarden(poem) {
  await addDoc(collection(db, "gardens"), poem);
}
