$(document).ready(function(){

	$('.mob-menu').slideUp(0).removeClass('hide')

	$(window).on('resize', function() {
		if(window.innerWidth < 1024) {

			// mobile
			$(".menu-icon-wrapper").show();
			$(".mob-menu").hide();
			$(".menu").hide();
			$("div").removeClass("effect-steve");
			$(".menu-item").hide();
		
		} else {

			// desktop
			$(".mob-menu").hide();
			$(".menu").show();
			$(".menu-item").show();
			$(".menu-icon-wrapper").hide();

		}
	}).trigger('resize')


	$(".menu-icon-trigger").click(function(){
		$(".mob-menu").slideToggle("slow")
	})
	
})
