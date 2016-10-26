/**
 * Created by David on 9/20/2016.
 */

var jumboArray = ["Aspiring Computer Engineer.", "Board Game Enthusiast.", "Rookie Crocheter.", "Energetic Dancer.", "Lifelong Learner.", "Indie Game Developer"];
var arrayIndex = 0;
var main = setInterval(updateJumbo, 4000);

function updateJumbo() {
    $(".announcer").fadeOut(500, function () {
        if (arrayIndex == (jumboArray.length - 1)) {
            arrayIndex = 0;
        }
        else {
            arrayIndex++;
        }

        $(".announcer").text(jumboArray[arrayIndex]).fadeIn(500);

    });
}

$(".homeLink").click(function () {
    $(".body-content").fadeOut(function () {
        $(".body-content").load("content/home.html", $(".body-content").fadeIn());
    });
});
$(".workLink").click(function () {
    $(".body-content").fadeOut(function () {
        $(".body-content").load("content/work.html", $(".body-content").fadeIn());
    });
});
$(".projLink").click(function () {
    $(".body-content").fadeOut(function () {
        $(".body-content").load("content/proj.html", $(".body-content").fadeIn());
    });
});
$(".educLink").click(function () {
    $(".body-content").fadeOut(function () {
        $(".body-content").load("content/educ.html", $(".body-content").fadeIn());
    });
});

//For mobile, when you click the menu, you should scroll to top to get the dropdown list.
$(".scrollTop").on('click', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: 0
    }, 300);
})

$(".mobNav").on("click", function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(".body-content").offset().top
    }, 300);
})

$(document).ready(function () {
    $(".body-content").load("content/home.html");
});