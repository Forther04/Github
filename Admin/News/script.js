document.addEventListener("DOMContentLoaded", function () {
  fetch("../../Database/fetch_news.php")
    .then((response) => response.json())
    .then((data) => {
      // Check for errors
      if (data.error) {
        console.error("Error fetching news:", data.error);
        return;
      }

      const container = document.getElementById("blackbg");

      data.forEach((news) => {
        // Create the main container div for a news item
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("fetchnews");

        // Create the Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";
        // Set a data attribute with the news ID for later use (e.g., deletion)
        deleteBtn.setAttribute("data-id", news.id);

        // Create the image element
        const img = document.createElement("img");
        img.classList.add("imagenews");
        if (news.image_path) {
          // Extract the filename from the returned path
          const filename = news.image_path.substring(news.image_path.lastIndexOf("/") + 1);
          // Prepend the correct folder path
          img.src = "../../Database/news/" + filename;
        } else {
          // Fallback image if no image_path provided
          img.src = "../../1-Assest/PlaceHolder.png";
        }
        img.title = "news";

        // Create the title element
        const title = document.createElement("h4");
        title.classList.add("newstitle");
        title.textContent = news.title;

        // Create the description container and paragraph
        const descDiv = document.createElement("div");
        descDiv.classList.add("newsdescription");
        const p = document.createElement("p");
        p.textContent = news.description;
        descDiv.appendChild(p);

        // Append all elements to the newsDiv
        newsDiv.appendChild(deleteBtn);
        newsDiv.appendChild(img);
        newsDiv.appendChild(title);
        newsDiv.appendChild(descDiv);

        // Append the newsDiv to the container
        container.appendChild(newsDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // Delegate event listener to container (#blackbg)
  document.getElementById("blackbg").addEventListener("click", function (e) {
    // Check if the clicked element has the class "delete"
    if (e.target && e.target.classList.contains("delete")) {
      const newsId = e.target.getAttribute("data-id");

      if (confirm("Are you sure you want to delete this news item?")) {
        // Send deletion request to the server
        fetch("../../Database/news_delete.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: newsId }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              // Optionally remove the news item from the DOM
              const newsDiv = e.target.closest(".fetchnews");
              if (newsDiv) {
                newsDiv.remove();
              }
              alert("News item deleted successfully.");
            } else {
              alert("Error deleting news: " + data.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while deleting the news item.");
          });
      }
    }
  });
});

document.getElementById("logout").addEventListener("click", function () {
  window.location.href = "../logout.php";
});

// File input change event for preview remains the same
document.getElementById("fileInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("imagepic").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("ImageForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const fileInput = document.getElementById("fileInput");
  const titleInput = document.getElementById("titletext");
  const descriptionInput = document.getElementById("description");

  // Validation: Check if any required field is empty
  if (fileInput.files.length === 0 || titleInput.value.trim() === "" || descriptionInput.value.trim() === "") {
    alert("Please fill in all fields before submitting the form.");
    return; // Stop execution if validation fails
  }

  // Create FormData and append the submit button value manually
  const form = document.getElementById("ImageForm");
  const formData = new FormData(form);
  formData.append("createnews", "1"); // Ensure this field is sent to PHP

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Display an alert with the response message
      alert(data.message);
      // Redirect based on success or error
      window.location.href = "news.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    });
});
