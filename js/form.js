'use strict';

(function () {
  var MAIN_TAIL_HEIGHT = 16;

  var CAPACITY_ERRORS = [
    'Одна комната для одного гостя',
    'Две комнаты для одного, или двоих гостей',
    'Три комнаты для одного, двоих, или троих гостей',
    'Не для гостей'
  ];

  var HousingTypesPricesMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var startFieldsValuesMap = {
    'type': 'flat',
    'price': 1000,
    'timein': '12:00',
    'timeout': '12:00',
    'room_number': 1,
    'capacity': 3
  };

  var mainPin = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var housingType = adForm.querySelector('#type');
  var housingPrice = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var mapFilters = document.querySelector('.map__filters');
  var selectRooms = adForm.querySelector('#room_number');
  var selectCapasity = adForm.querySelector('#capacity');
  var adFormFeatures = adForm.querySelectorAll('input[name=features]');

  var dischargedFields = [
    housingType,
    housingPrice,
    timeIn,
    timeOut,
    selectRooms,
    selectCapasity
  ];

  var formsFields = [
    adForm.querySelectorAll('fieldset'),
    mapFilters.querySelectorAll('input'),
    mapFilters.querySelectorAll('select')
  ];

  var toggleFields = function (fields, isDisabled) {
    for (var i = 0; i < fields.length; i++) {
      if (!isDisabled) {
        fields[i].disabled = true;
      } else {
        fields[i].disabled = false;
      }
    }
  };

  var toggleFormsFields = function (fieldsArray, isDisabled) {
    for (var j = 0; j < fieldsArray.length; j++) {
      toggleFields(fieldsArray[j], isDisabled);
    }
  };

  var setAddressInput = function (isDisabled) {
    var addressInput = adForm.querySelector('#address');
    var mainPinX = parseInt(mainPin.style.left, 10);
    var mainPinY = parseInt(mainPin.style.top, 10);

    if (isDisabled) {
      mainPinY = mainPinY + Math.round(mainPin.offsetHeight / 2);
    } else {
      mainPinY = mainPinY + Math.round(mainPin.offsetHeight) + MAIN_TAIL_HEIGHT;
    }

    addressInput.value = (mainPinX + Math.floor(mainPin.offsetWidth / 2)) +
      ', ' + mainPinY;
  };

  var onHousingTypeChange = function () {
    housingPrice.min = HousingTypesPricesMap[housingType.value];
    housingPrice.placeholder = HousingTypesPricesMap[housingType.value];
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

  var resetFields = function () {
    dischargedFields.forEach(function (currentField) {
      if (currentField.id === 'price') {
        currentField.placeholder = startFieldsValuesMap[currentField.id];
      } else {
        currentField.value = startFieldsValuesMap[currentField.id];
      }
    });

    adFormFeatures.forEach(function (currentFeature) {
      currentFeature.checked = false;
    });
  };

  toggleFormsFields(formsFields, false);
  setAddressInput(true);
  setValidityCallback();

  window.form = {
    mainPin: mainPin,
    mapFilters: mapFilters,
    adForm: adForm,
    formsFields: formsFields,
    mainTailHeight: MAIN_TAIL_HEIGHT,

    toggleFormsFields: toggleFormsFields,
    setAddressInput: setAddressInput,
    resetFields: resetFields
  };
})();
