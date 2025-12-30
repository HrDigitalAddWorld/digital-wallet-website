// register.js
import { auth, app } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore(app);

// Generate 9-digit numeric ID
function generate9DigitId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential =
      await createUserWithEmailAndPassword(auth, email.value, password.value);

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: fullName.value
    });

    const customUserId = generate9DigitId();

    await setDoc(doc(db, "users", user.uid), {
      name: fullName.value,
      email: user.email,
      customUserId: customUserId,
      createdAt: serverTimestamp()
    });

    alert(`Registration successful!\nYour User ID: ${customUserId}`);
    window.location.href = "login.html";

  } catch (err) {
    alert(err.message);
  }
});
