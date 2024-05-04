// login.js
document.getElementById("loginBtn").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validate username and password (you can replace this with your validation logic)
  if (username === "admin" && password === "password") {
    localStorage.setItem("username", username);
    window.location.href = "resume.html"; // Redirect to resume page after successful login
  } else {
    document.getElementById("loginError").textContent =
      "Invalid username or password";
  }
});
