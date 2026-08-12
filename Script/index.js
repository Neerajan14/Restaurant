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

const hero = document.querySelector(".hero");
const dots = document.querySelectorAll(".dots span");

if (hero && dots.length) {

    const images = [
        "Images/hero-1.png",
        "Images/hero-2.jpg",
        "Images/hero-3.jpg"
    ];

    let current = 0;

    
    hero.style.backgroundImage = `url("${images[current]}")`;

    setInterval(() => {

        
        dots[current].classList.remove("active");

       
        current = (current + 1) % images.length;

        
        dots[current].classList.add("active");

        
        hero.style.backgroundImage = `url("${images[current]}")`;

    }, 3000);
}


const wrapper = document.querySelector(".testimonial-wrapper");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

if (wrapper && nextButton && prevButton) {

    nextButton.onclick = () => {
        wrapper.scrollBy({
            left: 380,
            behavior: "smooth"
        });
    };

    prevButton.onclick = () => {
        wrapper.scrollBy({
            left: -380,
            behavior: "smooth"
        });
    };
}

$(document).ready(function () {

    $("#reservation-date").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
        changeMonth: true,
        changeYear: true
    });

});