let USERID = null;

document.getElementById("logout").addEventListener("click", function () {
  window.location.href = "../logout.php";
});

document.addEventListener("DOMContentLoaded", function () {
  let usersData = []; // Store all users for searching

  function fetchUsers() {
    fetch("../../Database/fetch.php")
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = ""; // Clear table

        // Exclude admins
        let filteredUsers = data.filter((user) => user.Admin !== "1" && user.Admin !== 1);

        // Store the data globally for searching
        usersData = filteredUsers;

        applyFiltersAndSearch(); // Apply filtering & searching
      })
      .catch((error) => console.error("Error fetching users:", error));
  }

  function applyFiltersAndSearch() {
    let filteredUsers = [...usersData]; // Copy of all users

    // Get selected filters
    const selectedStrand = document.getElementById("strandFilter").value;
    const sortOrder = document.getElementById("sortOrder").value;
    const searchQuery = document.getElementById("searchInput").value.trim();

    // Filter by Strand if not "all"
    if (selectedStrand !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.Strand === selectedStrand);
    }

    if (searchQuery !== "") {
      const fuse = new Fuse(filteredUsers, {
        keys: ["LastName"], // Only search by Last Name
        threshold: 0.4, // Controls fuzziness (lower = stricter match)
      });

      filteredUsers = fuse.search(searchQuery).map((result) => result.item);
    }

    // Sort Alphabetically (A-Z or Z-A) based on LastName
    filteredUsers.sort((a, b) => {
      const nameA = a.LastName.toLowerCase();
      const nameB = b.LastName.toLowerCase();

      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    populateTable(filteredUsers);
  }

  function populateTable(users) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear table

    if (users.length === 0) {
      // Instead of adding a row, we add a separate message
      tableBody.innerHTML = `
        <tr class="no-user-row">
          <td colspan="5" style="text-align: center; font-weight: bold;">No user found</td>
        </tr>`;
      return;
    }

    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.LastName || "N/A"}</td>
        <td>${user.GivenName || "N/A"}</td>
        <td>${user.MI || "N/A"}</td>
        <td>${user.Suffix || "N/A"}</td>
        <td>${user.Strand || "N/A"}</td>
      `;

      // Add click event listener to open user details
      tr.addEventListener("click", function () {
        openUserDetails(user.userId);
      });

      tableBody.appendChild(tr);
    });
  }

  // Add event listeners
  document.getElementById("strandFilter").addEventListener("change", applyFiltersAndSearch);
  document.getElementById("sortOrder").addEventListener("change", applyFiltersAndSearch);
  document.getElementById("searchInput").addEventListener("input", applyFiltersAndSearch);

  fetchUsers(); // Initial fetch
  setInterval(fetchUsers, 5000); // Refresh every 5 seconds
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
      USERID = data.userId;

      // Update modal content with fetched data
      document.getElementById("full-name").textContent = `${data.GivenName} ${data.MI ? data.MI + "." : ""} ${data.LastName} ${data.Suffix && data.Suffix !== "N/A" ? data.Suffix : ""}`;

      document.getElementById("email").textContent = data.Email;
      document.getElementById("gender").textContent = data.Gender;
      document.getElementById("birthday").textContent = data.Birthday;
      document.getElementById("address").textContent = data.Address;
      document.getElementById("lrn").textContent = data.Lrn;
      document.getElementById("graduated").textContent = data.Graduated;
      document.getElementById("PSname").textContent = data.Previous_school;
      document.getElementById("PSaddress").textContent = data.Previous_school_address;
      document.getElementById("strand").textContent = data.Strand;

      console.log("User Picture Path:", data.User_picture);

      document.getElementById("UserPicture").src = data.User_picture ? data.User_picture : "../../1-Assest/PlaceHolder.png";
      document.getElementById("userlink").href = data.User_picture;
      document.getElementById("CardPicture").src = data.Card_picture ? data.Card_picture : "../../1-Assest/PlaceHolder.png";
      document.getElementById("cardlink").href = data.Card_picture;

      // Show modal
      document.getElementById("user-details").classList.remove("hidden");
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

// Function to close modal
function closeDetails() {
  document.getElementById("user-details").classList.add("hidden");
}

document.getElementById("PasswordBack").addEventListener("click", function () {
  document.getElementById("PassworDiv").style.display = "none";
});

document.getElementById("changepassword").addEventListener("click", function () {
  document.getElementById("PassworDiv").style.display = "block";
});

document.getElementById("showbutton").addEventListener("click", function () {
  let first = document.getElementById("Firstpassword");
  let second = document.getElementById("confirm");

  let newType = first.type === "password" ? "text" : "password";
  first.type = newType;
  second.type = newType;
});

document.getElementById("submitbutton").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("PassworDiv").style.display = "none";

  const newPassword = document.getElementById("Firstpassword").value.trim();
  const confirmPassword = document.getElementById("confirm").value.trim();

  // Check if the password fields are empty
  if (!newPassword || !confirmPassword) {
    alert("Password fields cannot be empty!");
    return;
  }

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  fetch("change.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: USERID, password: newPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Password changed successfully!");
      } else {
        alert("Error: " + data.error);
      }
    })
    .catch((error) => console.error("Error updating password:", error));
});

document.getElementById("delete").addEventListener("click", function () {
  if (!USERID) {
    alert("No user selected!");
    return;
  }

  if (confirm("Are you sure you want to delete this Student?")) {
    fetch("delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: USERID }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Student deleted successfully!");
          document.getElementById("user-details").classList.add("hidden"); // Close modal
          fetchUsers(); // Refresh user list
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((error) => console.error("Error deleting Student:", error));
  }
});

document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  document.getElementById("searchInput").dispatchEvent(new Event("input"));
});

document.getElementById("filterbackgroundarrowdown").addEventListener("click", function () {
  let background = document.getElementById("filterbackground");
  background.style.animation = "FilterShow 0.5s ease-in ";
  background.addEventListener(
    "animationend",
    function () {
      background.style.top = "0em";
      document.getElementById("filterbackgroundarrowdown").style.display = "none";
      document.getElementById("filterbackgroundarrow").style.display = "block";
    },
    { once: true }
  );
});

document.getElementById("filterbackgroundarrow").addEventListener("click", function () {
  let background = document.getElementById("filterbackground");
  background.style.animation = "FilterHide 0.5s ease-in ";
  background.addEventListener(
    "animationend",
    function () {
      background.style.top = "-3em";
      document.getElementById("filterbackgroundarrowdown").style.display = "block";
      document.getElementById("filterbackgroundarrow").style.display = "none";
    },
    { once: true }
  );
});
