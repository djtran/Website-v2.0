/**
 * Created by David on 9/20/2016.
 */

var jumboArray = ["Aspiring Computer Engineer.", "Board Game Enthusiast.", "Rookie Crocheter.", "Energetic Dancer.", "Lifelong Learner.", "Indie Game Developer.", "Unix Lover"];
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

$(".testLink").click(function(){
    $(".body-content").fadeOut(function () {
        $(".body-content").load("content/test.html", $(".body-content").fadeIn());
    });
});

//For mobile, when you click the menu, you should scroll to top to get the dropdown list.
$(".scrollTop").on('click', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: 0
    }, 300);
});

$(".mobNav").on("click", function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(".body-content").offset().top
    }, 300);
});

$(document).on("click", ".workD" ,function(event){
   event.preventDefault();
   var all = $(event.target).parent().children();
   all.removeClass("active");
   $(event.target).addClass("active");

   var id = $(event.target).attr('id');
   switch(id)
   {
       case "bAmazon":
            $(".workDescription").fadeOut(function(){
               $(".workDescription").load("content/wAmazon.html", $(".workDescription").fadeIn());
            });
           break;
       case "bCIDAR":
           $(".workDescription").fadeOut(function(){
               $(".workDescription").load("content/wCIDAR.html", $(".workDescription").fadeIn());
           });
           break;
       case "bResLife":
           $(".workDescription").fadeOut(function(){
               $(".workDescription").load("content/wResLife.html", $(".workDescription").fadeIn());
           });
           break;
       default:
           $(".workDescription").fadeOut(function(){
               $(".workDescription").html("<br><br><div class = 'text-xs-center'> Choose an item from my work history on the left! </div><br><br>");
               $(".workDescription").fadeIn();
           });
           break;
   }
});

$(document).on("click", "#bTest", function(event){
    event.preventDefault();
    $.getScript( 'infoShop/js/main.js', function( data, textStatus, jqxhr ) {
        //do stuff after load
    });
    $("#bTest").remove();
});



//Modal overlay -- Preview images at larger size.

function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-lg");
    var offsetH = ($(window).height() - $dialog.height()) / 2;
    var offsetW = ($(window).width() - $dialog.width()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offsetH);
    $dialog.css("margin-left", offsetW);
}

$(document).on("click", ".modal-img", function(event){
    var srcPath = $(this).attr('id');
    var prefix = "<img src='";
    var suffix = "' class='img-fluid'>";
    $(".modal-body").html(prefix + srcPath + suffix);
});

$('.modal').on('show.bs.modal', centerModal);
$(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
});


$(document).ready(function () {
    $(".body-content").load("content/home.html");
});