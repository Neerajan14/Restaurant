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

// Load Footer
fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });


    $(function () {

    $("#booking-date").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: 0
    });

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

        $("#guest-select").select2({
        minimumResultsForSearch: Infinity,
        width: "100%"
    });

});