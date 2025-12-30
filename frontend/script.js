// ---------------- Register User ----------------
function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if(!name || !email || !password){
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Register successful");

  // Redirect to login page
  window.location.href = "login.html";  // login page ka filename
}

// ---------------- Login User ----------------
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No user found. Please register first.");
    return;
  }

  if (user.email === email && user.password === password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html";  // home page ka filename
  } else {
    alert("Invalid credentials");
  }
}

// ---------------- Check if logged in ----------------
function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Temporarily comment out login check
  // if (localStorage.getItem("loggedIn") !== "true") {
  //   window.location.href = "login.html";  // login page
  //   return;
  // }

  // Show user info if available
  if(user){
    document.getElementById("userEmail").innerText = "Welcome " + user.email;
  } else {
    document.getElementById("userEmail").innerText = "Welcome Guest";
  }
}

// ---------------- Logout ----------------
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// ---------------- Page Switch Links ----------------
function goToRegister() {
  window.location.href = "register.html";
}

function goToLogin() {
  window.location.href = "login.html";
}
