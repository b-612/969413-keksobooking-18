'use strict';

(function () {
  var URL_FOR_LOAD = 'https://js.dump.academy/keksobooking/data';
  var METHOD_FOR_LOAD = 'GET';
  var DATA_FOR_LOAD = null;

  var URL_FOR_UPLOAD = 'https://js.dump.academy/keksobooking';
  var METHOD_FOR_UPLOAD = 'POST';

  var REQUEST_TIMEOUT = 15000;

  var STATUS_OK = 200;

  var ErrorAnswersMap = {
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'Ничего не найдено',
    'DEFAULT_MESSAGE': 'Что-то пошло не так'
  };

  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error');

  var getXhr = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    return xhr;
  };

  var getXhrParams = function (xhr, url, method, timeout, data) {
    xhr.timeout = timeout;
    xhr.open(method, url);

    if (data === DATA_FOR_LOAD) {
      xhr.send();
    } else {
      xhr.send(data);
    }

    return xhr.response;
  };

  var getErrorMessage = function (xhr) {
    var errorPrew = 'Ошибка: ';
    var errorStatus = 'Статус ошибки: ' + xhr.status;
    var errorMessage = ErrorAnswersMap[xhr.status];

    if (!errorMessage) {
      errorMessage = ErrorAnswersMap.DEFAULT_MESSAGE;
    }

    return {
      errorPrew: errorPrew,
      message: errorPrew + errorMessage + '. ' + errorStatus
    };
  };

  var onMessageCloseClick = function (massageBlock) {
    return function () {
      massageBlock.remove();
    };
  };

  var onMessageCloseMousedown = function (massageBlock) {
    return function (evt) {
      if (evt.which === window.util.MOUSE_LEFT_KEYCODE) {
        massageBlock.remove();
      }
    };
  };

  var onMessageEscPress = function (massageBlock) {
    return function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        massageBlock.remove();
      }
    };
  };

  var getError = function (errorMessage) {
    var errorTemplateCopy = errorTemplate.cloneNode(true);
    var errorBlock = errorTemplateCopy.content.querySelector('.error');
    var errorText = errorBlock.querySelector('.error__message');
    var errorBtn = errorBlock.querySelector('.error__button');

    errorText.textContent = errorMessage;
    main.insertAdjacentElement('afterbegin', errorBlock);
    errorBtn.addEventListener('click', onMessageCloseClick(errorBlock));
    errorBlock.addEventListener('mousedown', onMessageCloseMousedown(errorBlock));
    errorBlock.addEventListener('keydown', onMessageEscPress(errorBlock));
    errorBlock.tabIndex = 1;
    errorBlock.focus();
  };

  var getAdditionalErrors = function (xhr) {
    xhr.addEventListener('error', function () {
      getError(getErrorMessage(xhr).errorPrew + 'Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      getError(getErrorMessage(xhr).errorPrew + 'Запрос не успел выполниться за ' + xhr.timeout + ' миллисекунд.');
    });
  };

  var setLoadCallback = function (xhr, onLoad, onError, method) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        if (method === METHOD_FOR_LOAD) {
          var shuffledPins = window.util.shuffleArray(xhr.response);
          var pins = onLoad(shuffledPins);
          window.pins.addMarkersListeners(pins, shuffledPins);
          window.backend.downloadPins = shuffledPins;
        } else {
          onLoad(xhr);
        }
      } else {
        onError(getErrorMessage(xhr).message);
      }
    });
  };

  var loadUploadData = function (url, onLoad, onError, method, timeout, data) {
    var xhr = getXhr();

    getXhrParams(xhr, url, method, timeout, data);
    getAdditionalErrors(xhr);
    setLoadCallback(xhr, onLoad, onError, method);
  };

  window.backend = {
    requestTimeout: REQUEST_TIMEOUT,

    urlForLoad: URL_FOR_LOAD,
    methodForLoad: METHOD_FOR_LOAD,
    dataForLoad: DATA_FOR_LOAD,

    urlForUpload: URL_FOR_UPLOAD,
    methodForUpload: METHOD_FOR_UPLOAD,

    main: main,

    getError: getError,
    loadUploadData: loadUploadData,
    onMessageCloseMousedown: onMessageCloseMousedown,
    onMessageEscPress: onMessageEscPress
  };
})();
