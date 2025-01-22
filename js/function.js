
$(document).ready(function(){
	$('.tab__navlink').on('click', function(e){
		e.preventDefault();
		const $parents = $(this).parents('.tab');
		$(this).siblings('.tab__navlink').removeClass('active');
		$(this).addClass('active');

		var value = $(this).data('tablinkDetail');
		//console.log($(this).data());


		$parents.find('.tab__panel').hide();
		$parents.find('.tab__panel').eq(value - 1).show();

	});

	$('.modal__close').on('click', function(){
		if($(this).parents('.modal').attr("id")=="paycheckModal")
		{
			closemodalcart();
		}
		$(this).parents('.modal').hide();
	});

	$('.modal__close').on('click', function(){
		$(this).parents('.normalBox').hide();
	});

	$('.modal__close').on('click', function(){
		$(this).parents('.modal2').hide();
	});


		/*
	$('.tabLinks a').on('click', function(e){
		e.preventDefault();
		const $parents = $(this).parents('.tab-area');
		$parents.find('.tabLinks a').removeClass('active');
		$(this).addClass('active');

		var value = $(this).data('tablink');

		$parents.find('.tabItem').hide();
		$parents.find('.tabItem').eq(value - 1).show();
	});
	*/

	$('.nav__depth1').on('mouseenter', function(){
		$(this).find('.nav__depth2').stop().slideDown();
	})

	$('.nav__depth1').on('mouseleave', function(){
		$(this).find('.nav__depth2').stop().slideUp();
	})

});

function addSelectBtn() {
	$('.addSelect').show();
}