$(function(){
	$('.nav_hamburger').click(function(){
		$('.nav-res_item').removeClass('active');
		$(this).toggleClass('open');
		$('.nav_items-res').toggleClass('nav_active')
	});
	$('.nav_search-res').click(function () {
		$('.nav_items-res').removeClass('nav_active')
		$('.nav-res_item').toggleClass('active');
	})
	$(window).on('scroll', function (e) {
		if (window.scrollY>120) {
			$('#scrool-up').addClass("active");
		}else{
			$('#scrool-up').removeClass("active")
		}
	});
});