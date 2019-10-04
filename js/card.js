'use strict';

(function () {
  var mapPopupTemplate = document.querySelector('#card')
    .content.querySelector('.popup');


  /* module3-task3 */

  var makeFeatures = function (array, feature, features) {
    var nextFeature;

    features.textContent = '';

    for (var i = 0; i < array.length; i++) {
      nextFeature = feature.cloneNode();
      nextFeature.setAttribute('class', 'popup__feature popup__feature--' + array[i]);
      features.appendChild(nextFeature);
    }
  };

  var makePropFeatures = function (propPopup, prop) {
    var features = propPopup.querySelector('.popup__features');
    var feature = features.querySelector('.popup__feature');

    makeFeatures(prop.offer.features, feature, features);
  };

  var makePhotos = function (array, photo, photos) {
    var nextPhoto;

    photos.textContent = '';

    for (var i = 0; i < array.length; i++) {
      nextPhoto = photo.cloneNode();
      nextPhoto.setAttribute('src', array[i]);
      photos.appendChild(nextPhoto);
    }

    return photos;
  };

  var definePopup = function () {
    var popup = mapPopupTemplate.cloneNode(true);
    return popup;
  };

  var makeTitleAddressDesc = function (propPopup, prop) {
    var title = propPopup.querySelector('.popup__title');
    var address = propPopup.querySelector('.popup__text--address');
    var description = propPopup.querySelector('.popup__description');

    title.textContent = prop.offer.title;
    address.textContent = prop.offer.address;
    description.textContent = prop.offer.description;
  };

  var makePrice = function (propPopup, prop) {
    var price = propPopup.querySelector('.popup__text--price');
    var priceSymbol = price.innerHTML;

    price.textContent = prop.offer.price;
    priceSymbol = priceSymbol.substring(4);
    price.innerHTML = price.innerHTML + priceSymbol;
  };

  var makeType = function (propPopup, prop) {
    var type = propPopup.querySelector('.popup__type');
    var typeText;
    var typeString;

    typeString = prop.offer.type;
    typeText = window.data.offerParams.TYPES_DICTIONARY[typeString];
    type.textContent = typeText;
  };

  var makeGuestsOptions = function (propPopup, prop) {
    var guestsAndRooms = propPopup.querySelector('.popup__text--capacity');
    var checkinChekout = propPopup.querySelector('.popup__text--time');

    guestsAndRooms.textContent = prop.offer.rooms + ' комнаты для ' + prop.offer.guests + ' гостей';

    checkinChekout.textContent = 'Заезд после ' + prop.offer.checkin + ', выезд до ' + prop.offer.checkout;
  };

  var makePropImages = function (propPopup, prop) {
    var photos = propPopup.querySelector('.popup__photos');
    var photo = photos.querySelector('.popup__photo');
    var avatar = propPopup.querySelector('.popup__avatar');

    makePhotos(prop.offer.photos, photo, photos);
    avatar.setAttribute('src', prop.author.avatar);
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
    mapCard.remove();
    cardCloseBtn.removeEventListener('click', onCardCloseBtnClick);
    document.removeEventListener('keydown', onCardEscPress);
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
    renderFragmentPopup: renderFragmentPopup
  };
})();
