function togglePassword() {
  let eyeIcon = document.getElementById("eye");
  let password = document.getElementById("password");

  if (password.type === "password") {
    password.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    eyeIcon.classList.add("fa-eye");
    eyeIcon.classList.remove("fa-eye-slash");
  }
}

function singup() {
  let transition = document.getElementById("transition");

  transition.classList.add("animate");
  transition.style.display = "block";

  transition.addEventListener(
    "animationend",
    function () {
      window.location.href = "Registration/registration.html"; // Change to your target page
    },
    { once: true }
  ); // Ensure it only triggers once
}

document.getElementById("submit").addEventListener("submit", function (event) {
  event.preventDefault();

  let formData = new FormData(this);

  fetch("Database/login.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("success")) {
      } else {
        document.getElementById("message").textContent = data; // Show error
      }
    })
    .catch((error) => console.error("Error:", error));
});
