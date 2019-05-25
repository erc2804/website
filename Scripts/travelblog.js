$(init);

function init() {
  $(window).resize(checkNavMenu);
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