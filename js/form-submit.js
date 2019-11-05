'use strict';

(function () {
  var MAIN_PIN_START_COORDS = 'left: 570px; top: 375px;';

  var form = window.form.adProfile;
  var successTemplate = document.querySelector('#success');
  var resetBtn = form.querySelector('.ad-form__reset');

  var cleanFields = function () {
    var textNumberFields = Array.from(form.querySelectorAll('input[type=text], input[type=number], #description'));

    textNumberFields.forEach(function (current) {
      current.value = '';
    });
  };

  var cleanDisableFields = function () {
    cleanFields();
    window.form.toggleProfilesFields(window.form.profilesFields, false);
  };

  var removePins = function () {
    var pins = Array.from(window.pins.map.querySelectorAll('.map__pin'));

    pins.forEach(function (current) {
      if (current !== window.form.mainPin) {
        current.remove();
      }
    });
  };

  var showSuccess = function () {
    var successTemplateCopy = successTemplate.cloneNode(true);
    var successBlock = successTemplateCopy.content.querySelector('.success');

    window.backend.main.insertAdjacentElement('afterbegin', successBlock);
    successBlock.addEventListener('click', window.backend.onMessageCloseMousedown(successBlock));
    successBlock.addEventListener('keydown', window.backend.onMessageEscPress(successBlock));
    successBlock.tabIndex = 1;
    successBlock.focus();
  };

  var onFormReset = function () {
    removePins();
    cleanDisableFields();
    window.form.resetFields();
    window.filters.resetConditions();
    window.pins.map.classList.add('map--faded');
    window.form.mainPin.style = MAIN_PIN_START_COORDS;
    window.form.adProfile.classList.add('ad-form--disabled');
    window.uploadImages.resetPictures();
    window.form.setAddressInput(true);
    window.pageState.setConditionCallback();
  };

  var onFormSubmit = function () {
    onFormReset();
    showSuccess();
  };

  var setFormCallback = function () {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.loadUploadData(window.backend.urlForUpload, onFormSubmit, window.backend.getError, window.backend.methodForUpload, window.backend.requestTimeout, new FormData(form));
    });

    resetBtn.addEventListener('click', onFormReset);
  };

  setFormCallback();

  window.formSubmit = {
    removePins: removePins
  };
})();
