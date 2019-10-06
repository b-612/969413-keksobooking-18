'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');

  var makePins = function () {
    var pins = [];
    var pinWidth = 50;
    var pinHeight = 70;

    for (var i = 0; i < window.data.addressesQuantiti; i++) {
      var pin = pinTemplate.cloneNode(true);
      var pinImage = pin.querySelector('img');
      var pinLocationX = window.data.allBookingProps[i].location.x - pinWidth / 2;
      var pinLocationY = window.data.allBookingProps[i].location.y - pinHeight;

      pin.setAttribute('style', 'left: ' + pinLocationX +
        'px; ' + 'top: ' + pinLocationY + 'px');
      pinImage.setAttribute('src', window.data.allBookingProps[i].author.avatar);
      pinImage.setAttribute('alt', window.data.allBookingProps[i].offer.title);

      pins.push(pin);
    }

    return pins;
  };

  var renderFragmentPins = function () {
    var pins = makePins();
    for (var i = 0; i < window.data.addressesQuantiti; i++) {
      window.util.fragment.appendChild(pins[i]);
    }

    pinsList.appendChild(window.util.fragment);

    return pins;
  };

  var showMap = function () {
    map.classList.remove('map--faded');
  };

  var showPins = function () {
    var pins = renderFragmentPins();
    showMap();

    return pins;
  };

  var onPinClick = function (i) {
    return function () {
      window.card.renderFragmentPopup(window.card.makeMapPopup(window.data.allBookingProps[i]));
    };
  };

  var onPinEnterPress = function (i) {
    return function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.card.renderFragmentPopup(window.card.makeMapPopup(window.data.allBookingProps[i]));
      }
    };
  };

  var addPinsListeners = function (mapPins) {
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', onPinClick(i));
      mapPins[i].addEventListener('keydown', onPinEnterPress(i));
    }
  };

  window.pins = {
    map: map,

    showPins: showPins,
    addPinsListeners: addPinsListeners
  };
})();
