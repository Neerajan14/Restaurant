// Load Navbar
fetch("nav.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

// Load Footer
fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });



    $(document).ready(function () {

    // Date Picker
    $("#datepicker").datepicker({

        dateFormat: "dd-mm-yy",

        minDate: 0,

        changeMonth: true,

        changeYear: true

    });


    // Time Picker
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

});


