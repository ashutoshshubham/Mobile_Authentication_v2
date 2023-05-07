// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByybJY9tHjOOSmCAD7uZ-fQKNBgsMgA14",
  authDomain: "react-authentication-8162d.firebaseapp.com",
  projectId: "react-authentication-8162d",
  storageBucket: "react-authentication-8162d.appspot.com",
  messagingSenderId: "290091224918",
  appId: "1:290091224918:web:52c90a1ec9e39b957a50f7",
  measurementId: "G-LQ81C1TD9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app) 