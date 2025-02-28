let back = document.getElementById("back");
let user = document.getElementById("user");
let school = document.getElementById("school");
let strand = document.getElementById("strand");
let picture = document.getElementById("picture");
let information = document.getElementById("information");
let paragraph = document.getElementById("text");
let transition = document.getElementById("transition");


transition.addEventListener("animationend", function () {
    transition.style.display = "none";
}, { once: true }); 










back.addEventListener("click", function() {
    window.location.href = "../FrontPage/frontpage.html";
    
})

user.addEventListener("click", function() {
    user.style.color = "limegreen"
    school.style.color = "white"
    strand.style.color = "white"
    picture.style.color = "white"
    document.getElementById("container").scrollIntoView({behavior: "smooth"});
})

user.addEventListener("mouseenter", function() { 
    information.classList.add("ShowInformation");
    information.style.opacity = "100%"
    information.style.top = "11em"
    paragraph.textContent = "User Information";
})

user.addEventListener("mouseleave", function() { 
    information.classList.remove("ShowInformation");
    information.style.opacity = "0%"
})


school.addEventListener("click", function() {
    school.style.color = "limegreen"
    user.style.color = "white"
    strand.style.color = "white"
    picture.style.color = "white"
    document.getElementById("PreviousSchool").scrollIntoView({behavior: "smooth"});
})

school.addEventListener("mouseenter", function() { 
    information.classList.add("ShowInformation");
    information.style.opacity = "100%"
    information.style.top = "15em"
    paragraph.textContent = "Previous School";

})

school.addEventListener("mouseleave", function() { 
    information.classList.remove("ShowInformation");
    information.style.opacity = "0%"
})

strand.addEventListener("click", function() {
    strand.style.color = "limegreen"
    school.style.color = "white"
    user.style.color = "white"
    picture.style.color = "white"
    document.getElementById("Strand").scrollIntoView({behavior: "smooth"});
})

strand.addEventListener("mouseenter", function() { 
    information.classList.add("ShowInformation");
    information.style.opacity = "100%"
    information.style.top = "19em"
    paragraph.textContent = "Choose Strand";
})

strand.addEventListener("mouseleave", function() { 
    information.classList.remove("ShowInformation");
    information.style.opacity = "0%"
})

picture.addEventListener("click", function() {
    picture.style.color = "limegreen"
    school.style.color = "white"
    strand.style.color = "white"
    user.style.color = "white"
    document.getElementById("Picture").scrollIntoView({behavior: "smooth"});
})

picture.addEventListener("mouseenter", function() { 
    information.classList.add("ShowInformation");
    information.style.opacity = "100%"
    information.style.top = "23em"
    paragraph.textContent = "Upload Picture";
})

picture.addEventListener("mouseleave", function() { 
    information.classList.remove("ShowInformation");
    information.style.opacity = "0%"
})



document.addEventListener("DOMContentLoaded", function () {
    // Mapping sections to their corresponding icons
    const sections = {
        "container": "user",
        "PreviousSchool": "school",
        "Strand": "strand",
        "Picture": "picture"
    };

    // Get all icons
    const icons = document.querySelectorAll(".icon");

    // Observer configuration
    const observer = new IntersectionObserver(entries => {
        let activeIcon = null;

        entries.forEach(entry => {
            console.log(`Checking section: ${entry.target.id}, isIntersecting: ${entry.isIntersecting}, ratio: ${entry.intersectionRatio}`);

            const iconId = sections[entry.target.id];
            if (iconId && entry.isIntersecting) {
                activeIcon = document.getElementById(iconId);
            }
        });

        // Reset all icons first
        icons.forEach(icon => icon.style.color = "");

        // Highlight only the active one
        if (activeIcon) {
            activeIcon.style.color = "limegreen";
        }
    }, { threshold: 0.5 }); // 50% visibility required to trigger

    // Observe all target sections
    Object.keys(sections).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section);

        }
    });
});

document.querySelectorAll(".input").forEach(input => {
    input.addEventListener("input", function() {
        this.value = this.value.replace(/\b\w/g, char => char.toUpperCase());
    });
});

function togglePassword(){
    let eyeIcon = document.getElementById("eye")
    let password = document.getElementById("password")

    if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } 
    else {
        password.type = "password";
        eyeIcon.classList.add("fa-eye");
        eyeIcon.classList.remove("fa-eye-slash");
    }
}
