// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: `AIzaSyAy6AR3yWwH1VmBmRk9gEr8AoNwRgCHDp8`,
    authDomain: "ai-writter-c2311.firebaseapp.com",
    projectId: "ai-writter-c2311",
    storageBucket: "ai-writter-c2311.appspot.com",
    messagingSenderId: "1015141776790",
    appId: "1:1015141776790:web:aa3c3a1f971644182cb1b7",
    measurementId: "G-43PRH25NDZ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
