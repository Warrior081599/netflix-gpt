// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1UNH0chhQk5-_wthjpzZRMqbnWVDgBi0",
  authDomain: "netflixgpt-a7552.firebaseapp.com",
  projectId: "netflixgpt-a7552",
  storageBucket: "netflixgpt-a7552.firebasestorage.app",
  messagingSenderId: "409932016686",
  appId: "1:409932016686:web:c49b0131585049608003bf",
  measurementId: "G-KKLJWD2PQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
