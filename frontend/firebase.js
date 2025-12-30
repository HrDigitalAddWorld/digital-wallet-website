// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIAlaax6RqVjnq3OWo4TOUKmQ_-zAfvOI",
  authDomain: "digitalwalletwebsite.firebaseapp.com",
  projectId: "digitalwalletwebsite",
  storageBucket: "digitalwalletwebsite.firebasestorage.app",
  messagingSenderId: "258903544736",
  appId: "1:258903544736:web:f57d0c14cbc6b2cbfe4ac5",
  measurementId: "G-BCJ5356M3R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);   // <-- Firestore export karo yahan
export const analytics = getAnalytics(app);
