'use strict';

(function () {
  var offersFiltersMap = {
    '0': 'type',
    '1': 'price',
    '2': 'rooms',
    '3': 'guests'
  };

  var filters = window.form.mapFilters;

  var getSelectsValues = function () {
    var filterSelects = filters.querySelectorAll('select');
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

  var getRank = function (currentOffer, selectedFilters) {
    var rank = 0;

    selectedFilters.forEach(function (currentSelect, index) {
      // debugger;
      var offerParam = currentOffer.offer[offersFiltersMap[index]];

      if (typeof offerParam === 'number') {
        currentSelect = Number(currentSelect);
      }

      if (offerParam === currentSelect) {
        rank++;
      }
    });

    return rank;
  };

  var getFilteredOffers = function (allOffers) {
    // debugger;
    var selectedValues = getSelectsValues();
    var passingScore = getPassingScore(selectedValues);
    var filteredOffers = [];

    switch (true) {
      case passingScore > 0 :
        allOffers.forEach(function (currentOffer) {
          if (getRank(currentOffer, selectedValues) === passingScore) {
            filteredOffers.push(currentOffer);
          }
        });
        break;
      default :
        filteredOffers = allOffers;
    }
  };

  window.filters = {
    getSelectsValues: getSelectsValues,
    getPassingScore: getPassingScore,
    getFilteredOffers: getFilteredOffers
  };
})();
