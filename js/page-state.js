'use strict';

(function () {
  var activatePage = function (allDownloadPins) {
    window.form.adForm.classList.remove('ad-form--disabled');
    var allPins = window.pins.showPins(allDownloadPins);
    window.form.toggleFormsFields(window.form.formsFields, true);
    window.form.setAddressInput(false);
    window.data.mainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.data.mainPin.removeEventListener('keydown', onMainPinEnterKeydown);

    return allPins;
  };

  var onMainPinMousedown = function (evt) {
    if (evt.which === window.util.MOUSE_LEFT_KEYCODE) {
      window.backend.loadUploadData(window.backend.urlForLoad, activatePage, window.backend.getError, window.backend.methodForLoad, window.backend.requestTimeout, window.backend.dataForLoad);
    }
  };

  var onMainPinEnterKeydown = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.backend.loadUploadData(window.backend.urlForLoad, activatePage, window.backend.getError, window.backend.methodForLoad, window.backend.requestTimeout, window.backend.dataForLoad);
    }
  };

  var setPageConditionCallback = function () {
    window.data.mainPin.addEventListener('mousedown', onMainPinMousedown);
    window.data.mainPin.addEventListener('keydown', onMainPinEnterKeydown);
  };

  setPageConditionCallback();

  window.pageState = {
    setPageConditionCallback: setPageConditionCallback
  };
})();
