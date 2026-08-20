"use strict";

/* 1. LOAD NAVBAR */

fetch("nav.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Navbar could not be loaded.");
        }

        return response.text();
    })
    .then(data => {

        const navbar = document.getElementById("navbar");

        if (!navbar) {
            return;
        }

        navbar.innerHTML = data;

        /* Hamburger */
        const hamburger = navbar.querySelector(".hamburger");
        const navLinks = navbar.querySelector(".nav-links");

        if (hamburger && navLinks) {

            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
            });

        }

    })
    .catch(error => {
        console.error("Navbar loading error:", error);
    });


/*2. LOAD FOOTER */

fetch("footer.html")
    .then(response => {

        if (!response.ok) {
            throw new Error("Footer could not be loaded.");
        }

        return response.text();
    })
    .then(data => {

        const footer = document.getElementById("footer");

        if (!footer) {
            return;
        }

        footer.innerHTML = data;

    })
    .catch(error => {
        console.error("Footer loading error:", error);
    });


/*3. HOME HERO SLIDER*/

const hero = document.querySelector(".hero");
const dots = document.querySelectorAll(".dots span");

if (hero && dots.length) {

    const images = [
        "Images/hero-1.png",
        "Images/hero-2.jpg",
        "Images/hero-3.jpg"
    ];

    let current = 0;

    hero.style.backgroundImage =
        `url("${images[current]}")`;

    dots[current].classList.add("active");

    setInterval(() => {

        dots[current].classList.remove("active");

        current = (current + 1) % images.length;

        dots[current].classList.add("active");

        hero.style.backgroundImage =
            `url("${images[current]}")`;

    }, 3000);
}


/* 4. TESTIMONIAL SLIDER*/

const testimonialWrapper =
    document.querySelector(".testimonial-wrapper");

const nextButton =
    document.querySelector(".next");

const prevButton =
    document.querySelector(".prev");

if (
    testimonialWrapper &&
    nextButton &&
    prevButton
) {

    nextButton.addEventListener("click", () => {

        testimonialWrapper.scrollBy({
            left: 380,
            behavior: "smooth"
        });

    });

    prevButton.addEventListener("click", () => {

        testimonialWrapper.scrollBy({
            left: -380,
            behavior: "smooth"
        });

    });

}


/*5. RESERVATION / BOOKING DATE & TIME*/

$(document).ready(function () {

    /* Reservation date */
    if ($("#reservation-date").length) {

        $("#reservation-date").datepicker({
            dateFormat: "dd/mm/yy",
            minDate: 0,
            changeMonth: true,
            changeYear: true
        });

    }


    /* Booking date */
    if ($("#booking-date").length) {

        $("#booking-date").datepicker({
            dateFormat: "dd-mm-yy",
            minDate: 0,
            changeMonth: true,
            changeYear: true
        });

    }


    /* Old datepicker */
    if ($("#datepicker").length) {

        $("#datepicker").datepicker({
            dateFormat: "dd-mm-yy",
            minDate: 0,
            changeMonth: true,
            changeYear: true
        });

    }


    /* Reservation time */
    if ($("#booking-time").length) {

        $("#booking-time").timepicker({
            timeFormat: "h:mm p",
            interval: 30,
            minTime: "10:00am",
            maxTime: "10:00pm",
            defaultTime: "11:00am",
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });

    }


    /* Old timepicker */
    if ($("#timepicker").length) {

        $("#timepicker").timepicker({
            timeFormat: "h:mm p",
            interval: 30,
            minTime: "10:00am",
            maxTime: "10:00pm",
            defaultTime: "11:00am",
            startTime: "10:00",
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });

    }


    /* Guest Select */
    if ($("#guest-select").length) {

        $("#guest-select").select2({
            minimumResultsForSearch: Infinity,
            width: "100%"
        });

    }

});


/*6. GALLERY*/

const galleryGrid =
    document.getElementById("galleryGrid");

if (galleryGrid) {

    const imageUpload =
        document.getElementById("imageUpload");

    const uploadModal =
        document.getElementById("uploadModal");

    const uploadModalBackdrop =
        document.getElementById("uploadModalBackdrop");

    const uploadModalClose =
        document.getElementById("uploadModalClose");

    const uploadCancel =
        document.getElementById("uploadCancel");

    const uploadDetailsForm =
        document.getElementById("uploadDetailsForm");

    const uploadPreviewImage =
        document.getElementById("uploadPreviewImage");

    const imageCategory =
        document.getElementById("imageCategory");

    const imageTitle =
        document.getElementById("imageTitle");

    const uploadProgress =
        document.getElementById("uploadProgress");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxBackdrop =
        document.getElementById("lightboxBackdrop");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCategory =
        document.getElementById("lightboxCategory");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxCounter =
        document.getElementById("lightboxCounter");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const lightboxDelete =
        document.getElementById("lightboxDelete");


    const STORAGE_KEY =
        "sagarmatha_gallery_images";

    let galleryItems = [];
    let currentIndex = 0;

    let pendingFiles = [];
    let currentPendingIndex = 0;


    /* -----------------------------------------
       STORAGE
    ----------------------------------------- */

    function getSavedImages() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return [];
            }

            return JSON.parse(saved);

        } catch (error) {

            console.error(
                "Storage read error:",
                error
            );

            return [];
        }
    }


    function saveImages(images) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(images)
            );

            return true;

        } catch (error) {

            console.error(
                "Storage save error:",
                error
            );

            alert(
                "Browser storage is full. Please delete some uploaded images and try again."
            );

            return false;
        }
    }


    /* -----------------------------------------
       INITIALIZE GALLERY
    ----------------------------------------- */

    function initializeGallery() {

        loadUploadedImages();

        refreshGalleryItems();
    }


    function loadUploadedImages() {

        const savedImages =
            getSavedImages();

        savedImages.forEach(image => {

            createUploadedGalleryItem(image);

        });
    }


    /* -----------------------------------------
       CREATE UPLOADED IMAGE
    ----------------------------------------- */

    function createUploadedGalleryItem(image) {

        const article =
            document.createElement("article");

        const sizes = [
            "item-large",
            "item-tall",
            "item-small",
            "item-wide",
            "item-medium"
        ];

        const randomSize =
            sizes[
                Math.floor(
                    Math.random() * sizes.length
                )
            ];

        article.className =
            `gallery-item ${randomSize} uploaded-item`;

        article.dataset.category =
            image.category;

        article.dataset.title =
            image.title;

        article.dataset.id =
            image.id;

        article.dataset.uploaded =
            "true";


        article.innerHTML = `

            <img
                src="${image.src}"
                alt="${escapeHTML(image.title)}"
                loading="lazy"
            >

            <span class="uploaded-badge">
                UPLOADED
            </span>

            <button
                class="delete-upload"
                type="button"
                aria-label="Delete image"
                data-delete-id="${image.id}"
            >
                ×
            </button>

            <div class="image-overlay">

                <div class="image-info">

                    <span>
                        00 /
                        ${escapeHTML(
                            image.category.toUpperCase()
                        )}
                    </span>

                    <h2>
                        ${escapeHTML(image.title)}
                    </h2>

                </div>

                <button
                    class="view-image"
                    type="button"
                    aria-label="View image"
                >
                    ↗
                </button>

            </div>
        `;

        galleryGrid.appendChild(article);
    }


    /* -----------------------------------------
       ESCAPE HTML
    ----------------------------------------- */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;
    }


    /*REFRESH GALLERY*/

    function refreshGalleryItems() {

        galleryItems =
            Array.from(
                galleryGrid.querySelectorAll(
                    ".gallery-item"
                )
            );

        updateGalleryNumbers();
    }


    function updateGalleryNumbers() {

        galleryItems.forEach(
            (item, index) => {

                const info =
                    item.querySelector(
                        ".image-info span"
                    );

                if (!info) {
                    return;
                }

                const category =
                    item.dataset.category ||
                    "Gallery";

                info.textContent =
                    `${String(index + 1).padStart(2, "0")} / ${category.toUpperCase()}`;
            }
        );
    }


    /*IMAGE UPLOAD*/

    if (imageUpload) {

        imageUpload.addEventListener(
            "change",
            function () {

                const files =
                    Array.from(this.files);

                if (!files.length) {
                    return;
                }

                pendingFiles =
                    files.filter(file =>
                        file.type.startsWith("image/")
                    );

                if (!pendingFiles.length) {

                    alert(
                        "Please select valid image files."
                    );

                    this.value = "";

                    return;
                }

                currentPendingIndex = 0;

                showUploadModal();

                showPendingImage();

                this.value = "";
            }
        );
    }


    function showUploadModal() {

        uploadModal.classList.add("active");

        uploadModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

        setTimeout(() => {

            imageCategory.focus();

        }, 100);
    }


    function hideUploadModal() {

        uploadModal.classList.remove("active");

        uploadModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        uploadPreviewImage.src = "";

        imageCategory.value = "";

        imageTitle.value = "";

        pendingFiles = [];

        currentPendingIndex = 0;
    }


    function showPendingImage() {

        if (!pendingFiles.length) {
            return;
        }

        const file =
            pendingFiles[
                currentPendingIndex
            ];

        const objectURL =
            URL.createObjectURL(file);

        uploadPreviewImage.src =
            objectURL;

        imageTitle.value =
            file.name.replace(
                /\.[^/.]+$/,
                ""
            );

        imageCategory.value = "";

        uploadProgress.textContent =
            `Image ${currentPendingIndex + 1} of ${pendingFiles.length}`;
    }


    /*UPLOAD FORM*/

    if (uploadDetailsForm) {

        uploadDetailsForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const category =
                    imageCategory.value.trim();

                const title =
                    imageTitle.value.trim();

                if (!category) {

                    imageCategory.focus();

                    return;
                }

                if (!title) {

                    imageTitle.focus();

                    return;
                }

                const file =
                    pendingFiles[
                        currentPendingIndex
                    ];

                if (!file) {
                    return;
                }

                const reader =
                    new FileReader();

                reader.onload = function (event) {

                    const imageData = {

                        id:
                            Date.now().toString() +
                            "-" +
                            Math.random()
                                .toString(36)
                                .substring(2, 9),

                        src:
                            event.target.result,

                        category:
                            category,

                        title:
                            title,

                        uploadedAt:
                            new Date().toISOString()
                    };


                    const savedImages =
                        getSavedImages();

                    savedImages.push(imageData);

                    const saved =
                        saveImages(savedImages);

                    if (!saved) {
                        return;
                    }

                    createUploadedGalleryItem(
                        imageData
                    );

                    refreshGalleryItems();

                    currentPendingIndex++;

                    if (
                        currentPendingIndex <
                        pendingFiles.length
                    ) {

                        showPendingImage();

                        imageCategory.focus();

                    } else {

                        hideUploadModal();

                    }
                };


                reader.onerror = function () {

                    alert(
                        "Unable to read this image."
                    );
                };


                reader.readAsDataURL(file);
            }
        );
    }


    /*UPLOAD MODAL BUTTONS*/

    if (uploadCancel) {

        uploadCancel.addEventListener(
            "click",
            hideUploadModal
        );
    }


    if (uploadModalClose) {

        uploadModalClose.addEventListener(
            "click",
            hideUploadModal
        );
    }


    if (uploadModalBackdrop) {

        uploadModalBackdrop.addEventListener(
            "click",
            hideUploadModal
        );
    }


    /*GALLERY CLICK*/

    galleryGrid.addEventListener(
        "click",
        function (event) {

            const deleteButton =
                event.target.closest(
                    ".delete-upload"
                );

            if (deleteButton) {

                event.stopPropagation();

                deleteUploadedImage(
                    deleteButton.dataset.deleteId
                );

                return;
            }


            const viewButton =
                event.target.closest(
                    ".view-image"
                );

            if (viewButton) {

                event.stopPropagation();

                const item =
                    viewButton.closest(
                        ".gallery-item"
                    );

                openLightboxForItem(item);

                return;
            }


            const item =
                event.target.closest(
                    ".gallery-item"
                );

            if (item) {

                openLightboxForItem(item);

            }
        }
    );


    /*LIGHTBOX*/

    function openLightboxForItem(item) {

        refreshGalleryItems();

        currentIndex =
            galleryItems.indexOf(item);

        if (currentIndex === -1) {
            return;
        }

        updateLightbox();

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lightbox-open"
        );
    }


    function updateLightbox() {

        if (!galleryItems.length) {
            return;
        }

        const item =
            galleryItems[currentIndex];

        const image =
            item.querySelector("img");

        if (!image) {
            return;
        }

        const category =
            item.dataset.category ||
            "Gallery";

        const title =
            item.dataset.title ||
            image.alt ||
            "Gallery Image";

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            title;

        lightboxCategory.textContent =
            category.toUpperCase();

        lightboxTitle.textContent =
            title;

        lightboxCounter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;

        lightboxDelete.hidden =
            item.dataset.uploaded !== "true";
    }


    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

        setTimeout(() => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                lightboxImage.src = "";

            }

        }, 300);
    }


    if (lightboxClose) {
        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightboxBackdrop) {
        lightboxBackdrop.addEventListener(
            "click",
            closeLightbox
        );
    }


    /* Previous */
    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            function () {

                if (!galleryItems.length) {
                    return;
                }

                currentIndex--;

                if (currentIndex < 0) {

                    currentIndex =
                        galleryItems.length - 1;
                }

                updateLightbox();
            }
        );
    }


    /* Next */
    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            function () {

                if (!galleryItems.length) {
                    return;
                }

                currentIndex++;

                if (
                    currentIndex >=
                    galleryItems.length
                ) {

                    currentIndex = 0;
                }

                updateLightbox();
            }
        );
    }


    /*DELETE UPLOADED IMAGE*/

    function deleteUploadedImage(id) {

        if (!id) {
            return;
        }

        const confirmed =
            confirm(
                "Are you sure you want to delete this image?"
            );

        if (!confirmed) {
            return;
        }

        let savedImages =
            getSavedImages();

        savedImages =
            savedImages.filter(
                image => image.id !== id
            );

        saveImages(savedImages);

        const item =
            galleryGrid.querySelector(
                `[data-id="${id}"]`
            );

        if (item) {

            const deletedIndex =
                galleryItems.indexOf(item);

            item.remove();

            refreshGalleryItems();

            if (
                currentIndex === deletedIndex
            ) {

                closeLightbox();

            } else if (
                currentIndex > deletedIndex
            ) {

                currentIndex--;
            }
        }
    }


    if (lightboxDelete) {

        lightboxDelete.addEventListener(
            "click",
            function () {

                const item =
                    galleryItems[currentIndex];

                if (!item) {
                    return;
                }

                const id =
                    item.dataset.id;

                if (!id) {
                    return;
                }

                deleteUploadedImage(id);
            }
        );
    }


    /*SWIPE LIGHTBOX*/

    let touchStartX = 0;
    let touchEndX = 0;

    if (lightboxImage) {

        lightboxImage.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        lightboxImage.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0].screenX;

                const difference =
                    touchEndX - touchStartX;

                if (Math.abs(difference) < 50) {
                    return;
                }

                if (difference < 0) {

                    lightboxNext.click();

                } else {

                    lightboxPrev.click();

                }

            },
            {
                passive: true
            }
        );
    }


    /*ESCAPE KEY*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                uploadModal &&
                uploadModal.classList.contains("active")
            ) {

                hideUploadModal();

                return;
            }


            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

            }
        }
    );


    /* Initialize */
    initializeGallery();

}