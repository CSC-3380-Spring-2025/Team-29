import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA8a1fYSagmKb41CjTSI5PuwsMthN0Om_o",
  authDomain: "poetrygardenfirebase.firebaseapp.com",
  projectId: "poetrygardenfirebase",
  storageBucket: "poetrygardenfirebase.firebasestorage.app",
  messagingSenderId: "555010384916",
  appId: "1:555010384916:web:ef1e7c2f5e8b83e96cf301",
  measurementId: "G-3PXXRHKZYM"
};

// initialize the Firebase App & Firestore:
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// point at your "gardens" collection:
const gardensCol = collection(db, "gardens");

/** fetchGardens(): load all docs from /gardens */
export async function fetchGardens() {
  const snap = await getDocs(gardensCol);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** addGarden(poem): add a new poem to /gardens */
export async function addGarden(poem) {
  // you can include a timestamp if you like
  return await addDoc(gardensCol, {
    ...poem,
    createdAt: serverTimestamp()
  });
}
