$(function(){
	$('.nav_hamburger').click(function(){
		$('.nav-res_item').removeClass('active');
		$(this).toggleClass('open');
		$('.nav_items-res').toggleClass('nav_active')
	});
	$('.nav_search-res').click(function () {
		$('.nav_items-res').removeClass('nav_active')
		$('.nav-res_item').toggleClass('active');
		$('.search_items').removeClass('active');
	})

	// $(window).on('scroll', function (e) {
	// 	if (window.scrollY>120) {
	// 		$('#scrool-up').addClass("active");
	// 	}else{
	// 		$('#scrool-up').removeClass("active")
	// 	}
	// });

	document.addEventListener('scroll',  function (e) {
		if (window.scrollY>120) {
			$('#scrool-up').addClass("active");
		}else{
			$('#scrool-up').removeClass("active")
		}
	}, {passive: true, capture: true});




	$('#searchInput').focus(function () { 
		if ($(this).val()!="") {
			$('.search_items').addClass('active');;
		}
	});
	$('#searchInput').focusout(function () {
		$('.search_items').removeClass('active');;
	});

	$(document).on('keyup','#searchInput',function () {
		if ($(this).val()==="") {
			$('.search_items').removeClass('active');;
		}else{
			$('.search_items').addClass('active');;
		}
	})
});