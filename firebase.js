import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAhIL1ejFntJy8SN6Gm7gfGIgMtzEefybI",
    authDomain: "notepad-944ad.firebaseapp.com",
    projectId: "notepad-944ad",
    storageBucket: "notepad-944ad.appspot.com",
    messagingSenderId: "185552855055",
    appId: "1:185552855055:web:4545f21dcb6305079dc37a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = initializeFirestore(app, { experimentalForceLongPolling: true })


export { db, auth }