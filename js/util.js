'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var utilOptions = {
    MOUSE_LEFT_KEYCODE: 1,
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,

    fragment: document.createDocumentFragment(),

    getRandomInRange: function (minNumber, maxNumber) {
      return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    },

    getRandomNumber: function (maxNumber) {
      return Math.floor(Math.random() * (maxNumber + 1));
    },

    shuffleArray: function (array) {
      var temp;
      var j;

      for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    },

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };

  window.util = utilOptions;
})();
