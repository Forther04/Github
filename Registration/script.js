document.addEventListener("DOMContentLoaded", function () {
  let back = document.getElementById("back");
  let user = document.getElementById("user");
  let school = document.getElementById("school");
  let strand = document.getElementById("strand");
  let picture = document.getElementById("picture");
  let information = document.getElementById("information");
  let paragraph = document.getElementById("text");
  let transition = document.getElementById("transition");
  let warning = document.getElementById("error");
  let success = document.getElementById("success");

  transition.addEventListener(
    "animationend",
    function () {
      transition.style.display = "none";
    },
    { once: true }
  );

  back.addEventListener("click", function () {
    window.location.href = "../index.html";
  });

  user.addEventListener("click", function () {
    user.style.color = "limegreen";
    school.style.color = "white";
    strand.style.color = "white";
    picture.style.color = "white";
    document.getElementById("container").scrollIntoView({ behavior: "smooth" });
  });

  user.addEventListener("mouseenter", function () {
    information.classList.add("ShowInformation");
    information.style.opacity = "100%";
    information.style.top = "11em";
    paragraph.textContent = "User Information";
  });

  user.addEventListener("mouseleave", function () {
    information.classList.remove("ShowInformation");
    information.style.opacity = "0%";
  });

  school.addEventListener("click", function () {
    school.style.color = "limegreen";
    user.style.color = "white";
    strand.style.color = "white";
    picture.style.color = "white";
    document
      .getElementById("PreviousSchool")
      .scrollIntoView({ behavior: "smooth" });
  });

  school.addEventListener("mouseenter", function () {
    information.classList.add("ShowInformation");
    information.style.opacity = "100%";
    information.style.top = "15em";
    paragraph.textContent = "Previous School";
  });

  school.addEventListener("mouseleave", function () {
    information.classList.remove("ShowInformation");
    information.style.opacity = "0%";
  });

  strand.addEventListener("click", function () {
    strand.style.color = "limegreen";
    school.style.color = "white";
    user.style.color = "white";
    picture.style.color = "white";
    document.getElementById("Strand").scrollIntoView({ behavior: "smooth" });
  });

  strand.addEventListener("mouseenter", function () {
    information.classList.add("ShowInformation");
    information.style.opacity = "100%";
    information.style.top = "19em";
    paragraph.textContent = "Choose Strand";
  });

  strand.addEventListener("mouseleave", function () {
    information.classList.remove("ShowInformation");
    information.style.opacity = "0%";
  });

  picture.addEventListener("click", function () {
    picture.style.color = "limegreen";
    school.style.color = "white";
    strand.style.color = "white";
    user.style.color = "white";
    document.getElementById("Picture").scrollIntoView({ behavior: "smooth" });
  });

  picture.addEventListener("mouseenter", function () {
    information.classList.add("ShowInformation");
    information.style.opacity = "100%";
    information.style.top = "23em";
    paragraph.textContent = "Upload Picture";
  });

  picture.addEventListener("mouseleave", function () {
    information.classList.remove("ShowInformation");
    information.style.opacity = "0%";
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Mapping sections to their corresponding icons
    const sections = {
      container: "user",
      PreviousSchool: "school",
      Strand: "strand",
      Picture: "picture",
    };

    // Get all icons
    const icons = document.querySelectorAll(".icon");

    // Observer configuration
    const observer = new IntersectionObserver(
      (entries) => {
        let activeIcon = null;

        entries.forEach((entry) => {
          console.log(
            `Checking section: ${entry.target.id}, isIntersecting: ${entry.isIntersecting}, ratio: ${entry.intersectionRatio}`
          );

          const iconId = sections[entry.target.id];
          if (iconId && entry.isIntersecting) {
            activeIcon = document.getElementById(iconId);
          }
        });

        // Reset all icons first
        icons.forEach((icon) => (icon.style.color = ""));

        // Highlight only the active one
        if (activeIcon) {
          activeIcon.style.color = "limegreen";
        }
      },
      { threshold: 0.5 }
    ); // 50% visibility required to trigger

    // Observe all target sections
    Object.keys(sections).forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });
  });

  document.querySelectorAll(".input").forEach((input) => {
    input.addEventListener("input", function () {
      if (this.name !== "Password") {
        this.value = this.value.replace(/\b\w/g, (char) => char.toUpperCase());
      } else {
        this.value = this.value.replace(/\b\w/g, (char) => char.toLowerCase());
      }
    });
  });

  const data = {
    ICT: {
      h2: "Infromation Communication Technology",
      StrandInfotext:
        "The ICT strand focuses on developing skills in computer systems, programming, networking, and digital media. It prepares you for careers in software development, cybersecurity, web development, computer programming and IT support. This strand is ideal for those interested in technology, problem-solving, and innovation in the digital world.",
      Spicture: "../1-Assest/ICT.png",
    },
    STEM: {
      h2: "Science, Technology, Engineering, and Mathematics",
      StrandInfotext:
        "The STEM strand focuses on developing analytical, problem-solving, and technical skills. It prepares you for careers in engineering, medicine, computer science, and other scientific fields. This strand is ideal for those who enjoy research, innovation, and logical thinking.",
      Spicture: "../1-Assest/STEM.png",
    },

    ABM: {
      h2: "Accountancy, Business, and Management",
      StrandInfotext:
        "The ABM strand focuses on developing skills in business, finance, marketing, and entrepreneurship. It prepares you for careers in accounting, management, sales, and business ownership. This strand is ideal for those interested in leadership, problem-solving, and financial decision-making.",
      Spicture: "../1-Assest/ABM.png",
    },
    HE: {
      h2: "Home Economics",
      StrandInfotext:
        "The HE strand focuses on practical skills in livelihood, entrepreneurship, and service industries such as culinary arts, fashion design, tourism, and wellness. It prepares you for careers in hospitality, food service, cosmetology, and other hands-on professions. This strand is ideal for those who enjoy creative and practical work in everyday life and business.",
      Spicture: "../1-Assest/HE.png",
    },

    HUMSS: {
      h2: "Humanities and Social Sciences",
      StrandInfotext:
        "The HUMSS strand focuses on understanding society, culture, and human behavior. It prepares you for careers in education, communication, psychology, law, politics, and social work. This strand is ideal for those who enjoy reading, writing, critical thinking, and engaging in social issues.",
      Spicture: "../1-Assest/HUMSS.png",
    },
  };

  let SelectForm = document.getElementById("chooce_strand");
  let Title = document.getElementById("h2");
  let Information = document.getElementById("StrandInfotext");
  let Image = document.getElementById("Spicture");

  SelectForm.addEventListener("change", function () {
    let selected = this.value;

    if (data[selected]) {
      Title.textContent = data[selected].h2;
      Information.textContent = data[selected].StrandInfotext;
      Image.src = data[selected].Spicture;
    }
  });

  document
    .getElementById("YourPicture")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          document.getElementById("PYourPicture").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

  document
    .getElementById("CardPicture")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          document.getElementById("PCardPicture").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

  //_________________________________//
  document.getElementById("button").addEventListener("click", function () {
    let allFilled = true;
    let formData = new FormData();

    const forms = document.querySelectorAll("div form");
    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        if (input.type === "file") {
          if (input.files.length > 0) {
            formData.append(input.name, input.files[0]); // Append file
            console.log(`Added file: ${input.name} - ${input.files[0].name}`);
          } else {
            allFilled = false; // Mark as incomplete if file is required
          }
        } else if (input.type === "checkbox" || input.type === "radio") {
          if (input.checked) {
            formData.append(input.name, input.value);
          }
        } else {
          if (input.value.trim() === "") {
            allFilled = false; // Mark form as incomplete
          } else {
            formData.append(input.name, input.value);
          }
        }
      });
    });

    if (allFilled) {
      // Play success animation
      success.classList.add("warningAnimation");
      success.style.opacity = "100%";

      setTimeout(() => {
        success.classList.add("warningDone");
        success.addEventListener(
          "animationend",
          function () {
            success.style.opacity = "0%";
            success.classList.remove("warningDone");
            success.classList.remove("warningAnimation");
          },
          { once: true }
        );

        // Send the form data after animation starts
        fetch("../Database/register.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => console.log("Server Response:", data)) // Log response
          .then((data) => {
            setTimeout(() => {
              window.location.href = "../index.html";
            }, 500);
          })
          .catch((error) => console.error("Error:", error));
      }, 3000);
    } else {
      // Play warning animation
      warning.classList.add("warningAnimation");
      warning.style.opacity = "100%";

      setTimeout(() => {
        warning.classList.add("warningDone");
        warning.addEventListener(
          "animationend",
          function () {
            warning.style.opacity = "0%";
            warning.classList.remove("warningDone");
            warning.classList.remove("warningAnimation");
          },
          { once: true }
        );
      }, 3000);
    }
  });
});

function togglePassword() {
  let eyeIcon = document.getElementById("eye");
  let password = document.getElementById("password");
  let input = document.getElementById("password");

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
