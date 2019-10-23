'use strict';

(function () {
  var ADDRESSES_QUANTITI = 5;

  var mapArea = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var OfferParam = {
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

  var LocationParam = {
    MIN_X: Math.floor(mapArea.offsetWidth - mapArea.offsetWidth),
    MAX_X: mapArea.offsetWidth,
    MIN_Y: 130,
    MAX_Y: 630,
  };

  var getAvatarNumbers = function () {
    var numbers = [];

    for (var i = 0; i < ADDRESSES_QUANTITI; i++) {
      numbers.push(i + 1);
    }

    numbers = window.util.shuffleArray(numbers);

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
    var howMuchFeatures = window.util.getRandomInRange(whatRandomMin, whatRandomMax);
    var featuresList = [];

    for (var i = 0; i < howMuchFeatures; i++) {
      featuresList.push(whatRandom[i]);
    }

    return featuresList;
  };

  var getLocation = function () {
    var location = {
      'x': window.util.getRandomInRange(LocationParam.MIN_X, LocationParam.MAX_X),
      'y': window.util.getRandomInRange(LocationParam.MIN_Y, LocationParam.MAX_Y),
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
        OfferParam.TITLES[window.util.getRandomNumber(OfferParam.TITLES.length - 1)],

      'address':
        locations.address(),

      'price':
        window.util.getRandomInRange(OfferParam.MIN_PRICE, OfferParam.MAX_PRICE),

      'type':
        OfferParam.TYPES[window.util.getRandomNumber(OfferParam.TYPES.length - 1)],

      'rooms':
        window.util.getRandomInRange(OfferParam.MIN_ROOMS, OfferParam.MAX_ROOMS),

      'guests':
        window.util.getRandomInRange(OfferParam.MIN_GUESTS, OfferParam.MAX_GUESTS),

      'checkin':
        OfferParam.CHECKINS[window.util.getRandomNumber(OfferParam.CHECKINS.length - 1)],

      'checkout':
        OfferParam.CHECKOUTS[window.util.getRandomNumber(OfferParam.CHECKOUTS.length - 1)],

      'features':
        getRandomList(OfferParam.FEATURES, OfferParam.MIN_FEATURES, OfferParam.maxFeatures()),

      'description':
        OfferParam.DESCRIPTIONS[window.util.getRandomNumber(OfferParam.DESCRIPTIONS.length - 1)],

      'photos': getRandomList(OfferParam.PHOTOS, OfferParam.MIN_PHOTOS, OfferParam.maxPhotos())
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


  window.data = {
    addressesQuantiti: ADDRESSES_QUANTITI,
    OfferParam: OfferParam,
    mainPin: mainPin,
    mapArea: mapArea,
    LocationParam: LocationParam,
    allBookingProps: getAllProps()
  };
})();
