'use strict';

(function () {
  var START_FILTERS_VALUE = 'any';

  var Prices = {
    LOW: 9999,
    HIGH: 50001
  };

  var OffersFiltersMap = {
    '0': 'type',
    '1': 'price',
    '2': 'rooms',
    '3': 'guests'
  };

  var filters = window.form.mapFilters;
  var filterSelects = Array.from(filters.querySelectorAll('select'));
  var filterCheckboxes = Array.from(filters.querySelectorAll('.map__checkbox'));

  var resetFilters = function () {
    filterSelects.forEach(function (currentSelect) {
      currentSelect.value = START_FILTERS_VALUE;
    });

    filterCheckboxes.forEach(function (currentCheck) {
      currentCheck.checked = false;
    });
  };

  var getSelectsValues = function () {
    var selectsValues = [];
    filterSelects.forEach(function (current) {
      selectsValues.push(current.value);
    });

    return selectsValues;
  };

  var getPassingScore = function (selectsValues) {
    var passingScore = 0;

    selectsValues.forEach(function (current) {
      if (current !== START_FILTERS_VALUE) {
        passingScore++;
      }
    });

    filterCheckboxes.forEach(function (currentCheck) {
      if (currentCheck.checked) {
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
    var checkedFeatures = Array.from(filters.querySelectorAll('.map__checkbox:checked'));

    selectedFilters.forEach(function (currentSelect, index) {
      var offerParam = currentOffer.offer[OffersFiltersMap[index]];

      if (typeof offerParam === 'number' && OffersFiltersMap[index] !== 'price') {
        currentSelect = Number(currentSelect);
      }

      if (offerParam === currentSelect) {
        rank++;
      }

      if (OffersFiltersMap[index] === 'price') {
        var priceLevel = getPriceLevel(currentOffer.offer.price);
        if (priceLevel === currentSelect) {
          rank++;
        }
      }
    });

    var getRankFromFeature = function (currentFeature) {
      currentOffer.offer.features.forEach(function (currentOfferFeature) {
        if (currentFeature.value === currentOfferFeature) {
          rank++;
        }
      });
    };

    if (checkedFeatures.length > 0 && currentOffer.offer.features.length > 0) {
      checkedFeatures.forEach(function (currentFeature) {
        getRankFromFeature(currentFeature);
      });
    }

    return rank;
  };

  var onFilterSelectChange = window.util.debounce(function () {
    var selectsValues = getSelectsValues();
    var passingScore = getPassingScore(selectsValues);
    var mapCard = document.querySelector('.map__card');
    var filteredOffers = [];

    switch (true) {
      case passingScore > 0 :
        window.backend.downloadPins.forEach(function (currentOffer) {
          if (getRank(currentOffer, selectsValues) === passingScore) {
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

    if (mapCard) {
      var cardCloseBtn = mapCard.querySelector('.popup__close');

      window.card.removeMapCard(mapCard, cardCloseBtn);
    }
  });

  var setSelectCallback = function () {
    filterSelects.forEach(function (currentSelect) {
      currentSelect.addEventListener('change', onFilterSelectChange);
    });

    filterCheckboxes.forEach(function (currentCheckbox) {
      currentCheckbox.addEventListener('change', onFilterSelectChange);
    });
  };

  setSelectCallback();

  window.filters = {
    onFilterSelectChange: onFilterSelectChange,
    resetFilters: resetFilters
  };
})();
