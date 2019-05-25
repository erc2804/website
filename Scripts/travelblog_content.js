var curLoc = "",
    resColl = { videos: [], images: [] };

$(init);

function init() {
  $(window).resize(checkNavMenu);
  curLoc = window.location.search.substring(1);
  if (curLoc) {
    curLoc = curLoc.split("=")[1];
    $(".visitenkarte > span").append(curLoc.replace(/^\w/, c => c.toUpperCase()));
    fillResPerLoc();
    fillWithRes();
  }
}

function fillResPerLoc() {
  var resCountObj = { videos: 0, images: 0 };
  switch (curLoc) {
    case "japan":
      resCountObj.images = 23;
      resCountObj.videos = 3;
      break;
    case "morocco":
      resCountObj.images = 11;
      break;
    case "czechia":
      resCountObj.images = 10;
      break;
    case "hungary":
      resCountObj.images = 2;
      break;
    case "spain":
      resCountObj.images = 6;
      break;
    default:
      break;
  }

  for(var i = 1; i <= resCountObj.images; i++) {
    resColl.images.push(i.toString());
  }
  for(var i = 1; i <= resCountObj.videos; i++) {
    resColl.videos.push(i.toString());
  }
}

function fillWithRes() {
  resColl.images.forEach(function(imgId) {
    $(".lower-container").append(
      "<div>" +
        "<img src='Content/travelblog-resources/" + curLoc + "/images/image_" + imgId + ".jpg' class='added-res' />" +
      "</div>"
    );
  });
  resColl.videos.forEach(function(vidId) {
    $(".lower-container").append(
      "<div>" +
        "<video class='added-res' controls>" +
          "<source src='Content/travelblog-resources/" + curLoc + "/videos/video_" + vidId + ".mp4' type='video/mp4'>" +
        "</video>" +
      "</div>"
    );
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