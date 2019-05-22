"use strict";

var ua = navigator.userAgent,
  device = {
    isSmart: !!(ua.match(/(iPod|iPad|iPhone|Windows Phone|Android)/)),
    isApple: !!(ua.match(/(iPod|iPad|iPhone)/)),
    isAndroid: !!(ua.match(/(Android)/)),
    isiPhone: !!(ua.match(/(iPod|iPhone)/)),
    isSmall: screen.availWidth < 480,
    isStd: screen.availWidth < 900
  },
  gameFlow = getGameFlow(), // --- get from new table (gameFlow)
  instFlow = getInstFlow(), // --- get from Task - std status from mapTQ (4: finished; 5: aborted)
  instCapab = getInstCap(), // --- get from Instrument Details
  imgArr = ["city.png", "scene.png", "elevator-button.svg", "elevator-speaker.png", "endScene.png", "oddExplains.gif", "loading.gif", "monitor.svg", "arrowUp.gif", "alert.gif", "rotateToPortrait.png", "splash.png"],
  audArr = ["oddSpeaks", "eleSound"],
  myVideo,
  oddTimer,
  curPageInd = 0,
  setSdStyles = true,
  firstStart = true,
  buttonLocked = true,
  preventDoubleClick = false;

// --- get relevant vars
function getGameFlow() { // --- TEST
  return [{
    type: "video", name: "introVideo"
  }, {
    type: "explain"
  }, {
    type: "scene" // --- loop until instFlow has no status 0 anymore
  }, {
    type: "video", name: "introVideo2"
  }, {
    type: "end"
  }];
}

function getInstFlow() { // --- TEST
  return [{ instId: 340, status: 0 }, { instId: 303, status: 0 }];
}

function getInstCap() {
  var instCap = JSON.stringify([
	  (function(){ if ((navigator.userAgent.match(/CriOS/) && navigator.userAgent.match(/(iPod|iPad|iPhone)/))) { return false; } else { return true; } })(),
	  (function(){ if (navigator.userAgent.match(/Windows Phone/) && ((window.matchMedia('(orientation: portrait)').matches && window.innerWidth < 400) || (window.matchMedia('(orientation: landscape)').matches && window.innerHeight < 400))) { return false; } else { return true; }})()
  ]);
  return JSON.parse(instCap);
}

function init() {
  preloadImages();
  if ($("#aud_" + audArr[0]).length === 0) preloadAudio();
  setElements();
  // --- otherwise iOS10 detection needed because of playsinline support and webkitendfullscreen evt
  if (!device.isiPhone) { $("#video-page video").attr("playsinline webkit-playsinline"); }
  // --- resize fns
  if (navigator.userAgent.indexOf('iPad') !== -1) { window.onorientationchange = resizeFn; } else { $(window).resize(resizeFn); }
  // --- if instCapab check not passed
  if (_.indexOf(instCapab, false) !== -1) { showFailPage("device"); return false; }

  var statusArr = buildStatusArr();
  // --- if user cancelled an inst (one inst status = 5) - show "please contact administrator"
  if (_.indexOf(statusArr, 5) !== -1) { showFailPage("cancelled"); return false; }
  // --- if user starts for the first time (all inst status = 0) - start on first gameFlow page...
  if (_.findIndex(statusArr, function(val) { return val !== 0; }) === -1) {
    curPageInd = 0;
    firstStart = true;
  } else {
    // --- ... else start on explain
    curPageInd = _.findIndex(gameFlow, { type: "scene" });
    firstStart = false;
  }
  switchPage();
}

function switchPage() {
  hideAllPages();
  switch (gameFlow[curPageInd].type) {
    case "video": startVideo(); break;
    case "explain": startExplain(); break;
    case "scene": startScene(); break;
    case "end": endPage(); break;
    default: console.log("error-message:\ngameflow type: ", gameFlow[curPageInd].type); break;
  }
}

// --- flow functions
function startVideo() {
  try {
    showPage("video");
    var fileName = gameFlow[curPageInd].name;
    $("#intro-vid-container > source").attr('src', "Content/" + fileName + (device.isSmart ? "_port" : "") + ".mp4");
    myVideo = $("#intro-vid-container")[0];
    // --- check if device supports mp4 video playback - !! coerces to bool (canPlayType can be a string like 'probably')
    if (!(!!myVideo.canPlayType('video/mp4; codecs="avc1.42E01E"'))) nextPage();
    // --- add controls to video container if device.isSmart - user needs to manually start it
    if (device.isSmart && device.isStd) { toggleControls(); }
    // --- android special cases
    if (device.isSmart && device.isStd && !device.isApple) { $("video").css("height", (isPortrait() ? window.outerHeight : window.outerWidth) * 0.8 + "px"); }
    if (device.isAndroid) { // --- check for android 4.1 and older -> no vid
      if (ua.indexOf("Android") >= 0) {
        var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
        if (androidversion < 4.1) { nextPage(); } else { playVid(); }
      }
    } else { playVid(); }
  } catch (err) {
    console.log("error-message: ", err);
  }
}

function startExplain() { showPage("explain"); }

function explainBtnClick() {
  if (!preventDoubleClick) {
    preventDoubleClick = true;
    nextPage();
  }
}

function startScene() {
  if (!getNextInstId()) {
    nextPage(); // --- no incomplete inst anymore
    return false;
  }
  setBackMonitor();
  showPage("scene");
  if (firstStart) $("#textBloon-content").text("You want to challenge me? Prove yourself worthy. The elevator is under my control - to gain access I want you to show what you can do!")
  setTimeout(function() {
    $("#elevator-btn").zoomTo({ root: $("#scene-page"), closeclick: true, nativeanimation: true, duration: 1000, animationendcallback: function() { toggleElevBtn(false); }}); // ---- zoom into elevator buttons
  }, 500);
}

function showOdd() {
  replaceMonitorImg("brainyImg");
  playSoundSmart("oddSpeaks"); // -- start oddSpeaks from beginning
  oddTimer = setTimeout(function() {
    setBackMonitor();
    stopSoundSmart("oddSpeaks");
  }, 11500);
  // --- show text bloon, hide elevator objects
  $("#scene-page .textBloon-container").removeClass("hide");
  $("#elevator-el-container").addClass("hide");
  // --- next button click fires challengeAccepted
}

function endPage() { showPage("end"); }

function showFailPage(failCase) {
  // --- show fail page with button to return to hub
  hideAllPages();
  showPage("scene");
  replaceMonitorImg("errorImg");
  $("#scene-page .textBloon-container, #error-btn").removeClass("hide");
  $("#elevator-el-container, #accept-btn").addClass("hide");
  $("#textBloon-content").text(failCase === "device" ? "Please try another device" : "Please contact the administrator");
}

// ----------------------------

// --- video relevant fns

function playVid() {
  if (device.isSmart && device.isStd) { myVideo.addEventListener("playing", rmvCtrlsWhenPlaying, false); }
  myVideo.load();
  setTimeout(function() { myVideo.play(); }, 500);
  if (device.isiPhone) {
    myVideo.addEventListener("webkitendfullscreen", finish, false);
  } else {
    myVideo.addEventListener("ended", finish, false);
  }
}

function finish() {
  nextPage();
  myVideo.pause();
  if (device.isiPhone) {
    myVideo.removeEventListener("webkitendfullscreen", finish, false);
  } else {
    myVideo.removeEventListener("ended", finish, false);
  }
}

function rmvCtrlsWhenPlaying(evt) {
  if (evt.timeStamp > 0) {
    toggleControls();
    myVideo.removeEventListener("playing", rmvCtrlsWhenPlaying, false);
  }
}

function toggleControls() {
  if (myVideo.hasAttribute("controls")) {
    myVideo.removeAttribute("controls");
  } else {
    myVideo.setAttribute("controls", "controls");
  }
}

function toggleElevBtn(toState) {
  buttonLocked = toState;
  $("#elevator-btn").toggleClass("pointer", !toState);
}

function challengeAccepted() {
  firstStart = false;
  clearTimeout(oddTimer);
  setBackMonitor();
  stopSoundSmart("oddSpeaks");
  // --- hide text bloon, show elevator objects
  $("#scene-page .textBloon-container").addClass("hide");
  $("#elevator-el-container").removeClass("hide");
  doCheck();
}

function elevatorUp() {
  $("#scene-page").zoomTo({ root: $("#scene-page"), nativeanimation: true, duration: 1000 }); // --- zoom out
  replaceMonitorImg("arrowUpImg");
  $("#bg-container").addClass("shake");
  setTimeout(function() {
    stopSoundSmart("eleSound");
    if (firstStart) {
      showOdd();
    } else {
      doCheck();
    }
  }, 3500);
}

function doCheck() {
  replaceMonitorImg("loadingImg");
  setTimeout(function() {
    startPlayer();
  }, 2000);
}

// --- DISABLE FOR TESTING ACTUAL PLAYER START
function startPlayer() {
  // --- playerStart if not on speech bubble page
  if (!firstStart) {
    var instId = getNextInstId();
    // --- TEST
    var instInd = _.findIndex(instFlow, { instId: instId });
    if (instInd !== -1) { instFlow[instInd].status = 4; }
    // ---
    hideAllPages();
    $("#pageCont").addClass("splashImg");
    setTimeout(function() {
      $("#pageCont").removeClass("splashImg");
      init();
    }, 2000);
  }
}

// --- utilities
function buildStatusArr() {
  var statusArr = [];
  instFlow.forEach(function(inst, index) { statusArr.push(inst.status); });
  return statusArr;
}

function getNextInstId() {
  var nextInst = _.find(instFlow, function(inst) { return inst.status < 4; });
  if (nextInst !== undefined && nextInst !== null) { return nextInst.instId; }
  return false;
}

function hideAllPages() { $(".page").addClass("hide"); }

function nextPage() { curPageInd++; switchPage(); }

function showPage(pageName) {
  if (pageName !== "video") { resizeFn(); }
  $("#" + pageName + "-page").removeClass("hide");
}

function resizeFn() {
  if (device.isSmart && device.isStd) { $("#rotModal").modal(isPortrait() ? "hide" : "show"); }
  // --- adjust correct monitor size
  if (device.isSmall) {
    var windowSize = { w: $("#pageCont").width(), h: $("#pageCont").height() },
        monitorWidth = windowSize.w * .75,
        specialAspectRatio = windowSize.h < (windowSize.w * 1.5); // --- if aspect ratio < 1/1.5 -> resize monitor
    $("#scene-objects").css("width", specialAspectRatio ? monitorWidth * .75 : monitorWidth + "px");
    $("#monitor").css("height", specialAspectRatio ? monitorWidth * .75 * .75 : monitorWidth * .75 + "px"); // --- 4 : 3
  }
  $("#scene-page .textBloon > span").css("max-height", $("#monitor").height() * (device.isSmall ? 1 : 1.2) + "px");
}

function eleBtnClick() {
  if (!buttonLocked) {
    // --- preload audio on smart devices hack
    preloadAudioSmart();
    toggleElevBtn(true);
    elevatorUp();
  }
}

function backToHub() { window.open("http://www.ercancicek.de", "_self"); }

function replaceMonitorImg(newImg) {
  setBackMonitor();
  $("#monitor-content").addClass(newImg);
}

function setBackMonitor() {
  $("#monitor-content, #error-message").removeClass("brainyImg loadingImg arrowUpImg errorImg").text("");
  $("#bg-container").removeClass("shake");
}

function setElements() {
  if (device.isSmart && setSdStyles) {
    $("head").append("<style type='text/css'> #pageCont { width: 100%; height: 100%; } </style>");
    setSdStyles = false;
  }
  $("#rotModal").modal({ show: false, keyboard: false, backdrop: "static" });
}

function preloadImages() {
  $(imgArr).each(function() { $('<img/>')[0].src = "Content/" + this; });
}

function preloadAudio() {
  $(audArr).each(function() { $("body").append("<audio id='aud_" + this + "' preload='true'><source src='Content/" + this + ".mp3' type='audio/mpeg'></audio>"); })
}

function preloadAudioSmart() {
  _.forEach(audArr, function(fileName) {
    var aud = $("#aud_" + fileName)[0];
    aud.volume = 1.0;
    aud.play();
    // --- eleSound have to play immediately - other sounds have to stop
    if (fileName !== "eleSound") {
      aud.volume = 0;
      var audIntval = setInterval(function() {
        if (aud.currentTime !== 0) {
          aud.pause();
          clearInterval(audIntval);
        }
      }, 10);
    }
  });
}

function playSoundSmart(fileName) {
  var aud = $("#aud_" + fileName)[0];
  aud.pause();
  aud.currentTime = 0;
  aud.volume = 1.0;
  aud.play();
}

function stopSoundSmart(fileName) {
  var aud = $("#aud_" + fileName)[0];
  aud.pause();
  aud.volume = 0;
}

function isPortrait() { return window.matchMedia("(orientation: portrait)").matches; }

$(function() { init(); });
