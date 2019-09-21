'use strict';

var ADDRESSES_QUANTITI = 8;

var mapArea = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var pinsList = document.querySelector('.map__pins');
var largestPin = document.querySelector('.map__pin--main');

var mapPopupTemplate = document.querySelector('#card')
  .content.querySelector('.popup');

var OfferParams = {
  TITLES: [
    'Двухэтажные апартаменты',
    'Домик в деревне',
    'Дешевый хостел',
    'Дорогая гостиница'
  ],

  MIN_PRICE: 5000,
  MAX_PRICE: 100000,

  TYPES: [
    'palace',
    'flat',
    'house',
    'bungalo'
  ],

  MIN_ROOMS: 1,
  MAX_ROOMS: 5,

  MIN_GUESTS: 1,
  MAX_GUESTS: 40,

  CHECKINS: [
    '12:00',
    '13:00',
    '14:00'
  ],

  CHECKOUTS: [
    '12:00',
    '13:00',
    '14:00'
  ],

  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],

  MIN_FEATURES: 1,
  maxFeatures: function () {
    return this.FEATURES.length;
  },

  DESCRIPTIONS: [
    'Нынче никто не может себе позволить инициировать звон колоколов',
    'Никто не вправе осуждать глас грядущего поколения',
    'Нашу победу сопровождал звон колоколов',
    'Неподкупность государственных СМИ процветает, как ни в чем не бывало',
    'Как бы то ни было, убеждённость некоторых оппонентов одухотворила всех причастных'
  ],

  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],

  MIN_PHOTOS: 1,
  maxPhotos: function () {
    return this.PHOTOS.length;
  },
};

var LocationParams = {
  MIN_X: Math.floor(mapArea.offsetWidth - mapArea.offsetWidth + largestPin.offsetWidth / 2),
  MAX_X: mapArea.offsetWidth - largestPin.offsetWidth / 2,
  MIN_Y: 130,
  MAX_Y: 630,
};

var getRandomInRange = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * (maxNumber + 1));
};

var shuffleArray = function (array) {
  var temp;
  var j;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

var getAvatarNumbers = function () {
  var numbers = [];

  for (var i = 0; i < ADDRESSES_QUANTITI; i++) {
    numbers.push(i + 1);
  }

  numbers = shuffleArray(numbers);

  return numbers;
};

var addressesNumbers = getAvatarNumbers();
var authorsCounter = 0;

var getProposalAuthor = function () {
  var proposalAuthor = {
    'avatar': 'img/avatars/user0' + addressesNumbers[authorsCounter] + '.png'
  };

  authorsCounter++;

  return proposalAuthor;
};

var getRandomList = function (whatRandom, whatRandomMin, whatRandomMax) {
  var howMuchFeatures = getRandomInRange(whatRandomMin, whatRandomMax);
  var featuresList = [];

  for (var i = 0; i < howMuchFeatures; i++) {
    featuresList.push(whatRandom[i]);
  }

  return featuresList;
};

var getLocation = function () {
  var location = {
    'x': getRandomInRange(LocationParams.MIN_X, LocationParams.MAX_X),
    'y': getRandomInRange(LocationParams.MIN_Y, LocationParams.MAX_Y),
    'address': function () {
      return this.x + ', ' + this.y;
    }
  };

  return location;
};

var locations = getLocation();

var getOffer = function () {
  var offer = {
    'title':
      OfferParams.TITLES[getRandomNumber(OfferParams.TITLES.length - 1)],

    'address':
      locations.address(),

    'price':
      getRandomInRange(OfferParams.MIN_PRICE, OfferParams.MAX_PRICE),

    'type':
      OfferParams.TYPES[getRandomNumber(OfferParams.TYPES.length - 1)],

    'rooms':
      getRandomInRange(OfferParams.MIN_ROOMS, OfferParams.MAX_ROOMS),

    'guests':
      getRandomInRange(OfferParams.MIN_GUESTS, OfferParams.MAX_GUESTS),

    'checkin':
      OfferParams.CHECKINS[getRandomNumber(OfferParams.CHECKINS.length - 1)],

    'checkout':
      OfferParams.CHECKOUTS[getRandomNumber(OfferParams.CHECKOUTS.length - 1)],

    'features':
      getRandomList(OfferParams.FEATURES, OfferParams.MIN_FEATURES, OfferParams.maxFeatures()),

    'description':
      OfferParams.DESCRIPTIONS[getRandomNumber(OfferParams.DESCRIPTIONS.length - 1)],

    'photos': getRandomList(OfferParams.PHOTOS, OfferParams.MIN_PHOTOS, OfferParams.maxPhotos())
  };

  return offer;
};

var getBookingProp = function () {
  var bookingProp = {
    'author': getProposalAuthor(),
    'offer': getOffer(),
    'location': locations
  };

  return bookingProp;
};

var getAllProps = function () {
  var bookingProps = [];

  for (var i = 0; i < ADDRESSES_QUANTITI; i++) {
    if (i > 0) {
      locations = getLocation();
    }
    bookingProps.push(getBookingProp());
  }

  return bookingProps;
};


var allBookingProps = getAllProps();

var makePins = function () {
  var pins = [];

  for (var i = 0; i < ADDRESSES_QUANTITI; i++) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    var pinLocationX = allBookingProps[i].location.x - +pinImage.getAttribute('width') / 2;
    var pinLocationY = allBookingProps[i].location.y - +pinImage.getAttribute('height');

    pin.setAttribute('style', 'left: ' + pinLocationX +
      'px; ' + 'top: ' + pinLocationY + 'px');
    pinImage.setAttribute('src', allBookingProps[i].author.avatar);
    pinImage.setAttribute('alt', allBookingProps[i].offer.title);

    pins.push(pin);
  }

  return pins;
};

var renderFragmentPins = function () {
  var pins = makePins();
  for (var i = 0; i < ADDRESSES_QUANTITI; i++) {
    fragment.appendChild(pins[i]);
  }

  pinsList.appendChild(fragment);
};

var showMap = function () {
  map.classList.remove('map--faded');
};

var showPins = function () {
  renderFragmentPins();
  showMap();
};

showPins();

/* module3-task3 */

var makeFeatures = function (array, feature, features) {
  var oldAttributes = feature.getAttribute('class');
  var attributes;
  var nextFeature;

  oldAttributes = oldAttributes.split(' ', 1);
  features.textContent = '';

  for (var i = 0; i < array.length; i++) {
    nextFeature = feature.cloneNode();
    attributes = oldAttributes + ' ' + oldAttributes + '--' + array[i];
    nextFeature.setAttribute('class', attributes);
    features.appendChild(nextFeature);
  }

  return features;
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

var makeMapPopup = function () {
  var propIndex = 0;

  var popup = mapPopupTemplate.cloneNode(true);
  var title = popup.querySelector('.popup__title');
  var address = popup.querySelector('.popup__text--address');
  var price = popup.querySelector('.popup__text--price');
  var priceSymbol = price.innerHTML;
  var type = popup.querySelector('.popup__type');

  var typeText = type.textContent;
  var typeString;

  var guestsAndRooms = popup.querySelector('.popup__text--capacity');
  var checkinChekout = popup.querySelector('.popup__text--time');

  var features = popup.querySelector('.popup__features');
  var feature = features.querySelector('.popup__feature');

  var description = popup.querySelector('.popup__description');
  var photos = popup.querySelector('.popup__photos');
  var photo = photos.querySelector('.popup__photo');
  var avatar = popup.querySelector('.popup__avatar');

  title.textContent = allBookingProps[propIndex].offer.title;
  address.textContent = allBookingProps[propIndex].offer.address;
  price.textContent = allBookingProps[propIndex].offer.price;
  priceSymbol = priceSymbol.substring(4);
  price.insertAdjacentHTML('beforeend', priceSymbol);
  typeString = allBookingProps[propIndex].offer.type;

  if (typeString === 'flat') {
    typeText = 'Квартира';
  } else if (typeString === 'bungalo') {
    typeText = 'Бунгало';
  } else if (typeString === 'house') {
    typeText = 'Дом';
  } else if (typeString === 'palace') {
    typeText = 'Дворец';
  }

  type.textContent = typeText;
  guestsAndRooms.textContent = allBookingProps[propIndex].offer.rooms + ' комнаты для ' + allBookingProps[propIndex].offer.guests + ' гостей';

  checkinChekout.textContent = 'Заезд после ' + allBookingProps[propIndex].offer.checkin + ', выезд до ' + allBookingProps[propIndex].offer.checkout;

  features = makeFeatures(allBookingProps[propIndex].offer.features, feature, features);

  description.textContent = allBookingProps[propIndex].offer.description;
  photos = makePhotos(allBookingProps[propIndex].offer.photos, photo, photos);
  avatar.setAttribute('src', allBookingProps[propIndex].author.avatar);

  return popup;
};

var renderFragmentPopup = function () {
  var popups = makeMapPopup();
  var mapFilters = map.querySelector('.map__filters-container');

  fragment.appendChild(popups);
  map.insertBefore(fragment, mapFilters);
};

renderFragmentPopup();

