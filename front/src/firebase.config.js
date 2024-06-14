// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZx_E1lWsKyKOHXZlIgW0Gwd6QV7WeK4I",
  authDomain: "messenger-c5cce.firebaseapp.com",
  projectId: "messenger-c5cce",
  storageBucket: "messenger-c5cce.appspot.com",
  messagingSenderId: "851708184113",
  appId: "1:851708184113:web:d8dbefb63d3d623de87710",
  measurementId: "G-YQX41NXZP0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
