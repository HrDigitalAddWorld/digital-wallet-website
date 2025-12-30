// Import firebase modules
import { auth, db } from './firebase.js'; // tumhare firebase config file
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const userNameEl = document.getElementById('userName');
const walletBalanceEl = document.getElementById('walletBalance');
const addMoneyBtn = document.getElementById('addMoneyBtn');
const amountInput = document.getElementById('amountInput');

let currentUserId = null;

// User login check
// Inside onAuthStateChanged callback, replace user.email line with Firestore fetch

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUserId = user.uid;

    // Fetch customUserId from Firestore 'users' collection
    const userDocRef = doc(db, "users", currentUserId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      userNameEl.innerText = `User ID: ${userData.customUserId || user.uid}`;
    } else {
      userNameEl.innerText = `User ID: ${user.uid}`; // fallback
    }

    // The rest of your wallet loading code here...
  }
});


// Add money button event
addMoneyBtn.addEventListener('click', async () => {
  const amount = parseFloat(amountInput.value);
  if (!amount || amount <= 0) {
    alert("Please enter a valid amount greater than 0.");
    return;
  }

  if (!currentUserId) {
    alert("User not logged in");
    return;
  }

  const walletDocRef = doc(db, "wallets", currentUserId);
  const walletSnap = await getDoc(walletDocRef);

  if (walletSnap.exists()) {
    const currentBalance = walletSnap.data().balance || 0;
    const newBalance = currentBalance + amount;

    await updateDoc(walletDocRef, { balance: newBalance });
    walletBalanceEl.innerText = `₹ ${newBalance.toFixed(2)}`;
    amountInput.value = '';
    alert("Money added successfully!");
  } else {
    // Agar wallet document nahi hai to create karo
    await setDoc(walletDocRef, { balance: amount });
    walletBalanceEl.innerText = `₹ ${amount.toFixed(2)}`;
    amountInput.value = '';
    alert("Money added successfully!");
  }
});
