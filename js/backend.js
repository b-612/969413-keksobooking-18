'use strict';

(function () {
  var URL_FOR_LOAD = 'https://js.dump.academy/keksobooking/data';
  var METHOD_FOR_LOAD = 'GET';

  var REQUEST_TIMEOUT = 15000;
  var STATUS_OK = 200;

  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error');
  // var fragment = window.util.fragment;

  var getXhr = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    return xhr;
  };

  var getXhrParams = function (xhr, url, method, timeout, data) {
    xhr.timeout = timeout;
    xhr.open(method, url);

    switch (data) {
      case null :
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
      case 400 :
        errorMessage = 'Неверный запрос';
        break;
      case 401 :
        errorMessage = 'Пользователь не авторизован';
        break;
      case 404 :
        errorMessage = 'Ничего не найдено';
        break;
      default :
        errorMessage = 'Что-то пошло не так';
    }

    return {
      errorPrew: errorPrew,
      message: errorPrew + errorMessage + '. ' + errorStatus
    };
  };

  var getError = function (errorMessage) {
    var errorTemplateCopy = errorTemplate.cloneNode(true);
    var errorBlock = errorTemplateCopy.content.querySelector('.error');
    var errorText = errorBlock.querySelector('.error__message');

    errorText.textContent = errorMessage;
    main.insertAdjacentElement('afterbegin', errorBlock);
  };

  var getAdditionalErrors = function (xhr) {
    xhr.addEventListener('error', function () {
      getError(getErrorMessage(xhr).errorPrew + 'Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      getError(getErrorMessage(xhr).errorPrew + 'Запрос не успел выполниться за ' + xhr.timeout + ' миллисекунд.');
    });
  };

  var setLoadCallback = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        var pins = onLoad(xhr.response);
        window.pins.addPinsListeners(pins, xhr.response);
      } else {
        onError(getErrorMessage(xhr).message);
      }
    });
  };

  var getAllPinsData = function (onLoad, onError) {
    var xhr = getXhr();

    getXhrParams(xhr, URL_FOR_LOAD, METHOD_FOR_LOAD, REQUEST_TIMEOUT, null);
    getAdditionalErrors(xhr);
    setLoadCallback(xhr, onLoad, onError);
  };

  window.backend = {
    getAllPinsData: getAllPinsData,
    getError: getError
  };
})();

