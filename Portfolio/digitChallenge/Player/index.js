var app = angular.module("digitApp", []);
app.controller("digitCtrl", [
  "$scope",
  "$timeout",
  "$sce",
  function($scope, $timeout, $sce) {
    // --- angular scopes
    $scope.result = 0;
    $scope.itemCategory = 1;
    $scope.curFormula = null;
    $scope.usedNumbers = [];
    $scope.formulaComplete = false;
    $scope.TypeAnimRuns = false;
    $scope.fieldClick = function(id) {
      if (!$scope.TypeAnimRuns) {
        fieldClick(id);
      }
    };
    $scope.numberClick = function(id) {
      if (!$scope.TypeAnimRuns) {
        numberClick(id);
      }
    };
    $scope.eraseClick = function() {
      if (!$scope.TypeAnimRuns) {
        eraseClick();
      }
    };
    $scope.saveItem = saveItem;
    $scope.curActiveFieldId = null;

    $(function() {
      delay = 700;
      $(window).resize(setElements);
      $timeout(setElements, 10);
      nextItem();
    });

    function nextItem() {
      // --- get next item
      var theItm = setupFormula();
      $scope.curFormula = theItm[0];
      $scope.result = theItm[1];
      $(".active").removeClass("active"); // --- remove anim cls
      // build htmlcontent
      fillScreen();
      // --- set back used numbers
      updateUsedNumbers();
      // --- mark first number field
      var allNums = _.filter($scope.curFormula, "isNumber");
      if (allNums !== undefined && allNums !== null && allNums.length > 0) {
        $scope.curActiveFieldId = allNums[0].id;
      }
      setElements();
    }

    function fillScreen() {
      var formulaLength = Object.keys($scope.curFormula).length,
        maxTime = 2000;
      $scope.TypeAnimRuns = true;
      $scope.screenContent = $sce.trustAsHtml("");
      for (var i = 1; i <= formulaLength; i++) {
        addToScreen($scope.curFormula[i.toString()], i, i === formulaLength);
      }
    }

    function addToScreen(cff, iteration, last, waitingTimes) {
      $timeout(function() {
        $scope.screenContent = $sce.trustAsHtml(
          $scope.screenContent +
            "" +
            (cff.isNumber
              ? "<a class='res-digit-container flex-display flex-row flex-center flex-alignCenter'></a>"
              : "<div class='" + cff.css + " flex-display flex-center'></div>")
        );
        if (last) {
          $timeout(function() {
            $scope.screenContent = $sce.trustAsHtml(
              $scope.screenContent +
                "" +
                "<div class='equals flex-display flex-center'></div>"
            );
            $timeout(function() {
              $scope.screenContent = $sce.trustAsHtml(
                $scope.screenContent +
                  "" +
                  "<div class='equalsNmbr flex-display flex-center'><span>" +
                  $scope.result +
                  "</span></div>"
              );
              $scope.TypeAnimRuns = false;
            }, 333);
          }, 333);
        }
      }, 333 * iteration);
    }

    function setupFormula() {
      switch ($scope.itemCategory) {
        case 1:
          return [
            {
              1: {
                isNumber: true,
                value: null,
                id: 1
              },
              2: {
                isSymbol: true,
                css: "plus"
              },
              3: {
                isNumber: true,
                value: null,
                id: 2
              }
            },
            17
          ];
        case 2:
          return [
            {
              1: {
                isNumber: true,
                value: null,
                id: 1
              },
              2: {
                isSymbol: true,
                css: "multi"
              },
              3: {
                isNumber: true,
                value: null,
                id: 2
              }
            },
            54
          ];
        case 3:
          return [
            {
              1: {
                isNumber: true,
                value: null,
                id: 1
              },
              2: {
                isSymbol: true,
                css: "plus"
              },
              3: {
                isNumber: true,
                value: null,
                id: 2
              },
              4: {
                isSymbol: true,
                css: "plus"
              },
              5: {
                isNumber: true,
                value: null,
                id: 3
              }
            },
            8
          ];
        case 4:
          return [
            {
              1: {
                isNumber: true,
                value: null,
                id: 1
              },
              2: {
                isSymbol: true,
                css: "minus"
              },
              3: {
                isNumber: true,
                value: null,
                id: 2
              },
              4: {
                isSymbol: true,
                css: "plus"
              },
              5: {
                isNumber: true,
                value: null,
                id: 3
              }
            },
            7
          ];
        case 5:
          return [
            {
              1: {
                isNumber: true,
                value: null,
                id: 1
              },
              2: {
                isSymbol: true,
                css: "plus"
              },
              3: {
                isNumber: true,
                value: null,
                id: 2
              },
              4: {
                isSymbol: true,
                css: "plus"
              },
              5: {
                isNumber: true,
                value: null,
                id: 3
              },
              6: {
                isSymbol: true,
                css: "plus"
              },
              7: {
                isNumber: true,
                value: null,
                id: 4
              }
            },
            27
          ];
        case 6:
          return [
            {
              1: {
                isNumber: true,
                value: null,
                id: 1
              },
              2: {
                isSymbol: true,
                css: "plus"
              },
              3: {
                isNumber: true,
                value: null,
                id: 2
              },
              4: {
                isSymbol: true,
                css: "minus"
              },
              5: {
                isNumber: true,
                value: null,
                id: 3
              },
              6: {
                isSymbol: true,
                css: "plus"
              },
              7: {
                isNumber: true,
                value: null,
                id: 4
              }
            },
            8
          ];
        case 7:
          return [
            {
              1: {
                isSymbol: true,
                css: "open-bracket"
              },
              2: {
                isNumber: true,
                value: null,
                id: 1
              },
              3: {
                isSymbol: true,
                css: "multi"
              },
              4: {
                isNumber: true,
                value: null,
                id: 2
              },
              5: {
                isSymbol: true,
                css: "close-bracket"
              },
              6: {
                isSymbol: true,
                css: "plus"
              },
              7: {
                isNumber: true,
                value: null,
                id: 3
              }
            },
            73
          ];
        case 8:
          return [
            {
              1: {
                isSymbol: true,
                css: "open-bracket"
              },
              2: {
                isNumber: true,
                value: null,
                id: 1
              },
              3: {
                isSymbol: true,
                css: "multi"
              },
              4: {
                isNumber: true,
                value: null,
                id: 2
              },
              5: {
                isSymbol: true,
                css: "close-bracket"
              },
              6: {
                isSymbol: true,
                css: "minus"
              },
              7: {
                isNumber: true,
                value: null,
                id: 3
              }
            },
            65
          ];
        case 9:
          return [
            {
              1: {
                isSymbol: true,
                css: "open-bracket"
              },
              2: {
                isNumber: true,
                value: null,
                id: 1
              },
              3: {
                isSymbol: true,
                css: "multi"
              },
              4: {
                isNumber: true,
                value: null,
                id: 2
              },
              5: {
                isSymbol: true,
                css: "close-bracket"
              },
              6: {
                isSymbol: true,
                css: "plus"
              },
              7: {
                isNumber: true,
                value: null,
                id: 3
              },
              8: {
                isSymbol: true,
                css: "plus"
              },
              9: {
                isNumber: true,
                value: null,
                id: 4
              }
            },
            27
          ];
        case 10:
          return [
            {
              1: {
                isNumber: true,
                value: null,
                id: 1
              },
              2: {
                isSymbol: true,
                css: "multi"
              },
              3: {
                isNumber: true,
                value: null,
                id: 2
              },
              4: {
                isSymbol: true,
                css: "multi"
              },
              5: {
                isNumber: true,
                value: null,
                id: 3
              }
            },
            54
          ];
        case 11:
          return [
            {
              1: {
                isSymbol: true,
                css: "open-bracket"
              },
              2: {
                isNumber: true,
                value: null,
                id: 1
              },
              3: {
                isSymbol: true,
                css: "multi"
              },
              4: {
                isNumber: true,
                value: null,
                id: 2
              },
              5: {
                isSymbol: true,
                css: "multi"
              },
              6: {
                isNumber: true,
                value: null,
                id: 3
              },
              7: {
                isSymbol: true,
                css: "close-bracket"
              },
              8: {
                isSymbol: true,
                css: "plus"
              },
              9: {
                isNumber: true,
                value: null,
                id: 4
              }
            },
            49
          ];
        case 12:
          return [
            {
              1: {
                isSymbol: true,
                css: "open-bracket"
              },
              2: {
                isNumber: true,
                value: null,
                id: 1
              },
              3: {
                isSymbol: true,
                css: "multi"
              },
              4: {
                isNumber: true,
                value: null,
                id: 2
              },
              5: {
                isSymbol: true,
                css: "multi"
              },
              6: {
                isNumber: true,
                value: null,
                id: 3
              },
              7: {
                isSymbol: true,
                css: "close-bracket"
              },
              8: {
                isSymbol: true,
                css: "minus"
              },
              9: {
                isNumber: true,
                value: null,
                id: 4
              }
            },
            427
          ];
        default:
          break;
      }
    }

    function saveItem() {
      if ($scope.formulaComplete) {
        $scope.formulaComplete = false;
        changeCat();
      }
    }

    function changeCat() {
      $(".lock-wheel-container").addClass("wheelAnim active");
      var isRight = checkAnswer();
      if (isRight) {
        $scope.itemCategory++;
      } else {
        $scope.itemCategory--;
      }
      // --- if category out of bounds
      if ($scope.itemCategory > 12) {
        $scope.itemCategory = 12;
      } else if ($scope.itemCategory <= 0) {
        $scope.itemCategory = 1;
      }
      $timeout(function() {
        $(".eql-container").addClass("active");
        $(".lock-wheel-container").removeClass("wheelAnim active");
        $timeout(function() {
          // $(".active").removeClass("active");
          showFeedback(isRight);
        }, 700);
      }, 500);
    }

    function checkAnswer() {
      var allNums = _.filter($scope.curFormula, "isNumber"),
        allVals = [];
      _.forEach(allNums, function(an) {
        allVals.push(an.value);
      });
      switch ($scope.itemCategory) {
        case 1:
        case 3:
        case 5:
          return _.sum(allVals) === $scope.result;
        case 2:
          return allVals[0] * allVals[1] === $scope.result;
        case 4:
          return allVals[0] - allVals[1] + allVals[2] === $scope.result;
        case 6:
          return (
            allVals[0] + allVals[1] - allVals[2] + allVals[3] === $scope.result
          );
        case 7:
          return allVals[0] * allVals[1] + allVals[2] === $scope.result;
        case 8:
          return allVals[0] * allVals[1] - allVals[2] === $scope.result;
        case 9:
          return (
            allVals[0] * allVals[1] + allVals[2] + allVals[3] === $scope.result
          );
        case 10:
          return allVals[0] * allVals[1] * allVals[2] === $scope.result;
        case 11:
          return (
            allVals[0] * allVals[1] * allVals[2] + allVals[3] === $scope.result
          );
        case 12:
          return (
            allVals[0] * allVals[1] * allVals[2] - allVals[3] === $scope.result
          );
        default:
          break;
      }
    }

    function fieldClick(clickedId) {
      // --- mark number field
      var allNums = _.filter($scope.curFormula, "isNumber");
      if (allNums !== undefined && allNums !== null && allNums.length > 0) {
        $scope.curActiveFieldId = clickedId;
      }
    }

    function numberClick(clickedId) {
      // --- if number already in curFormula -> do nothing
      var foundObj = _.find($scope.curFormula, {
        value: clickedId
      });
      if (foundObj === undefined || foundObj === null) {
        var relObj = _.find($scope.curFormula, {
          id: $scope.curActiveFieldId
        });
        if (relObj !== undefined && relObj !== null) {
          // --- if current active field is filled with a number -> SWAP number with field
          // --- if current active field is empty -> ADD number to field
          // --- same allocation
          relObj.value = clickedId;
        }
        updateUsedNumbers();
        selectNextField();
      }
    }

    function eraseClick() {
      var allNums = _.filter($scope.curFormula, "isNumber");
      if (allNums !== undefined && allNums !== null) {
        var relObj = _.find(allNums, {
          id: $scope.curActiveFieldId
        });
        if (relObj !== undefined && relObj !== null) {
          relObj.value = null;
          updateUsedNumbers();
        }
      }
    }

    function updateUsedNumbers() {
      $scope.usedNumbers = [];
      var allNums = _.filter($scope.curFormula, "isNumber");
      if (allNums !== undefined && allNums !== null) {
        _.forEach(allNums, function(relObj) {
          $scope.usedNumbers.push(relObj.value);
        });
        $scope.formulaComplete =
          $scope.usedNumbers.length === allNums.length &&
          $scope.usedNumbers.indexOf(null) === -1;
        $scope.formulaCompleteDisplay = $scope.formulaComplete;
      }
    }

    function selectNextField() {
      var allNums = _.filter($scope.curFormula, "isNumber");
      if (allNums !== undefined && allNums !== null) {
        var foundHigherNum = _.find(allNums, function(an) {
          return (
            an.id >
            ($scope.curActiveFieldId !== null && $scope.curActiveFieldId > 0
              ? $scope.curActiveFieldId
              : 0)
          );
        });
        if (foundHigherNum !== undefined && foundHigherNum !== null) {
          $scope.curActiveFieldId = foundHigherNum.id;
        }
      }
    }

    function showFeedback(rightAnswer) {
      var $ele = $(".up-anim-chevron"),
        $eleCont = $(".up-anim-parent"),
        toDown = !rightAnswer;
      $ele.removeClass(
        "glyphicon-chevron-up glyphicon-chevron-down reverseAnim"
      );
      $ele.addClass(
        "glyphicon-chevron-" + (toDown ? "down reverseAnim" : "up")
      );
      $(".up-anim-text").text("Level " + (toDown ? "Down" : "Up") + "!");
      $eleCont.removeClass("deepHide");
      $timeout(function() {
        $eleCont.addClass("deepHide");
        nextItem();
      }, 1300);
    }

    function setElements() {
      var $rel = $("#sizeSimulation"),
        wndw = {
          w: $rel.width(),
          h: $rel.height()
        },
        relSize = isPortrait() ? wndw.w * 0.8 : wndw.h * 0.8;
      $(".calculator-wrapper").css({
        width: isPortrait() ? relSize : relSize * 0.8,
        height: isPortrait() ? relSize * 1.25 : relSize
      });
    }

    function isPortrait() {
      return window.matchMedia("(orientation: portrait)").matches;
    }
  }
]);
