import { auth, db } from "./firebase.js";
import { onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- NAVBAR LOAD ---------------- */
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;

      const script = document.createElement("script");
      script.src = "navbar.js";

      // **ADD THIS** so that import statements inside navbar.js work
      script.type = "module";

      script.onload = () => {
        if (typeof initNavbar === "function") {
          initNavbar();
        }
      };
      document.body.appendChild(script);
    });

  /* ---------------- AUTH CHECK ---------------- */
  onAuthStateChanged(auth, async (user) => {

    const userNameEl = document.getElementById("userName");
    const userBalanceEl = document.getElementById("userBalance");
    const userIDEl = document.getElementById("userID");

    if (!user) {
      window.location.href = "login.html";
      return;
    }

    try {
      // 🔥 Fetch user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let displayName = user.displayName || user.email;
      let customUserId = "N/A";

      if (userSnap.exists()) {
        const data = userSnap.data();
        customUserId = data.customUserId || "N/A";
        displayName = data.name || displayName;
      }

      // ✅ Update UI safely
      if (userNameEl) userNameEl.innerText = displayName;
      if (userBalanceEl) userBalanceEl.innerText = "₹70.00"; // demo
      if (userIDEl) userIDEl.innerText = `User ID: ${customUserId}`;

    } catch (err) {
      console.error("Error loading user data:", err);
    }
  });

  /* ---------------- PAGE NAVIGATION ---------------- */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-link]");
    if (!el) return;

    const link = el.getAttribute("data-link");
    if (link) window.location.href = link;
  });

});
