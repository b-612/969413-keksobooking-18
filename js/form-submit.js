'use strict';

(function () {
  var MAIN_PIN_START_COORDS = 'left: 570px; top: 375px;';

  var form = window.form.adForm;
  var successTemplate = document.querySelector('#success');

  var cleanFields = function () {
    var textNumberFields = form.querySelectorAll('input[type=text], input[type=number], #description');

    for (var i = 0; i < textNumberFields.length; i++) {
      textNumberFields[i].value = '';
    }
  };

  var cleanDisableFields = function () {
    cleanFields();
    window.form.toggleFormsFields(window.form.formsFields, false);
  };

  var removePins = function () {
    var pins = window.pins.map.querySelectorAll('.map__pin');

    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  var showSuccess = function () {
    var successTemplateCopy = successTemplate.cloneNode(true);
    var successBlock = successTemplateCopy.content.querySelector('.success');

    window.backend.main.insertAdjacentElement('afterbegin', successBlock);
    successBlock.addEventListener('click', window.backend.onMassageCloseMousedown(successBlock));
    successBlock.addEventListener('keydown', window.backend.onMessageEscPress(successBlock));
    successBlock.tabIndex = 1;
    successBlock.focus();
  };

  var onButtonSubmit = function () {
    removePins();
    cleanDisableFields();
    window.pins.map.classList.add('map--faded');
    window.data.mainPin.setAttribute('style', MAIN_PIN_START_COORDS);
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.setAddressInput(true);
    window.pageState.setPageConditionCallback();
    showSuccess();
  };

  var setFormCallback = function () {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.loadUploadData(window.backend.urlForUpload, onButtonSubmit, window.backend.getError, window.backend.methodForUpload, window.backend.requestTimeout, new FormData(form));
    });
  };

  setFormCallback();

  window.formSubmit = {
    removePins: removePins
  };
})();
