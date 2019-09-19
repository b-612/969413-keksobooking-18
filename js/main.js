'use strict';

var mapArea = document.querySelector('.map__pins');
var map = document.querySelector('.map');

var HOW_MUCH_ADDRESSES = 8;
var OfferParams = {
  TITLES: [
    'Двухэтажные апартаменты',
    'Домик в деревне',
    'Дешевый хостел',
    'Дорогая гостиница'
  ],

  ADDRESS_MIN_X: 100,
  ADDRESS_MAX_X: 800,
  ADDRESS_MIN_Y: 100,
  ADDRESS_MAX_Y: 500,

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

var locationParams = {
  MAX_X: mapArea.offsetWidth,
  MIN_Y: 130,
  MAX_Y: 630
};

var getRandomNumberInRange = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * (maxNumber + 1));
};

var getAvatarAddressesNumbers = function () {
  var addressesNumbers = [];
  for (var i = 0; i < HOW_MUCH_ADDRESSES; i++) {
    addressesNumbers.push(i + 1);
  }
  return addressesNumbers;
};

var numbersForAddresses = getAvatarAddressesNumbers();
var takeAddressCounter = numbersForAddresses.length;

var takeAddressNumber = function () {
  var number;
  while (number === undefined && takeAddressCounter > 0) {
    number = numbersForAddresses[getRandomNumber(numbersForAddresses.length)];
  }

  delete numbersForAddresses[number - 1];
  takeAddressCounter--;

  if (takeAddressCounter >= 0) {
    return '0' + number;
  } else {
    return undefined;
  }
};

var getProposalAuthor = function () {
  var ProposalAuthor = {
    'avatar': 'img/avatars/user/' + takeAddressNumber() + '.png'
  };
  return ProposalAuthor;
};

var getOfferAddress = function () {
  return getRandomNumberInRange(OfferParams.ADDRESS_MIN_X, OfferParams.ADDRESS_MAX_X) + ', ' + getRandomNumberInRange(OfferParams.ADDRESS_MIN_Y, OfferParams.ADDRESS_MAX_Y);
};

var getOfferRandomList = function (whatRandom, whatRandomMin, whatRandomMax) {
  var howMuchFeatures = getRandomNumberInRange(whatRandomMin, whatRandomMax);
  var featuresList = [];

  for (var i = 0; i < howMuchFeatures; i++) {
    featuresList.push(whatRandom[i]);
  }

  return featuresList;
};

var getOffer = function () {
  var offer = {
    'title':
      OfferParams.TITLES[getRandomNumber(OfferParams.TITLES.length - 1)],

    'address':
      getOfferAddress(),

    'price':
      getRandomNumberInRange(OfferParams.MIN_PRICE, OfferParams.MAX_PRICE),

    'type':
      OfferParams.TYPES[getRandomNumber(OfferParams.TYPES.length - 1)],

    'rooms':
      getRandomNumberInRange(OfferParams.MIN_ROOMS, OfferParams.MAX_ROOMS),

    'guests':
      getRandomNumberInRange(OfferParams.MIN_GUESTS, OfferParams.MAX_GUESTS),

    'checkin':
      OfferParams.CHECKINS[getRandomNumber(OfferParams.CHECKINS.length - 1)],

    'checkout':
      OfferParams.CHECKOUTS[getRandomNumber(OfferParams.CHECKOUTS.length - 1)],

    'features':
      getOfferRandomList(OfferParams.FEATURES, OfferParams.MIN_FEATURES, OfferParams.maxFeatures()),

    'description':
      OfferParams.DESCRIPTIONS[getRandomNumber(OfferParams.DESCRIPTIONS.length - 1)],

    'photos': getOfferRandomList(OfferParams.PHOTOS, OfferParams.MIN_PHOTOS, OfferParams.maxPhotos())
  };
  return offer;
};

var getLocation = function () {
  var location = {
    'x': getRandomNumber(locationParams.MAX_X),
    'y': getRandomNumberInRange(locationParams.MIN_Y, locationParams.MAX_Y)
  };
  return location;
};

var getBookingProp = function () {
  var bookingProp = {
    'author': getProposalAuthor(),
    'offer': getOffer(),
    'location': getLocation()
  };
  return bookingProp;
};

var getAllBookingProps = function () {
  var BookingProps = [];
  for (var i = 0; i < HOW_MUCH_ADDRESSES; i++) {
    BookingProps.push(getBookingProp());
  }
  return BookingProps;
};

var showMap = function () {
  map.classList.remove('map--faded');
};

showMap();
