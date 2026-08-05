// Load Navbar
fetch("nav.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;

        // Initialize hamburger AFTER nav is loaded
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

        if (hamburger && navLinks) {
            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
            });
        }
    });

// Load Footer
fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

// Slider Dots Animation
const dots = document.querySelectorAll(".dots span");

if (dots.length) {
    let current = 0;

    setInterval(() => {
        dots[current].classList.remove("active");
        current = (current + 1) % dots.length;
        dots[current].classList.add("active");
    }, 3000);
}

$(function () {
    $("#reservation-date").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: 0,
        changeMonth: true,
        changeYear: true
    });
});


const wrapper = document.querySelector(".testimonial-wrapper");

document.querySelector(".next").onclick = () => {
    wrapper.scrollBy({
        left: 380,
        behavior: "smooth"
    });
};

document.querySelector(".prev").onclick = () => {
    wrapper.scrollBy({
        left: -380,
        behavior: "smooth"
    });
};