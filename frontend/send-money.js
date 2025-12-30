import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const amountInput = document.getElementById("amount");
const receiverUidInput = document.getElementById("receiver"); // UID ONLY
const sendBtn = document.getElementById("sendBtn");

let currentUser;

onAuthStateChanged(auth, user => {
  if (!user) location.href = "login.html";
  currentUser = user;
});

sendBtn.addEventListener("click", async () => {
  const amount = Number(amountInput.value);
  const receiverUid = receiverUidInput.value.trim();

  if (!amount || !receiverUid) {
    alert("Fill all fields");
    return;
  }

  if (receiverUid === currentUser.uid) {
    alert("Cannot send to yourself");
    return;
  }

  await addDoc(collection(db, "transactions"), {
    senderId: currentUser.uid,
    receiverId: receiverUid,
    participants: [currentUser.uid, receiverUid],
    amount,
    type: "send",
    status: "success",
    createdAt: serverTimestamp()
  });

  alert("Money sent");
});
