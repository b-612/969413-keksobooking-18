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

  TYPES_DICTIONARY: {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  },

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
  typeText = OfferParams.TYPES_DICTIONARY[typeString];
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

var propIndex = 0;
var currentProp = allBookingProps[propIndex];

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

var renderFragmentPopup = function (readyPropPopup) {
  var mapFilters = map.querySelector('.map__filters-container');

  fragment.appendChild(readyPropPopup);
  map.insertBefore(fragment, mapFilters);
};

renderFragmentPopup(makeMapPopup(currentProp));

