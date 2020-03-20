'use strict';

(function () {
  var DEFAULT_SCALE = 100;
  var scaleButtonMinus = document.querySelector('.scale__control--smaller');
  var scaleButtonPlus = document.querySelector('.scale__control--bigger');
  var percent = 100; // default scale
  var scaleStep = 25; // default step

  var scalePhoto = function (scale) {
    window.upload.preview.querySelector('img').style.transform = 'scale(' + scale * 0.01 + ')';
  };

  scalePhoto(percent); // set default scale

  scaleButtonMinus.addEventListener('click', function () {
    percent = window.upload.scaleInput.value.replace('%', '');
    if (percent > scaleStep) {
      percent = Number(percent) - scaleStep;
      window.upload.scaleInput.value = percent + '%';
    }
    scalePhoto(percent);
  });

  scaleButtonPlus.addEventListener('click', function () {
    percent = window.upload.scaleInput.value.replace('%', '');
    if (percent < DEFAULT_SCALE) {
      percent = Number(percent) + scaleStep;
      window.upload.scaleInput.value = percent + '%';
    }
    scalePhoto(percent);
  });
})();
