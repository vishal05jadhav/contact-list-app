// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVa7xoRydAQl8A7bTwArrj3GEHKQsLuqs",
  authDomain: "vite-contact-7cafd.firebaseapp.com",
  projectId: "vite-contact-7cafd",
  storageBucket: "vite-contact-7cafd.appspot.com",
  messagingSenderId: "582731814477",
  appId: "1:582731814477:web:9a4d01b09b4e7ed8b92e04"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)
