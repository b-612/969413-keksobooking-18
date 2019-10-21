'use strict';

(function () {
  var URL_FOR_LOAD = 'https://js.dump.academy/keksobooking/data';
  var METHOD_FOR_LOAD = 'GET';
  var DATA_FOR_LOAD = null;

  var URL_FOR_UPLOAD = 'https://js.dump.academy/keksobooking';
  var METHOD_FOR_UPLOAD = 'POST';

  var REQUEST_TIMEOUT = 15000;

  var RequestStatus = {
    STATUS_OK: 200,
    INVALID_REQUEST: 400,
    USER_NOT_AUTHORIZED: 401,
    NOTHING_FOUND: 404
  };

  var requestAnswers = {
    'STATUS_OK': 'Неверный запрос',
    'USER_NOT_AUTHORIZED': 'Пользователь не авторизован',
    'USER_NOT_AUTHORIZED': 'Пользователь не авторизован',
    'NOTHING_FOUND': 'Ничего не найдено',
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

    switch (data) {
      case DATA_FOR_LOAD :
        xhr.send();
        break;
      default :
        xhr.send(data);
        break;
    }

    return xhr.response;
  };

  var getErrorMessage = function (xhr) {
    var errorPrew = 'Ошибка: ';
    var errorStatus = 'Статус ошибки: ' + xhr.status;
    var errorMessage;

    switch (xhr.status) {
      case RequestStatus.INVALID_REQUEST :
        errorMessage = requestAnswers.INVALID_REQUEST;
        break;
      case RequestStatus.USER_NOT_AUTHORIZED :
        errorMessage = requestAnswers.USER_NOT_AUTHORIZED;
        break;
      case RequestStatus.NOTHING_FOUND :
        errorMessage = requestAnswers.NOTHING_FOUND;
        break;
      default :
        errorMessage = requestAnswers.DEFAULT_MESSAGE;
    }

    return {
      errorPrew: errorPrew,
      message: errorPrew + errorMessage + '. ' + errorStatus
    };
  };

  var onMassageCloseClick = function (massageBlock) {
    return function () {
      massageBlock.remove();
    };
  };

  var onMassageCloseMousedown = function (massageBlock) {
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
    errorBtn.addEventListener('click', onMassageCloseClick(errorBlock));
    errorBlock.addEventListener('mousedown', onMassageCloseMousedown(errorBlock));
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
      if (xhr.status === RequestStatus.STATUS_OK) {
        switch (method) {
          case METHOD_FOR_LOAD :
            var pins = onLoad(xhr.response);
            window.pins.addPinsListeners(pins, xhr.response);
            break;
          case METHOD_FOR_UPLOAD :
            onLoad(xhr);
            break;
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
    onMassageCloseMousedown: onMassageCloseMousedown,
    onMessageEscPress: onMessageEscPress
  };
})();
