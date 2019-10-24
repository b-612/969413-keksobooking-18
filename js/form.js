'use strict';

(function () {
  var MAIN_TAIL_HEIGHT = 16;

  var HousingTypesPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adForm = document.querySelector('.ad-form');
  var housingType = adForm.querySelector('#type');
  var housingPrice = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var mapFilters = document.querySelector('.map__filters');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapasity = adForm.querySelector('#capacity');

  var formsFields = [
    adForm.querySelectorAll('fieldset'),
    mapFilters.querySelectorAll('input'),
    mapFilters.querySelectorAll('select')
  ];

  var CAPACITY_ERRORS = [
    'Одна комната для одного гостя',
    'Две комнаты для одного, или двоих гостей',
    'Три комнаты для одного, двоих, или троих гостей',
    'Не для гостей'
  ];

  var toggleFields = function (fields, isDisabled) {
    for (var i = 0; i < fields.length; i++) {
      if (!isDisabled) {
        fields[i].setAttribute('disabled', 'disabled');
      } else {
        fields[i].removeAttribute('disabled');
      }
    }
  };

  var toggleFormsFields = function (fieldsArray, isDisabled) {
    for (var i = 0; i < fieldsArray.length; i++) {
      toggleFields(fieldsArray[i], isDisabled);
    }
  };

  var setAddressInput = function (isDisabled) {
    var addressInput = adForm.querySelector('#address');
    var mainPinLocations = window.data.mainPin.getAttribute('style').match(/-?\d+/g);
    var mainPinX = Number(mainPinLocations[0]);
    var mainPinY = Number(mainPinLocations[1]);

    if (isDisabled) {
      mainPinY = mainPinY + Math.round(window.data.mainPin.offsetHeight / 2);
    } else {
      mainPinY = mainPinY + Math.round(window.data.mainPin.offsetHeight) + MAIN_TAIL_HEIGHT;
    }

    addressInput.value = (mainPinX + Math.floor(window.data.mainPin.offsetWidth / 2)) +
      ', ' + mainPinY;
  };

  var onHousingTypeChange = function () {
    housingPrice.setAttribute('min', HousingTypesPrices[housingType.value]);
    housingPrice.setAttribute('placeholder', HousingTypesPrices[housingType.value]);
  };

  var onRoomsCapacityChange = function () {
    switch (true) {
      case Number(selectRooms.value) < Number(selectCapasity.value) :
        selectCapasity.setCustomValidity(CAPACITY_ERRORS[selectRooms.value - 1]);
        break;
      case Number(selectRooms.value) !== 100 && Number(selectCapasity.value) === 0 :
        selectCapasity.setCustomValidity(CAPACITY_ERRORS[selectRooms.value - 1]);
        break;
      case Number(selectRooms.value) === 100 && Number(selectCapasity.value) !== 0 :
        selectCapasity.setCustomValidity(CAPACITY_ERRORS[CAPACITY_ERRORS.length - 1]);
        break;
      default:
        selectCapasity.setCustomValidity('');
    }
  };

  var setValidityCallback = function () {
    housingType.addEventListener('change', onHousingTypeChange);

    timeIn.addEventListener('change', function () {
      timeOut.value = timeIn.value;
    });

    timeOut.addEventListener('change', function () {
      timeIn.value = timeOut.value;
    });

    onRoomsCapacityChange();
    selectRooms.addEventListener('change', onRoomsCapacityChange);
    selectCapasity.addEventListener('change', onRoomsCapacityChange);
  };

  toggleFormsFields(formsFields, false);
  setAddressInput(true);
  setValidityCallback();

  window.form = {
    mapFilters: mapFilters,
    adForm: adForm,
    formsFields: formsFields,
    mainTailHeight: MAIN_TAIL_HEIGHT,

    toggleFormsFields: toggleFormsFields,
    setAddressInput: setAddressInput
  };
})();
