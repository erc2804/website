var curCSS = [],
  allDirections = ["right", "bottom right", "bottom", "bottom left", "left", "top left", "top", "top right"],
  hexArr = [],
  curDirectionIdx = 0;

$(init);

function init() {
  $(window).resize(checkNavMenu);
  $("#next-btn").click(generateNewGradient);
  $("#code-btn").click(toggleCode);
  $("#copy-btn").click(function () {
    copyToClipboard(this);
    toggleCode();
  });
  $("#rotate-btn").click(function () {
    curDirectionIdx++;
    curDirectionIdx = curDirectionIdx > allDirections.length - 1 ? 0 : curDirectionIdx;
    setNewGradientInView();
  });
  generateNewGradient();
}

function checkNavMenu() {
  if (!$(".navMenu").hasClass("deepHide")) {
    morphBurgerBtn();
  }
}

function morphBurgerBtn() {
  $(".navIcon > div").toggleClass("animate");
  $(".navMenu").toggleClass("deepHide");
}

function toggleCode() {
  $("#hex-css-container").toggleClass("flipInX");
}

function generateNewGradient() {
  hexArr = [generateHexColor(), generateHexColor()];
  curDirectionIdx = 0;
  // --- add new hex colors to toolbar
  hexArr.forEach(function (curHex, index) {
    $("#hex" + (index + 1) + " > .hex-icon").css(
      "background-color",
      hexArr[index]
    );
    $("#hex" + (index + 1) + " > .hex-code").text(hexArr[index]);
  });
  setNewGradientInView();
}

function setNewGradientInView() {
  curCSS = [
    "background: " + hexArr[0] + ";",
    "background: -webkit-linear-gradient(to " + allDirections[curDirectionIdx] + ", " +
    hexArr[0] +
    ", " +
    hexArr[1] +
    ");",
    "background: linear-gradient(to " + allDirections[curDirectionIdx] + ", " +
    hexArr[0] +
    ", " +
    hexArr[1] +
    ");"
  ];

  // --- remove old gradient styles
  $("style#curGradient").remove();
  // --- add new gradient styles
  $("head").append(
    "<style id='curGradient'>.rggen-gradient { " +
    curCSS.join("") +
    " }</style>"
  );

  var $rgg = $("#hex-css-code");
  // --- remove old css code from view
  $rgg.empty();
  // --- add new css code from view
  curCSS.forEach(function (stl) {
    $rgg.html($rgg.html() + ($rgg.html() ? "<br/>" : "") + stl);
  });
}

function generateHexColor() {
  return (
    "#" +
    Math.random()
      .toString(16)
      .slice(2, 8)
      .toUpperCase()
  );
}

function copyToClipboard() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(curCSS.join("")).select();
  document.execCommand("copy");
  $temp.remove();
}
