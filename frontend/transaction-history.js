// import { auth, db } from "./firebase.js";
// import { onAuthStateChanged }
// from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// const list = document.getElementById("transactionList");

// onAuthStateChanged(auth, user => {
//   if (!user) return;

//   const q = query(
//     collection(db, "transactions"),
//     where("participants", "array-contains", user.uid),
//     orderBy("createdAt", "desc")
//   );

//   onSnapshot(q, snap => {
//     list.innerHTML = "";

//     if (snap.empty) {
//       list.innerHTML = "<p>No transactions</p>";
//       return;
//     }

//     snap.forEach(doc => {
//       const t = doc.data();
//       const isSender = t.senderId === user.uid;

//       list.innerHTML += `
//         <div>
//           ${isSender ? "-" : "+"} ₹${t.amount}
//           (${isSender ? "Sent" : "Received"})
//         </div>
//       `;
//     });
//   });
// });
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("transactionList");

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const q = query(
    collection(db, "transactions"),
    where("participants", "array-contains", user.uid),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML = "<p>No transactions found.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const t = doc.data();
      const isSender = t.senderId === user.uid;

      list.innerHTML += `
        <div class="list-item ${isSender ? "debit" : "credit"}">
          ${isSender ? "-" : "+"} ₹${t.amount} • ${isSender ? "Sent" : "Received"}
        </div>
      `;
    });
  });
});
