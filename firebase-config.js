// FIREBASE PATAN TV

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaDmOlbQ6XlCCinDRPDOfQmxloBDBohtE",
  authDomain: "patan-tv-studio.firebaseapp.com",
  projectId: "patan-tv-studio",
  storageBucket: "patan-tv-studio.firebasestorage.app",
  messagingSenderId: "459081599803",
  appId: "1:459081599803:web:1cec9799b7007fe699c51e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
