import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, query, where, orderBy, getDocs }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("receiveList");

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const q = query(
    collection(db, "transactions"),
    where("receiverId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  list.innerHTML = "";

  snapshot.forEach(doc => {
    const t = doc.data();
    list.innerHTML += `
      <div class="list-item credit">
        + ₹${t.amount} • Received
      </div>
    `;
  });
});
