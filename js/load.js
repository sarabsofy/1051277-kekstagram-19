'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000; // 10 s;
  var StatusCode = {
    OK: 200
  };
  var arrayPictures = [];

  var loadData = function (successHandler, method, url, errorHandler, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler();
        throw new Error('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler();
      throw new Error('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      throw new Error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.load = {
    loadData: loadData,
    URL_POST: URL_POST,
    URL_GET: URL_GET,
    arrayPictures: arrayPictures
  };
})();
