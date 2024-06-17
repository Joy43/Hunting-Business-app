// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg4qzu9VlnVJLSqvqN9aJ6Lxg6DcRQtgk",
  authDomain: "hunting-business.firebaseapp.com",
  projectId: "hunting-business",
  storageBucket: "hunting-business.appspot.com",
  messagingSenderId: "182714937618",
  appId: "1:182714937618:web:48e086a763ea6a94e8c3cb",
  measurementId: "G-8XBPEEQG7X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);