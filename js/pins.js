'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');

  var makePins = function (allPins) {
    var pins = [];
    var pinWidth = 50;
    var pinHeight = 70;

    for (var i = 0; i < window.data.addressesQuantiti; i++) {
      var pin = pinTemplate.cloneNode(true);
      var pinImage = pin.querySelector('img');
      if (allPins[i]) {
        var pinLocationX = allPins[i].location.x - pinWidth / 2;
        var pinLocationY = allPins[i].location.y - pinHeight;

        pin.setAttribute('style', 'left: ' + pinLocationX +
          'px; ' + 'top: ' + pinLocationY + 'px');
        pinImage.setAttribute('src', allPins[i].author.avatar);
        pinImage.setAttribute('alt', allPins[i].offer.title);

        pins.push(pin);
      } else {
        break;
      }
    }

    return pins;
  };

  var renderFragmentPins = function (allPins) {
    var pins = makePins(allPins);
    for (var i = 0; i < window.data.addressesQuantiti; i++) {
      if (pins[i]) {
        window.util.fragment.appendChild(pins[i]);
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
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', onPinClick(allPinsProp, i));
      mapPins[i].addEventListener('keydown', onPinEnterPress(allPinsProp, i));
    }
  };

  window.pins = {
    map: map,

    showPins: showPins,
    addPinsListeners: addPinsListeners,
    renderFragmentPins: renderFragmentPins
  };
})();
