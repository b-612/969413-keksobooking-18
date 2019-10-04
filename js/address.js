'use strict';

(function () {
  var mainPin = window.data.mainPin;

  var onMainPinMouseUp = function (moveResult) {
    return function (upEvt) {
      // debugger;
      upEvt.preventDefault();

      document.removeEventListener('mousemove', moveResult);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };
  };

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

      mainPin.setAttribute('style', 'top: '
        + (mainPin.offsetTop - shift.y) + 'px; ' +
        'left: ' + (mainPin.offsetLeft - shift.x) + 'px');
    };

    document.addEventListener('mousemove', onMainPinMousemove);
    document.addEventListener('mouseup', onMainPinMouseUp(onMainPinMousemove));
  };

  mainPin.addEventListener('mousedown', onMainPinMousedown);
})();
