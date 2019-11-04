'use strict';

(function () {
  var ADDRESSES_QUANTITI = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');

  var makePins = function (allPins) {
    var pins = [];

    for (var i = 0; i < ADDRESSES_QUANTITI; i++) {
      var pin = pinTemplate.cloneNode(true);
      var pinImage = pin.querySelector('img');

      if (allPins[i]) {
        if (allPins[i].offer) {
          var pinLocationX = allPins[i].location.x - PIN_WIDTH / 2;
          var pinLocationY = allPins[i].location.y - PIN_HEIGHT;

          pin.style.left = pinLocationX + 'px';
          pin.style.top = pinLocationY + 'px';
          pinImage.src = allPins[i].author.avatar;
          pinImage.alt = allPins[i].offer.title;

          pins.push(pin);
        } else {
          continue;
        }
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

  var setActivePin = function (pin) {
    if (pin.type === 'button') {
      pin.classList.add('map__pin--active');
    }
  };

  var onPinClick = function (allPins, i) {
    return function (evt) {
      setActivePin(evt.currentTarget);
      window.card.renderFragmentPopup(window.card.makeMapPopup(allPins[i]));
    };
  };

  var onPinEnterPress = function (allPins, i) {
    return function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        setActivePin(evt.currentTarget);
        window.card.renderFragmentPopup(window.card.makeMapPopup(allPins[i]));
      }
    };
  };

  var addPinsListeners = function (mapPins, allPinsProp) {
    mapPins.forEach(function (current, i) {
      current.addEventListener('click', onPinClick(allPinsProp, i));
      current.addEventListener('keydown', onPinEnterPress(allPinsProp, i));
    });
  };

  window.pins = {
    map: map,
    pinsList: pinsList,

    showPins: showPins,
    addPinsListeners: addPinsListeners,
    renderFragmentPins: renderFragmentPins
  };
})();
