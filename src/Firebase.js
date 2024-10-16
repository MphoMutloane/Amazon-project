import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4FY_wr6UUuo8n_6Uqcq5EjKcL3A6eWvA",
  authDomain: "project-3c315.firebaseapp.com",
  projectId: "project-3c315",
  storageBucket: "project-3c315.appspot.com",
  messagingSenderId: "922418434115",
  appId: "1:922418434115:web:20e0bc3c20ed60537f84f6",
  measurementId: "G-JY2F8P851F"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };