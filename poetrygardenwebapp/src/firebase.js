import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

<<<<<<< HEAD
=======
  
>>>>>>> b712c03ae117459d593e21dc0af26e2b940c5395
};
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
