document.getElementById("logout").addEventListener("click", function () {
  window.location.href = "../logout.php";
});

document.addEventListener("DOMContentLoaded", function () {
  function fetchUsers() {
    fetch("../../Database/fetch.php") // Fetch data from PHP file
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = ""; // Clear existing table rows

        data.forEach((user) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>${user.LastName || "N/A"}</td>
            <td>${user.GivenName || "N/A"}</td>
            <td>${user.MI || "N/A"}</td>
            <td>${user.Suffix || "N/A"}</td>
            <td>${user.Strand || "N/A"}</td>
          `;

          // ✅ Attach click event to open user details
          tr.addEventListener("click", () => openUserDetails(user.userId));

          tableBody.appendChild(tr);
        });
      })
      .catch((error) => console.error("Error fetching users:", error));
  }

  fetchUsers(); // Load data initially
  setInterval(fetchUsers, 5000); // Refresh data every 5 seconds
});

// Function to fetch and display user details
function openUserDetails(userId) {
  fetch(`../../Database/fetch_user_info.php?id=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched user data:", data);
      if (data.error) {
        alert("User not found.");
        return;
      }

      // Update modal content with fetched data
      document.getElementById("full-name").textContent = `${data.GivenName} ${
        data.MI ? data.MI + "." : ""
      } ${data.LastName} ${data.Suffix || ""}`;
      document.getElementById("email").textContent = data.Email;
      document.getElementById("gender").textContent = data.Gender;
      document.getElementById("birthday").textContent = data.Birthday;
      document.getElementById("address").textContent = data.Address;
      document.getElementById("lrn").textContent = data.Lrn;
      document.getElementById("graduated").textContent = data.Graduated;
      document.getElementById("PSname").textContent = data.Previous_school;
      document.getElementById("PSaddress").textContent =
        data.Previous_school_address;
      document.getElementById("strand").textContent = data.Strand;

      document.querySelector(".PICTURE").src = data.User_picture
        ? data.User_picture
        : "../../1-Assest/PlaceHolder.png";
      document.querySelector(".PICTURE1").src = data.Card_picture
        ? data.User_picture
        : "../../1-Assest/PlaceHolder.png";

      // Show modal
      document.getElementById("user-details").classList.remove("hidden");
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

// Function to close modal
function closeDetails() {
  document.getElementById("user-details").classList.add("hidden");
}
