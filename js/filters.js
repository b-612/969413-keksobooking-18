'use strict';

(function () {
  var Prices = {
    LOW: 9999,
    HIGH: 50001
  };

  var offersFiltersMap = {
    '0': 'type',
    '1': 'price',
    '2': 'rooms',
    '3': 'guests'
  };

  var filters = window.form.mapFilters;
  var filterSelects = filters.querySelectorAll('select');

  var getSelectsValues = function () {
    var selectedValues = [];
    filterSelects.forEach(function (current) {
      selectedValues.push(current.value);
    });

    return selectedValues;
  };

  var getPassingScore = function (selectedValues) {
    var passingScore = 0;

    selectedValues.forEach(function (current) {
      if (current !== 'any') {
        passingScore++;
      }
    });

    return passingScore;
  };

  var getPriceLevel = function (currentPrice) {
    var priceLevel;

    switch (true) {
      case currentPrice <= Prices.LOW :
        priceLevel = 'low';
        break;
      case currentPrice >= Prices.HIGH :
        priceLevel = 'high';
        break;
      default :
        priceLevel = 'middle';
    }

    return priceLevel;
  };

  var getRank = function (currentOffer, selectedFilters) {
    var rank = 0;
    selectedFilters.forEach(function (currentSelect, index) {
      var offerParam = currentOffer.offer[offersFiltersMap[index]];

      if (typeof offerParam === 'number' && offersFiltersMap[index] !== 'price') {
        currentSelect = Number(currentSelect);
      }

      if (offerParam === currentSelect) {
        rank++;
      }

      if (offersFiltersMap[index] === 'price') {
        var priceLevel = getPriceLevel(currentOffer.offer.price);
        if (priceLevel === currentSelect) {
          rank++;
        }
      }
    });

    return rank;
  };

  var onFilterSelectChange = function () {
    var selectedValues = getSelectsValues();
    var passingScore = getPassingScore(selectedValues);
    var filteredOffers = [];

    switch (true) {
      case passingScore > 0 :
        window.backend.downloadPins.forEach(function (currentOffer) {
          if (getRank(currentOffer, selectedValues) === passingScore) {
            filteredOffers.push(currentOffer);
          }
        });
        break;
      default :
        filteredOffers = window.backend.downloadPins;
    }

    window.formSubmit.removePins();
    var pins = window.pins.renderFragmentPins(filteredOffers);
    window.pins.addPinsListeners(pins, filteredOffers);
  };

  var setSelectCallback = function () {
    filterSelects.forEach(function (currentSelect) {
      currentSelect.addEventListener('change', onFilterSelectChange);
    });
  };

  setSelectCallback();

  window.filters = {
    onFilterSelectChange: onFilterSelectChange
  };
})();
