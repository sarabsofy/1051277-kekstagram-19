'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  window.uploadData = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.load.StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
