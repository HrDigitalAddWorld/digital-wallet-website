// help-support.js

import { auth, db } from './firebase.js';  // Your firebase config export
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const categorySelect = document.getElementById("category");
const messageTextarea = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

let currentUser = null;

// Listen for auth state changes to check if user is logged in
onAuthStateChanged(auth, user => {
  if (!user) {
    // If not logged in, redirect to login page
    window.location.href = "login.html";
  } else {
    // Store current user info
    currentUser = user;
  }
});

// When Submit button is clicked
submitBtn.addEventListener("click", async () => {
  const category = categorySelect.value.trim();
  const message = messageTextarea.value.trim();

  // Validation
  if (!category) {
    alert("Please select an issue category");
    return;
  }
  if (!message) {
    alert("Please describe your issue");
    return;
  }
  if (!currentUser) {
    alert("User not logged in");
    return;
  }

  try {
    // Add new support ticket document in Firestore
    await addDoc(collection(db, "supportTickets"), {
      userId: currentUser.uid,
      email: currentUser.email,
      category: category,
      message: message,
      createdAt: serverTimestamp(),
      status: "open"
    });

    alert("Your issue has been submitted. We will get back to you soon!");

    // Clear form fields after successful submit
    categorySelect.value = "";
    messageTextarea.value = "";

  } catch (error) {
    alert("Error submitting issue: " + error.message);
  }
});
