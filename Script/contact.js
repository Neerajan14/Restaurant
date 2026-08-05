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

