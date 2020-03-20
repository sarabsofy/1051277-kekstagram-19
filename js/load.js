'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000; // 10 s;
  var StatusCode = {
    OK: 200
  };
  var arrayPictures = [];

  var loadData = function (successHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        throw new Error('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      throw new Error('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      throw new Error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var uploadData = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler();
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.load = {
    loadData: loadData,
    uploadData: uploadData,
    arrayPictures: arrayPictures
  };
})();
