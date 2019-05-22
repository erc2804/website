var app = angular.module('vidApp', [])
app.controller('vidCtrl', ['$scope', '$timeout', '$interval', '$sce', function($scope, $timeout, $interval, $sce) {

  var ua = navigator.userAgent,
      device = { isSmart: !!(ua.match(/(iPod|iPad|iPhone|Windows Phone|Android)/)), isChrome: !!(ua.match(/Chrome/)), isFF: !!(ua.match(/Firefox/)), isEdge: !!(ua.match(/Edge/)) },
      constraints = {
          audio: true,
          video: { width: { min: 640, ideal: 1280, max: 1280 }, height: { min: 480, ideal: 720, max: 720 } }
      },
      mediaRecorder = null,
      recordedChunks = [],
      meter = null,
      meterInt = null,
      stream = null,
      audContext = null,
      wrongBrowser = false;

      $scope.questionContent = $sce.trustAsHtml("The question you will have to answer will be here. Click on the record button beneath to start the interview.");
      $scope.replayTxtContent = $sce.trustAsHtml("Are you satisfied with the record? Then please press the next button beneath. If not you can recapture by pressing the repeat button.");
      $scope.errorMessage = $sce.trustAsHtml("");
      $scope.isRecording = false;
      $scope.streamHidden = false;
      $scope.lockedRecBtn = false;
      $scope.isReplay = false;
      $scope.replayIsPlaying = false;
      $scope.uploadFinished = false;

      $scope.startStream = startStream;
      $scope.recStartAnim = recStartAnim;
      $scope.stopRec = stopRec;
      $scope.restartRec = restartRec;
      $scope.hideClick = hideClick;
      $scope.pageAfterReplay = function(upload) { pageAfterReplay(upload); };
      $scope.uploadFinClick = uploadFinClick;
      $scope.backToMain = backToMain;
      $scope.triggerReplay = function (state) {
          var repVid = $("#vid-replay")[0];
          switch(state) {
              case "play":
                  $scope.replayIsPlaying = true;
                  repVid.play();
                  break;
              case "pause":
                  $scope.replayIsPlaying = false;
                  repVid.pause();
                  break;
              default:
                  break;
          }
      };

  $(init);

  function init() {
    $(window).resize(setElements);
    preloadImages();
    preloadAudio();
    var browserSupported = checkBrowser();
    if(!browserSupported) {
      $("#wrongBrowser").removeClass("deepHide");
      $("#instruction-page .btn-myDefault").attr("disabled", "disabled");
      wrongBrowser = true;
    }
    switchPage("instruction-page");
  }

  function checkBrowser() {
    return !device.isSmart && !device.isEdge && (device.isChrome || device.isFF);
  }

  function preloadImages() {
    $(["eye-open", "eye-close", "play", "pause", "stop", "record"]).each(function () {
        $("body").append("<img src='Content/" + this + ".svg' style='display: none;' />");
    });
  }

  function preloadAudio() {
      $([{ id: 1, name: "sfile_1" }, { id: 2, name: "sfile_2" }]).each(function () {
          $("body").append("<audio id='prlf_" + this.id + "' preload='true'><source src='Content/" + this.name + ".mp3' type='audio/mpeg'></audio>");
      });
  }

  function startStream() {
    if(!wrongBrowser) {
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function() { // --- check if audio permission granted
              navigator.mediaDevices.getUserMedia({ video: true })
                  .then(function() { // --- check if video permission granted
                      navigator.mediaDevices.getUserMedia(constraints)
                          .then(function(mediaStream) { // --- start actual stream
                              stream = mediaStream; // --- to global
                              switchPage("rec-page");
                              var vid = $("#va-recorder > #stream")[0];
                              $timeout(function () {
                                  vid.onplaying = function() { setElements(); $("#video-btns-container-stream").removeClass("softHide"); }; // --- set meter box sizes relevant depending video size after vid starts
                                  vid.srcObject = stream;
                                  vid.volume = 0;
                                  vid.onloadedmetadata = function () { vid.play(); }
                                  audioMeter(stream);
                                  lockRecStopBtn(false);
                              });
                          }).catch(function(error) { showErrorMessage("both"); });
                  }).catch(function(error) { showErrorMessage("cam"); });
          }).catch(function(error) { showErrorMessage("mic"); });
      }
  }

  function startRec() {
    $scope.isRecording = true;
    $scope.isReplay = false;
    $scope.questionContent = $sce.trustAsHtml("You freshly started a career in sales. How would you deal with an angry customer in a retail store?");
    lockRecStopBtn(false);
    var options = { audioBitsPerSecond: 96000, videoBitsPerSecond: 1000000, mimeType: 'video/webm' },
        vidEle = $("#va-recorder > #stream")[0];
    if (vidEle.srcObject === null || vidEle.srcObject === undefined) {
      showErrorMessage("An error occured. Please restart the interview or use another browser/device.");
      return;
    }
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(vidEle.srcObject, options);
    mediaRecorder.ondataavailable = addBlob;
    mediaRecorder.start();
  }

  function addBlob(event) { if (event.data.size > 0) { recordedChunks.push(event.data); } }

  function stopRec() {
    mediaRecorder.stop();
    $timeout(showReplay, 100);
  }

  function showReplay() {
    $scope.isRecording = false;
    $scope.isReplay = true;
    $scope.replayIsPlaying = false;
    $("#va-recorder > #stream")[0].srcObject = null;
    var vidBlob = new Blob(recordedChunks);
    $("#va-recorder #vid-replay")[0].src = window.URL.createObjectURL(new Blob(recordedChunks));
    if ($scope.streamHidden) { hideClick(); }
  }

  function lockRecStopBtn(state) {
    $timeout(function() {
      $scope.lockedRecBtn = state;
    });
  }

  function pageAfterReplay(upload) {
    $timeout(function() {
      var $replayEle = $("#va-recorder #vid-replay")[0];
      $scope.replayIsPlaying = false;
      $replayEle.pause();
      $replayEle.currentTime = 0;
      $scope.replayIsPlaying = false;
      $scope.isRecording = false;
      $scope.isReplay = false;
      $(".rec-timer").addClass("softHide");
      lockRecStopBtn(true);
      if(upload) {
        uploadVideo();
      } else {
        restartRec();
      }
    });
  }

  function restartRec() {
    $timeout(startStream);
  }

  function uploadVideo() {
    $timeout(function() {
      $scope.uploadFinished = false;
      switchPage("upload-page");
      startUploadAnim(0);
    });
  }

  function startUploadAnim(uploadStatus) {
      var demoUploadInt = $interval(function () {
          if (uploadStatus >= 100) {
              $interval.cancel(demoUploadInt);
              $timeout(function() { $scope.uploadFinished = true; return false; });
          }
          $("#upload-page .progress-bar").text(uploadStatus + "%").css("width", uploadStatus + "%");
          uploadStatus += 10;
      }, 300);
  }

  function uploadFinClick() {
    switchPage("last-page");
  }

  function recStartAnim() { lockRecStopBtn(true); $(".rec-timer").removeClass("softHide"); recAnim(3, false); }

  function recAnim(count, ply) {
      ply = !!ply;
      var $rtime = $('.rec-timer');
      setBackAudio(1);
      $("#prlf_" + (ply ? "2" : "1"))[0].play();
      $rtime
          .css({ "width": "", "height": "", "opacity": "" }) // --- to set back the dynamically added css values after animation
          .empty() // --- to remove dynamically added span 'glyph-play'
          .html(ply ? "<span class='glyphicon glyphicon-play'></span>" : "<span>" + count + "</span>") // --- add text to bubble
          .removeClass(ply ? "softHide" : "")
          .animate({ width: 80 + "px", height: 80 + "px", opacity: 0.1 }, 1000, function () {
            if(ply) {
              $rtime.addClass("softHide"); // --- hide bubble
              setBackAudio(2);
              $timeout(startRec);
            } else {
              count--;
              if (count === 0) {
                $rtime.addClass("softHide");
                recAnim(null, true);
              } else {
                recAnim(count, false);
              }
            }
          });
  }

  function setBackAudio(which) {
    var sfile = $("#prlf_" + which)[0];
    sfile.pause();
    sfile.currentTime = 0;
  }

  function hideClick() {
    $scope.streamHidden = !$scope.streamHidden;
    $("#stream").toggleClass("lowerOpac");
  }

  function switchPage(toWhich) {
    $(".page").addClass("deepHide");
    $("#" + toWhich).removeClass("deepHide");
  }

  function showErrorMessage(message) {
    switchPage("error-page");
    if(message === "cam" || message === "mic" || message === "both") {
      message = "Please plug-in a webcam and microphone and allow the browser to use your webcam/microphone if prompted.";
    }
    $timeout(function() { $scope.errorMessage = $sce.trustAsHtml(message); });
  }

  function audioMeter(stream) {
    if (audContext !== null) { audContext.close(); }
    audContext = new AudioContext();
    // Create an AudioNode from the stream.
    var mediaStreamSource = audContext.createMediaStreamSource(stream);
    // Create a new volume meter and connect it.
    meter = createAudioMeter(audContext, 0.9);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
    $interval.cancel(meterInt);
    meterInt = $interval(drawLoop, 100);
  }

  function drawLoop() {
      // --- volume bar - tricolor
      var relVol = (meter.volume).toFixed(2);
      $(".meterBox").css("height", 0);
      if (relVol < .1) {
          // --- yellow not full
          $("#meterBox_1").css("height", (relVol * 100) + "%");
      } else {
          // --- yellow full
          $("#meterBox_1").css("height", 10 + "%");
          if (relVol < .75) {
              // --- green not full
              $("#meterBox_2").css("height", ((relVol * 100) - 10) + "%");
          } else {
              // --- green full
              $("#meterBox_2").css("height", ((75 * 100) - 10) + "%");
              if (relVol < 1) {
                  // --- red not full
                  $("#meterBox_3").css("height", ((relVol * 100) - 85) + "%");
              } else {
                  // --- red full
                  $("#meterBox_3").css("height", 15 + "%");
              }
          }
      }
  }

  function setElements() {
      var $vid = $("#va-recorder > #stream"),
          vidSize = { w: $vid.width(), h: $vid.height() };
      $(".va-volume-bar").css({"height": vidSize.h + "px", "width": (vidSize.h * 0.04) + "px" });
      $(".video-btns-container").css("height", vidSize.h + "px");
      $(".rec-timer").css("top", vidSize.h / 2 + "px");
  }

  function backToMain() {
    window.open("http://www.ercancicek.de", "_self");
  }

}]);
