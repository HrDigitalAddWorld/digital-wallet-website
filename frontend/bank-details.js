import { auth, db } from './firebase.js';  // tumhara firebase config file
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const nameInput = document.getElementById("name");
const bankInput = document.getElementById("bank");
const accountInput = document.getElementById("account");
const ifscInput = document.getElementById("ifsc");
const branchInput = document.getElementById("branch");
const mobileInput = document.getElementById("mobile");

const saveBtn = document.getElementById("saveBtn");
const viewBtn = document.getElementById("viewBtn");

const savedDetailsDiv = document.getElementById("savedDetails");
const sName = document.getElementById("sName");
const sBank = document.getElementById("sBank");
const sAccount = document.getElementById("sAccount");
const sIfsc = document.getElementById("sIfsc");
const sBranch = document.getElementById("sBranch");
const sMobile = document.getElementById("sMobile");

let currentUserId = null;

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Redirect to login if not logged in
    window.location.href = "login.html";
  } else {
    currentUserId = user.uid;
    // Optionally load saved bank details on page load
    await loadBankDetails();
  }
});

async function loadBankDetails() {
  if (!currentUserId) return;

  const docRef = doc(db, "bankDetails", currentUserId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    sName.innerText = data.name;
    sBank.innerText = data.bank;
    sAccount.innerText = data.account;
    sIfsc.innerText = data.ifsc;
    sBranch.innerText = data.branch;
    sMobile.innerText = data.mobile;
    savedDetailsDiv.style.display = "block";
  } else {
    savedDetailsDiv.style.display = "none";
  }
}

saveBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const bank = bankInput.value.trim();
  const account = accountInput.value.trim();
  const ifsc = ifscInput.value.trim();
  const branch = branchInput.value.trim();
  const mobile = mobileInput.value.trim();

  if (!name || !bank || !account || !ifsc || !branch || !mobile) {
    alert("Please fill all details before saving");
    return;
  }

  if (!currentUserId) {
    alert("User not logged in");
    return;
  }

  try {
    const docRef = doc(db, "bankDetails", currentUserId);
    await setDoc(docRef, { name, bank, account, ifsc, branch, mobile });
    alert("Bank details saved successfully ✅");

    // Clear form fields
    nameInput.value = "";
    bankInput.value = "";
    accountInput.value = "";
    ifscInput.value = "";
    branchInput.value = "";
    mobileInput.value = "";

    await loadBankDetails(); // Update saved details display

  } catch (error) {
    alert("Error saving details: " + error.message);
  }
});

viewBtn.addEventListener("click", async () => {
  await loadBankDetails();
  if (savedDetailsDiv.style.display === "none") {
    alert("No saved details found");
  }
});
