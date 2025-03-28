document.addEventListener("DOMContentLoaded", function () {
  // Logout event listener
  document.getElementById("logout").addEventListener("click", function () {
    window.location.href = "../../Admin/logout.php";
  });

  // Handle opacity change after animation
  document.addEventListener("animationend", function (event) {
    if (event.animationName === "show_news") {
      event.target.classList.add("animation-done");
      event.target.style.opacity = "100%";
    }
  });

  function fetchNews() {
    fetch("../../Database/fetch_news.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching data:", data.error);
          return;
        }

        const container = document.querySelector(".white-background");

        data.forEach((news) => {
          // Check if news item already exists
          if (!document.getElementById(`news-${news.id}`)) {
            const newsItem = document.createElement("div");
            newsItem.classList.add("background");
            newsItem.id = `news-${news.id}`; // Assign unique ID

            const imagePath = news.image_path ? `../../Database/${news.image_path}` : "../../1-Assest/PlaceHolder.png";

            newsItem.innerHTML = `
              <div class="image">
                <img src="${imagePath}" title="image" class="mainimage" />
              </div>
              <hr />
              <div class="TITLE">
                  <h3 class="titletext">${news.title}</h3>
              </div>
              <button type="button" class="showbutton">Click for more information!</button>
              <div class="description">
                  <button type="button" class="back">Back</button>
                  <hr class="hr1" />
                  <p class="DESCRIPTION">${news.description}</p>
              </div>
            `;

            container.appendChild(newsItem);
          }
        });

        addEventListeners(); // Reattach event listeners
      })
      .catch((error) => console.error("Error:", error));
  }

  function addEventListeners() {
    document.querySelectorAll(".showbutton").forEach((button) => {
      button.addEventListener("click", function () {
        this.nextElementSibling.classList.add("active");
      });
    });

    document.querySelectorAll(".back").forEach((button) => {
      button.addEventListener("click", function () {
        this.closest(".description").classList.remove("active");
      });
    });
  }

  fetchNews(); // Initial fetch
  setInterval(fetchNews, 10000); // Fetch every 10 seconds
});
