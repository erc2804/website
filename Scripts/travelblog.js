$(init);

function init() {
  $(window).resize(checkNavMenu);
  $(".portfolio-box > a").click(function() {
    toggleTbModal();
  });
	$("#tb-modal-bg").click(function() {
		if(checkTbModalActive()) {
			toggleTbModal();
		}
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

// ---
function checkTbModalActive() {
  return !$("#tb-modal").hasClass("deepHide");
}

function toggleTbModal() {
  if (checkTbModalActive()) {
    $("#tb-modal, #tb-modal-bg").addClass("deepHide");
  } else {
    $("#tb-modal, #tb-modal-bg").removeClass("deepHide");
  }
}
