'use strict';

(function () {
  var mapArea = document.querySelector('.map__pins');
  var mainPin = window.form.mainPin;
  var mainPinHalfWidth = mainPin.offsetWidth / 2;
  var isHover;

  var LocationParams = {
    minX: Math.floor(mapArea.offsetWidth - mapArea.offsetWidth),
    maxX: mapArea.offsetWidth,
    minY: 130,
    maxY: 630
  };

  var addMouseoverCallbacks = function () {
    mapArea.addEventListener('mouseover', function () {
      isHover = true;
    });

    mainPin.addEventListener('mouseout', function () {
      mapArea.addEventListener('mouseout', function () {
        isHover = false;
      });
    });
  };

  addMouseoverCallbacks();

  var onMainPinMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinMousemove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shift;

      shift = isHover ? {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      } : {
        x: 0,
        y: 0
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
        case currentPinPosition.x < LocationParams.minX - mainPinHalfWidth :
          currentPinPosition.x = LocationParams.minX - mainPinHalfWidth;
          break;
        case currentPinPosition.x > LocationParams.maxX - mainPinHalfWidth :
          currentPinPosition.x = LocationParams.maxX - mainPinHalfWidth;
          break;
        case currentPinPosition.y < LocationParams.minY - (mainPin.offsetHeight + window.form.mainTailHeight) :
          currentPinPosition.y = LocationParams.minY - (mainPin.offsetHeight + window.form.mainTailHeight);
          break;
        case currentPinPosition.y > LocationParams.maxY - (mainPin.offsetHeight + window.form.mainTailHeight) :
          currentPinPosition.y = LocationParams.maxY - (mainPin.offsetHeight + window.form.mainTailHeight);
          break;
      }

      mainPin.style.left = Math.round(currentPinPosition.x) + 'px';
      mainPin.style.top = Math.round(currentPinPosition.y) + 'px';

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
