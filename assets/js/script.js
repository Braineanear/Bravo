jQuery(document).ready(function ($) {
	moveNavigation();

	$(window).on('resize', function () {
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300): window.requestAnimationFrame(moveNavigation);
	});

	$('.trigger').on('click', function (event) {
		event.preventDefault();
		if ($('header').hasClass('visible-sidebar')) {
			$('.moves-out').removeClass('moves-out');
		}
		$('header').toggleClass('visible-sidebar');
		$('.sidebar').toggleClass('visible-sidebar');
		$('.body-content').toggleClass('visible-sidebar');
	});

	function moveNavigation() {
		var navigation = $('.nav-wrapper');
		var screenSize = checkWindowWidth();

		if (screenSize) {
			navigation.detach();
			navigation.insertBefore('.trigger');
		} else {
			navigation.detach();
			navigation.insertAfter('.body-content');
		}
	}

	function checkWindowWidth() {
		var mq = window.getComputedStyle(document.querySelector('header'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
		return (mq == 'mobile') ? false : true;
	}

	var scrollTop = 0;
	$(window).scroll(function () {
		scrollTop = $(window).scrollTop();

		if (scrollTop >= 100) {
			$('#Header').addClass('scrolling');
		} else if (scrollTop < 100) {
			$('#Header').removeClass('scrolling');
		}

	});

	$('.portfolio-item').isotope({
		itemSelector: '.item',
		layoutMode: 'fitRows'
	});

	$('.portfolio-menu ul li').click(function () {
		$('.portfolio-menu ul li').removeClass('active');
		$(this).addClass('active');

		var selector = $(this).attr('data-filter');
		$('.portfolio-item').isotope({
			filter: selector
		});
		return false;
	});


	$('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false,
			callbacks: {
				resize: changeImgSize,
				imageLoadComplete: changeImgSize,
				change: changeImgSize
			}
		}
	});

	function changeImgSize() {
		var img = this.content.find('img');
		img.css('max-height', '100%');
		img.css('width', 'auto');
		img.css('max-width', 'auto');
	}

	if (window.innerWidth < 768) {
		var swiper = new Swiper('.team-container', {
			spaceBetween: 0,
			pagination: {
				el: '.team-pagination',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
			},
		});
	} else {
		var swiper = new Swiper('.team-container', {
			slidesPerView: 2,
			spaceBetween: 0,
			pagination: {
				el: '.team-pagination',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
			},

		});
	}
	
	var swiper2 = new Swiper('.company-container');

	AOS.init();
	AOS.init({
		duration: 1500,
		easing: 'ease-in-cubic',
		offset: 50
	});
});