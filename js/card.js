'use strict';

(function () {
  var typesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var hideEmptyField = function (field) {
    field.style.display = 'none';
  };

  var mapPopupTemplate = document.querySelector('#card')
    .content.querySelector('.popup');

  var makeFeatures = function (array, feature, features) {
    if (array.length > 0) {
      var nextFeature;

      features.textContent = '';

      for (var i = 0; i < array.length; i++) {
        nextFeature = feature.cloneNode();
        nextFeature.className = 'popup__feature popup__feature--' + array[i];
        features.appendChild(nextFeature);
      }
    } else {
      hideEmptyField(features);
    }
  };

  var makePropFeatures = function (propPopup, prop) {
    var features = propPopup.querySelector('.popup__features');
    var feature = features.querySelector('.popup__feature');

    makeFeatures(prop.offer.features, feature, features);
  };

  var makePhotos = function (array, photo, photos) {
    if (array.length > 0) {
      var nextPhoto;

      photos.textContent = '';

      for (var j = 0; j < array.length; j++) {
        nextPhoto = photo.cloneNode();
        nextPhoto.src = array[j];
        photos.appendChild(nextPhoto);
      }
    } else {
      hideEmptyField(photos);
    }
  };

  var definePopup = function () {
    var popup = mapPopupTemplate.cloneNode(true);
    return popup;
  };

  var testTextContent = function (element, offerParam) {
    if (offerParam === '') {
      hideEmptyField(element);
    } else {
      element.textContent = offerParam;
    }
  };

  var makeTitleAddressDesc = function (propPopup, prop) {
    var title = propPopup.querySelector('.popup__title');
    var address = propPopup.querySelector('.popup__text--address');
    var description = propPopup.querySelector('.popup__description');

    testTextContent(title, prop.offer.title);
    testTextContent(address, prop.offer.address);
    testTextContent(description, prop.offer.description);
  };

  var makePrice = function (propPopup, prop) {
    var price = propPopup.querySelector('.popup__text--price');
    var priceSymbol = price.innerHTML;

    if (isNaN(prop.offer.price)) {
      hideEmptyField(price);
    } else {
      price.textContent = prop.offer.price;
      priceSymbol = priceSymbol.substring(4);
      price.innerHTML = price.innerHTML + priceSymbol;
    }
  };

  var makeType = function (propPopup, prop) {
    var type = propPopup.querySelector('.popup__type');
    var typeText;
    var typeString;

    if (prop.offer.type !== '') {
      typeString = prop.offer.type;
      typeText = typesMap[typeString];
      type.textContent = typeText;
    } else {
      hideEmptyField(type);
    }
  };

  var makeGuestsOptions = function (propPopup, prop) {
    var guestsAndRooms = propPopup.querySelector('.popup__text--capacity');
    var checkinChekout = propPopup.querySelector('.popup__text--time');

    if (isNaN(prop.offer.rooms) || isNaN(prop.offer.guests)) {
      hideEmptyField(guestsAndRooms);
    } else {
      guestsAndRooms.textContent = prop.offer.rooms + ' комнаты для ' + prop.offer.guests + ' гостей';
    }

    if (prop.offer.checkin !== '' && prop.offer.checkout !== '') {
      checkinChekout.textContent = 'Заезд после ' + prop.offer.checkin + ', выезд до ' + prop.offer.checkout;
    } else {
      hideEmptyField(checkinChekout);
    }
  };

  var makePropImages = function (propPopup, prop) {
    var photos = propPopup.querySelector('.popup__photos');
    var photo = photos.querySelector('.popup__photo');
    var avatar = propPopup.querySelector('.popup__avatar');

    makePhotos(prop.offer.photos, photo, photos);
    avatar.src = prop.author.avatar;
  };

  var makeMapPopup = function (prop) {
    var popup = definePopup();

    makeTitleAddressDesc(popup, prop);
    makePrice(popup, prop);
    makeType(popup, prop);
    makeGuestsOptions(popup, prop);
    makePropFeatures(popup, prop);
    makePropImages(popup, prop);

    return popup;
  };

  var removeMapCard = function (mapCard, cardCloseBtn) {
    var pins = window.pins.pinsList.querySelectorAll('.map__pin');

    mapCard.remove();
    cardCloseBtn.removeEventListener('click', onCardCloseBtnClick);
    document.removeEventListener('keydown', onCardEscPress);
    pins.forEach(function (currentPin) {
      currentPin.classList.remove('map__pin--active');
    });
  };

  var onCardCloseBtnClick = function (mapCard, cardCloseBtn) {
    return function () {
      removeMapCard(mapCard, cardCloseBtn);
    };
  };

  var onCardEscPress = function (mapCard, cardCloseBtn) {
    return function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        removeMapCard(mapCard, cardCloseBtn);
      }
    };
  };

  var addCloseBtnCallback = function () {
    var mapCard = document.querySelector('.map__card');
    var cardCloseBtn = mapCard.querySelector('.popup__close');

    cardCloseBtn.addEventListener('click', onCardCloseBtnClick(mapCard, cardCloseBtn));
    document.addEventListener('keydown', onCardEscPress(mapCard, cardCloseBtn));
  };

  var renderFragmentPopup = function (readyPropPopup) {
    var mapFilters = window.pins.map.querySelector('.map__filters-container');
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
    }

    window.util.fragment.appendChild(readyPropPopup);
    window.pins.map.insertBefore(window.util.fragment, mapFilters);

    addCloseBtnCallback();
  };

  window.card = {
    makeMapPopup: makeMapPopup,
    renderFragmentPopup: renderFragmentPopup,
    removeMapCard: removeMapCard
  };
})();
