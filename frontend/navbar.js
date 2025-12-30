// navbar.js
import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.initNavbar = function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!toggle || !menu) {
    console.error("Navbar elements not found");
    return;
  }

  // 🔥 TOGGLE OPEN / CLOSE
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
  });

  // 🔥 MENU LINKS CLICK
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    const link = e.target.closest("[data-link]");
    if (link) {
      window.location.href = link.dataset.link;
    }
  });

  // 🔥 LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        await signOut(auth);
        window.location.href = "login.html";
      } catch (error) {
        alert("Logout failed: " + error.message);
      }
    });
  }

  // 🔥 OUTSIDE CLICK → CLOSE MENU
  document.addEventListener("click", () => {
    menu.classList.remove("show");
  });
};
