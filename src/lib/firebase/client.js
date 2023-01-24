// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIVKqxSP8YFD24tRo4me43UvotfvQq96s",
  authDomain: "jecco-2589d.firebaseapp.com",
  projectId: "jecco-2589d",
  storageBucket: "jecco-2589d.appspot.com",
  messagingSenderId: "390275404999",
  appId: "1:390275404999:web:096d3a6d27903cf9d55ae2",
  measurementId: "G-XJ1T6X31L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
