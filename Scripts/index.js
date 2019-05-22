$(init);

function init() {
	$(window).resize(checkNavMenu);
	$(".portfolio-box > a").click(function () {
		$(this).addClass("pulsateAnim");
	});
}

function checkNavMenu() {
	if (!$(".navMenu").hasClass("deepHide")) {
		morphBurgerBtn();
	}
}

function scrollToPortfolio() {
	$("html, body").animate({
		scrollTop: $(".lower-container").offset().top + "px"
	}, 'slow');
}

function morphBurgerBtn() {
	$(".navIcon > div").toggleClass("animate");
	$(".navMenu").toggleClass("deepHide");
}