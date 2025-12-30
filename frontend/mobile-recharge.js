// mobile-recharge.js
import { auth, db } from './firebase.js';
import { onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const phoneInput = document.getElementById("phoneNumber");
const operatorInput = document.getElementById("operator");
const circleInput = document.getElementById("circle");
const amountInput = document.getElementById("amount");
const rechargeBtn = document.getElementById("rechargeBtn");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;
  }
});

rechargeBtn.addEventListener("click", async () => {
  const phoneNumber = phoneInput.value.trim();
  const operator = operatorInput.value.trim();
  const circle = circleInput.value.trim();
  const amount = Number(amountInput.value.trim());

  if (!phoneNumber || !operator || !circle || !amount) {
    alert("Please fill all the fields before submitting.");
    return;
  }

  if (!currentUser) {
    alert("User not logged in");
    return;
  }

  try {
    // 🔹 Recharge details
    await addDoc(collection(db, "recharges"), {
      userId: currentUser.uid,
      phoneNumber,
      operator,
      circle,
      amount,
      createdAt: serverTimestamp(),
      status: "success"
    });

    // 🔹 Transaction history
    await addDoc(collection(db, "transactions"), {
      senderId: currentUser.uid,
      receiverId: "mobile-recharge",
      participants: [currentUser.uid],
      amount: amount,
      type: "recharge",
      createdAt: serverTimestamp(),
      status: "success"
    });

    alert("Recharge successful 📱");

    phoneInput.value = "";
    operatorInput.value = "";
    circleInput.value = "";
    amountInput.value = "";

  } catch (error) {
    alert("Error submitting recharge: " + error.message);
  }
});
