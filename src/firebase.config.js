// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD71eNLf-VEIxNiNcBh4iknRujniaX2tKQ",

  authDomain: "velorepo.firebaseapp.com",

  projectId: "velorepo",

  storageBucket: "velorepo.appspot.com",

  messagingSenderId: "817379103234",

  appId: "1:817379103234:web:e9fc45d9e6970fd1504d1b",

  measurementId: "G-3X6V2380BK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
