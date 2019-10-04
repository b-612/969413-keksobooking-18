'use strict';

(function () {
  var activatePage = function () {
    window.form.adForm.classList.remove('ad-form--disabled');
    var allPins = window.pins.showPins();
    window.form.toggleFormsFields(window.form.formsFields, true);
    window.form.setAddressInput(false);

    return allPins;
  };

  var setPageConditionCallback = function () {
    window.data.mainPin.addEventListener('mousedown', function (evt) {
      if (evt.which === window.util.MOUSE_LEFT_KEYCODE) {
        window.pins.addPinsListeners(activatePage());
      }
    });

    window.data.mainPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.pins.addPinsListeners(activatePage());
      }
    });
  };

  setPageConditionCallback();
})();
