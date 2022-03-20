import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD2EQwYM4oTiLxPqx9J3bM2pAApWWUPYcM",
  authDomain: "thisshop-8998a.firebaseapp.com",
  projectId: "thisshop-8998a",
  storageBucket: "thisshop-8998a.appspot.com",
  messagingSenderId: "357430289709",
  appId: "1:357430289709:web:c7c45125d1570496f55fa4",
  measurementId: "G-LN7JPR48CK",
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth };
