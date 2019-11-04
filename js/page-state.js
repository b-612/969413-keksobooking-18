'use strict';

(function () {
  var activatePage = function (allDownloadPins) {
    window.form.adProfile.classList.remove('ad-form--disabled');
    var allPins = window.pins.showMarkers(allDownloadPins);
    window.form.toggleProfilesFields(window.form.profilesFields, true);
    window.form.setAddressInput(false);
    window.form.mainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.form.mainPin.removeEventListener('keydown', onMainPinEnterKeydown);

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
    window.form.mainPin.addEventListener('mousedown', onMainPinMousedown);
    window.form.mainPin.addEventListener('keydown', onMainPinEnterKeydown);
  };

  setPageConditionCallback();

  window.pageState = {
    setConditionCallback: setPageConditionCallback
  };
})();
