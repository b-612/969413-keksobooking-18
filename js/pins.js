'use strict';

(function () {
  var ADDRESSES_QUANTITI = 5;

  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');

  var makePins = function (allPins) {
    var pins = [];
    var pinWidth = 50;
    var pinHeight = 70;

    for (var i = 0; i < ADDRESSES_QUANTITI; i++) {
      var pin = pinTemplate.cloneNode(true);
      var pinImage = pin.querySelector('img');
      if (allPins[i]) {
        var pinLocationX = allPins[i].location.x - pinWidth / 2;
        var pinLocationY = allPins[i].location.y - pinHeight;

        pin.style.left = pinLocationX + 'px';
        pin.style.top = pinLocationY + 'px';
        pinImage.src = allPins[i].author.avatar;
        pinImage.alt = allPins[i].offer.title;

        pins.push(pin);
      } else {
        break;
      }
    }

    return pins;
  };

  var renderFragmentPins = function (allPins) {
    var pins = makePins(allPins);
    for (var j = 0; j < ADDRESSES_QUANTITI; j++) {
      if (pins[j]) {
        window.util.fragment.appendChild(pins[j]);
      } else {
        break;
      }
    }

    pinsList.appendChild(window.util.fragment);

    return pins;
  };

  var showMap = function () {
    map.classList.remove('map--faded');
  };

  var showPins = function (allPins) {
    showMap();
    var pins = renderFragmentPins(allPins);

    return pins;
  };

  var onPinClick = function (allPins, i) {
    return function () {
      window.card.renderFragmentPopup(window.card.makeMapPopup(allPins[i]));
    };
  };

  var onPinEnterPress = function (allPins, i) {
    return function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.card.renderFragmentPopup(window.card.makeMapPopup(allPins[i]));
      }
    };
  };

  var addPinsListeners = function (mapPins, allPinsProp) {
    for (var k = 0; k < mapPins.length; k++) {
      mapPins[k].addEventListener('click', onPinClick(allPinsProp, k));
      mapPins[k].addEventListener('keydown', onPinEnterPress(allPinsProp, k));
    }
  };

  window.pins = {
    map: map,

    showPins: showPins,
    addPinsListeners: addPinsListeners,
    renderFragmentPins: renderFragmentPins
  };
})();
