// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyB_4eUxixN-t0HqEw0OFmhDf8ZQ2EoH4zw",
    authDomain: "nodapp8.firebaseapp.com",
    projectId: "nodapp8",
    storageBucket: "nodapp8.firebasestorage.app",
    messagingSenderId: "488211841182",
    appId: "1:488211841182:web:38587b84bbf08ab58afb8f",
    measurementId: "G-4HE2NWBY24"
};


const app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

export const db = getFirestore(app);
