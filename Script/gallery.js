"use strict";

fetch("nav.html")
    .then(response => response.text())
    .then(data => {

        const navbar =
            document.getElementById("navbar");

        if (navbar) {
            navbar.innerHTML = data;
        }


        const hamburger =
            document.querySelector(".hamburger");

        const navLinks =
            document.querySelector(".nav-links");


        if (hamburger && navLinks) {

            hamburger.addEventListener(
                "click",
                () => {

                    navLinks.classList.toggle(
                        "active"
                    );

                }
            );

        }

    })
    .catch(error => {

        console.error(
            "Navbar loading error:",
            error
        );

    });


fetch("footer.html")
    .then(response => response.text())
    .then(data => {

        const footer =
            document.getElementById("footer");

        if (footer) {
            footer.innerHTML = data;
        }

    })
    .catch(error => {

        console.error(
            "Footer loading error:",
            error
        );

    });

const galleryGrid =
    document.getElementById("galleryGrid");


const imageUpload =
    document.getElementById("imageUpload");


/* Upload modal */

const uploadModal =
    document.getElementById("uploadModal");

const uploadModalBackdrop =
    document.getElementById("uploadModalBackdrop");

const uploadModalClose =
    document.getElementById("uploadModalClose");

const uploadCancel =
    document.getElementById("uploadCancel");

const uploadDetailsForm =
    document.getElementById(
        "uploadDetailsForm"
    );

const uploadPreviewImage =
    document.getElementById(
        "uploadPreviewImage"
    );

const imageCategory =
    document.getElementById(
        "imageCategory"
    );

const imageTitle =
    document.getElementById(
        "imageTitle"
    );

const uploadProgress =
    document.getElementById(
        "uploadProgress"
    );

const lightbox =
    document.getElementById("lightbox");

const lightboxBackdrop =
    document.getElementById(
        "lightboxBackdrop"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxCategory =
    document.getElementById(
        "lightboxCategory"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxCounter =
    document.getElementById(
        "lightboxCounter"
    );

const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );

const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );

const lightboxDelete =
    document.getElementById(
        "lightboxDelete"
    );


const STORAGE_KEY =
    "sagarmatha_gallery_images";


let galleryItems = [];

let currentIndex = 0;


let pendingFiles = [];

let currentPendingIndex = 0;


function getSavedImages() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!saved) {
            return [];
        }


        return JSON.parse(saved);

    }
    catch (error) {

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

    }
    catch (error) {

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


function initializeGallery() {

    loadUploadedImages();

    refreshGalleryItems();

}

function loadUploadedImages() {

    const savedImages =
        getSavedImages();


    savedImages.forEach(image => {

        createUploadedGalleryItem(
            image
        );

    });

}



function createUploadedGalleryItem(image) {

    const article = document.createElement("article");

    const sizes = [
        "item-large",
        "item-tall",
        "item-small",
        "item-wide",
        "item-medium"
    ];

    const randomSize =
        sizes[Math.floor(Math.random() * sizes.length)];


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
                    00 / ${escapeHTML(
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


function getGalleryNumber() {

    const existingCount =
        galleryGrid.querySelectorAll(
            ".gallery-item"
        ).length;


    return String(
        existingCount + 1
    ).padStart(2, "0");

}

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}

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
                file.type.startsWith(
                    "image/"
                )
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


function showUploadModal() {

    uploadModal.classList.add(
        "active"
    );


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

    uploadModal.classList.remove(
        "active"
    );


    uploadModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    uploadPreviewImage.src =
        "";


    imageCategory.value =
        "";


    imageTitle.value =
        "";


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


  

    imageCategory.value =
        "";


  
    uploadProgress.textContent =
        `Image ${
            currentPendingIndex + 1
        } of ${
            pendingFiles.length
        }`;

}



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


            savedImages.push(
                imageData
            );


            const saved =
                saveImages(
                    savedImages
                );


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

            }
            else {

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


uploadCancel.addEventListener(
    "click",
    function () {

        hideUploadModal();

    }
);

uploadModalClose.addEventListener(
    "click",
    function () {

        hideUploadModal();

    }
);


uploadModalBackdrop.addEventListener(
    "click",
    function () {

        hideUploadModal();

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            uploadModal.classList.contains(
                "active"
            )
        ) {

            hideUploadModal();

            return;

        }


        if (
            event.key === "Escape" &&
            lightbox.classList.contains(
                "active"
            )
        ) {

            closeLightbox();

        }

    }
);


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
                `${String(
                    index + 1
                ).padStart(2, "0")} / ${category.toUpperCase()}`;

        }
    );

}


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


            openLightboxForItem(
                item
            );


            return;

        }


        const item =
            event.target.closest(
                ".gallery-item"
            );


        if (item) {

            openLightboxForItem(
                item
            );

        }

    }
);


function openLightboxForItem(item) {

    refreshGalleryItems();


    currentIndex =
        galleryItems.indexOf(
            item
        );


    if (
        currentIndex === -1
    ) {
        return;
    }


    updateLightbox();


    lightbox.classList.add(
        "active"
    );


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
        galleryItems[
            currentIndex
        ];


    const image =
        item.querySelector(
            "img"
        );


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
        `${String(
            currentIndex + 1
        ).padStart(2, "0")} / ${String(
            galleryItems.length
        ).padStart(2, "0")}`;


    lightboxDelete.hidden =
        item.dataset.uploaded !==
        "true";

}


function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );


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

            lightboxImage.src =
                "";

        }

    }, 300);

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightboxBackdrop.addEventListener(
    "click",
    closeLightbox
);


lightboxPrev.addEventListener(
    "click",
    function () {

        if (!galleryItems.length) {
            return;
        }


        currentIndex--;


        if (
            currentIndex < 0
        ) {

            currentIndex =
                galleryItems.length - 1;

        }


        updateLightbox();

    }
);


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
            image =>
                image.id !== id
        );


    saveImages(
        savedImages
    );


    const item =
        galleryGrid.querySelector(
            `[data-id="${id}"]`
        );


    if (item) {

        const deletedIndex =
            galleryItems.indexOf(
                item
            );


        item.remove();


        refreshGalleryItems();


      

        if (
            currentIndex ===
            deletedIndex
        ) {

            closeLightbox();

        }
        else if (
            currentIndex >
            deletedIndex
        ) {

            currentIndex--;

        }

    }

}


lightboxDelete.addEventListener(
    "click",
    function () {

        const item =
            galleryItems[
                currentIndex
            ];


        if (!item) {
            return;
        }


        const id =
            item.dataset.id;


        if (!id) {
            return;
        }


        deleteUploadedImage(
            id
        );

    }
);


let touchStartX = 0;

let touchEndX = 0;


lightboxImage.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


lightboxImage.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0]
                .screenX;


        const difference =
            touchEndX -
            touchStartX;


        if (
            Math.abs(difference) <
            50
        ) {
            return;
        }


        if (
            difference < 0
        ) {

            lightboxNext.click();

        }
        else {

            lightboxPrev.click();

        }

    },
    {
        passive: true
    }
);

initializeGallery();