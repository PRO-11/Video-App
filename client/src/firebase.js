// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "video-app-f2221.firebaseapp.com",
  projectId: "video-app-f2221",
  storageBucket: "video-app-f2221.appspot.com",
  messagingSenderId: "612578484828",
  appId: "1:612578484828:web:1ed4afb0eeb8be8dfc3c99",
  measurementId: "G-SLW67Q2ENG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const provider=new GoogleAuthProvider()


export default app