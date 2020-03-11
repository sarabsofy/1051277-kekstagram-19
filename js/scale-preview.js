'use strict';

(function () {
  var scaleButtonMinus = document.querySelector('.scale__control--smaller');
  var scaleButtonPlus = document.querySelector('.scale__control--bigger');
  var percent = 100; // default scale
  var scaleStep = 25; // default step

  var scalePhoto = function (scale) {
    window.upload.preview.style.transform = 'scale(' + scale * 0.01 + ')';
  };

  scalePhoto(percent); // set default scale

  scaleButtonMinus.addEventListener('click', function () {
    percent = window.upload.scaleInput.value.replace('%', '');
    if (percent > 25) {
      percent = Number(percent) - scaleStep;
      window.upload.scaleInput.value = percent + '%';
    }
    scalePhoto(percent);
  });

  scaleButtonPlus.addEventListener('click', function () {
    percent = window.upload.scaleInput.value.replace('%', '');
    if (percent < 100) {
      percent = Number(percent) + scaleStep;
      window.upload.scaleInput.value = percent + '%';
    }
    scalePhoto(percent);
  });
})();
