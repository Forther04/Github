document.getElementById("logout").addEventListener("click", function () {
  window.location.href = "../../Admin/logout.php";
});

document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  let currentSlide = 0;
  // Instead of using getComputedStyle (which is affected by transform),
  // use offsetWidth which returns the layout width (ignoring transform)
  function getEffectiveSlideWidth(slide) {
    // slide.offsetWidth returns the width of the element (700px as per CSS)
    // Then add the left and right margins (each 30px)
    return slide.offsetWidth + 60;
  }

  // Set a constant effective width since your CSS is fixed
  const effectiveSlideWidth = getEffectiveSlideWidth(slides[0]); // should be ~760px

  function updateSlider() {
    const container = document.querySelector(".slider");
    const containerWidth = container.clientWidth;
    // Center the active slide:
    // Calculate its center relative to the left edge of the slides container.
    const activeSlideCenter = currentSlide * effectiveSlideWidth + effectiveSlideWidth / 2;
    const containerCenter = containerWidth / 2;
    const offset = activeSlideCenter - containerCenter;

    // Apply transform
    slidesContainer.style.transform = `translateX(-${offset}px)`;

    // Update active class for blur/scale effects
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    // Optionally disable buttons at the ends
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;

    // Debug logs
    console.log("Current Slide:", currentSlide);
    console.log("Effective Slide Width:", effectiveSlideWidth);
    console.log("Container Width:", containerWidth);
    console.log("Active Slide Center:", activeSlideCenter);
    console.log("Container Center:", containerCenter);
    console.log("Offset:", offset);
  }

  nextBtn.addEventListener("click", function () {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);

  updateSlider();
});

document.getElementById("maps").addEventListener("click", function () {
  window.open("https://www.google.com/maps/place/Arellano+University+-+Plaridel+Campus/data=!4m2!3m1!1s0x0:0x461b2618e0536555?sa=X&ved=1t:2428&ictx=111", "_blank");
});
