/**
 * Created by David on 9/20/2016.
 */

var jumboArray = ["Aspiring Computer Engineer.", "Board Game Enthusiast.", "Rookie Crocheter.", "Energetic Dancer.", "Lifelong Learner."];
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

$(document).ready(function () {
    $(".body-content").load("content/home.html");
});