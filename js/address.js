'use strict';

(function () {
  var mainPin = window.data.mainPin;
  var mainPinHalfWidth = mainPin.offsetWidth / 2;
  var MAIN_TAIL_HEIGHT = window.form.mainTailHeight;
  var LocationParam = window.data.LocationParam;

  var onMainPinMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinMousemove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shift = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };

      startCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var currentPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      switch (true) {
        case currentPinPosition.x < LocationParam.MIN_X - mainPinHalfWidth :
          currentPinPosition.x = LocationParam.MIN_X - mainPinHalfWidth;
          break;
        case currentPinPosition.x > LocationParam.MAX_X - mainPinHalfWidth :
          currentPinPosition.x = LocationParam.MAX_X - mainPinHalfWidth;
          break;
        case currentPinPosition.y < LocationParam.MIN_Y - (mainPin.offsetHeight + MAIN_TAIL_HEIGHT) :
          currentPinPosition.y = LocationParam.MIN_Y - (mainPin.offsetHeight + MAIN_TAIL_HEIGHT);
          break;
        case currentPinPosition.y > LocationParam.MAX_Y - (mainPin.offsetHeight + MAIN_TAIL_HEIGHT) :
          currentPinPosition.y = LocationParam.MAX_Y - (mainPin.offsetHeight + MAIN_TAIL_HEIGHT);
          break;
      }

      mainPin.setAttribute('style', 'left: '
        + Math.round(currentPinPosition.x) + 'px; ' +
        'top: ' + Math.round(currentPinPosition.y) + 'px');

      window.form.setAddressInput(false);
    };

    var onMainPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddressInput(false);

      document.removeEventListener('mousemove', onMainPinMousemove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };

    document.addEventListener('mousemove', onMainPinMousemove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  mainPin.addEventListener('mousedown', onMainPinMousedown);
})();
