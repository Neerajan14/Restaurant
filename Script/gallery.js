/* =========================================================
   LOAD NAVBAR
   ========================================================= */

fetch("nav.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Navbar could not be loaded.");
        }

        return response.text();
    })
    .then(data => {

        const navbar = document.getElementById("navbar");

        if (navbar) {
            navbar.innerHTML = data;
        }

        /*
         * Initialize mobile navbar AFTER
         * nav.html has been loaded.
         */

        const hamburger =
            document.querySelector(".hamburger");

        const navLinks =
            document.querySelector(".nav-links");


        if (hamburger && navLinks) {

            hamburger.addEventListener("click", () => {

                navLinks.classList.toggle("active");

                hamburger.classList.toggle("active");

            });

        }

    })
    .catch(error => {
        console.error(error);
    });


/* =========================================================
   LOAD FOOTER
   ========================================================= */

fetch("footer.html")
    .then(response => {

        if (!response.ok) {
            throw new Error("Footer could not be loaded.");
        }

        return response.text();
    })
    .then(data => {

        const footer =
            document.getElementById("footer");

        if (footer) {
            footer.innerHTML = data;
        }

    })
    .catch(error => {
        console.error(error);
    });


/* =========================================================
   GALLERY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    const galleryItems =
        document.querySelectorAll(".gallery-item");


    const lightbox =
        document.getElementById("lightbox");


    const lightboxImage =
        document.getElementById("lightboxImage");


    const lightboxTitle =
        document.getElementById("lightboxTitle");


    const lightboxCategory =
        document.getElementById("lightboxCategory");


    const lightboxCounter =
        document.getElementById("lightboxCounter");


    const closeButton =
        document.getElementById("lightboxClose");


    const previousButton =
        document.getElementById("lightboxPrev");


    const nextButton =
        document.getElementById("lightboxNext");


    const backdrop =
        document.querySelector(".lightbox-backdrop");


    let currentIndex = 0;


    /* =====================================================
       OPEN LIGHTBOX
       ===================================================== */

    function openLightbox(index) {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");

    }


    /* =====================================================
       CLOSE LIGHTBOX
       ===================================================== */

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("lightbox-open");

    }


    /* =====================================================
       UPDATE LIGHTBOX
       ===================================================== */

    function updateLightbox() {

        const item =
            galleryItems[currentIndex];


        const image =
            item.querySelector("img");


        const title =
            item.dataset.title ||
            "Sagarmatha Restaurant";


        const category =
            item.dataset.category ||
            "RESTAURANT";


        /*
         * Fade image
         */

        lightboxImage.style.opacity = "0";


        setTimeout(() => {

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

            lightboxTitle.textContent = title;

            lightboxCategory.textContent =
                category.toUpperCase();


            lightboxCounter.textContent =
                `${String(currentIndex + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;


            lightboxImage.onload = () => {
                lightboxImage.style.opacity = "1";
            };

        }, 150);

    }


    /* =====================================================
       NEXT IMAGE
       ===================================================== */

    function nextImage() {

        currentIndex++;

        if (currentIndex >= galleryItems.length) {
            currentIndex = 0;
        }

        updateLightbox();

    }


    /* =====================================================
       PREVIOUS IMAGE
       ===================================================== */

    function previousImage() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex =
                galleryItems.length - 1;
        }

        updateLightbox();

    }


    /* =====================================================
       CLICK GALLERY IMAGE
       ===================================================== */

    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       BACKDROP CLICK
       ===================================================== */

    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       NEXT BUTTON
       ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                nextImage();

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
       ===================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                previousImage();

            }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowRight") {

                nextImage();

            }


            if (event.key === "ArrowLeft") {

                previousImage();

            }

        }
    );


    /* =====================================================
       TOUCH SWIPE
       ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    lightboxImage.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    lightboxImage.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            handleSwipe();

        },
        { passive: true }
    );


    function handleSwipe() {

        const distance =
            touchEndX - touchStartX;


        /*
         * Swipe left
         */

        if (distance < -50) {

            nextImage();

        }


        /*
         * Swipe right
         */

        if (distance > 50) {

            previousImage();

        }

    }

});