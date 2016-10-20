//Project Gallery Viewer

var main = function() {

	// Slide down gallery

	$('.title').click(function() {

		if($(this).hasClass('current')){	//If this is open close it and do nothing else
			$('.content').slideUp(600);
			$(this).removeClass('current');
		}
		else{
			$('.content').slideUp(600);	//If any other thing is open, close it.
			$('.title').removeClass('current');	//Remove current status from all

			$(this).addClass('current');		//Make this one current
			$('.current').children('.content').slideDown(600);	//Open it up.

		}
	});



	//Carousel Gallery

	$('.rightArrow').click(function(){
		var currSlide = $('.active-slide');
		var nextSlide = currSlide.next();

		if(nextSlide.length == 0)
		{
			nextSlide = $('.slide').first();
		}

		currSlide.slideUp(500).removeClass('active-slide');
		nextSlide.slideDown(500).addClass('active-slide');
	});

	$('.leftArrow').click(function(){
		var currSlide = $('.active-slide');
		var prevSlide = currSlide.prev();

		if(prevSlide.length == 0)
		{
			prevSlide = $('.slide').last();
		}

		currSlide.slideUp(500).removeClass('active-slide');
		prevSlide.slideDown(500).addClass('active-slide');

	});

}

$(document).ready(main);