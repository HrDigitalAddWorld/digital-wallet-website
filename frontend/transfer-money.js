import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const receiverIdInput = document.getElementById("receiverIdInput");
const amountInput = document.getElementById("amountInput");
const transferBtn = document.getElementById("transferBtn");
const userInfo = document.getElementById("userInfo");

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();

      // Yahan name ki jagah customUserId dikhayein
      userInfo.textContent = `User ID: ${data.customUserId || user.uid}`;
    } else {
      userInfo.textContent = `User ID: ${user.uid}`;
    }
  }
});

transferBtn.addEventListener("click", async () => {
  const receiverUid = receiverIdInput.value.trim();
  const amount = Number(amountInput.value);

  if (!receiverUid || !amount) {
    alert("Fill all fields");
    return;
  }

  if (receiverUid === currentUser.uid) {
    alert("Cannot transfer to yourself");
    return;
  }

  try {
    await addDoc(collection(db, "transactions"), {
      senderId: currentUser.uid,
      receiverId: receiverUid,
      participants: [currentUser.uid, receiverUid],
      amount,
      type: "transfer",
      status: "success",
      createdAt: serverTimestamp()
    });

    alert("Money transferred");

    receiverIdInput.value = "";
    amountInput.value = "";

  } catch (e) {
    alert(e.message);
  }
});
