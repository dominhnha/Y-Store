// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnFU-bXoZI0WnsHbKgD_HSyBXtxcVHbVU",
  authDomain: "cafestore-dde09.firebaseapp.com",
  databaseURL: "https://cafestore-dde09-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cafestore-dde09",
  storageBucket: "cafestore-dde09.appspot.com",
  messagingSenderId: "234710100119",
  appId: "1:234710100119:web:ab27fd8200aa73aa0f61d2",
  measurementId: "G-W6X97HBMYM"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default auth;