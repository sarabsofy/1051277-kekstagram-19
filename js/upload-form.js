'use strict';

(function () {
  var body = document.querySelector('body');
  var formUpload = body.querySelector('.img-upload__form');
  var inputUpload = formUpload.querySelector('#upload-file');
  var imageEdit = formUpload.querySelector('.img-upload__overlay');
  var buttonClose = imageEdit.querySelector('#upload-cancel');
  var photoPreview = imageEdit.querySelector('.img-upload__preview');
  var scaleInput = imageEdit.querySelector('.scale__control--value');
  var effectSlider = imageEdit.querySelector('.img-upload__effect-level');
  var effectLevelValue = imageEdit.querySelector('.effect-level__value');

  // open and close modal
  var onPopupEscPress = function (evt) {
    if (evt.key === window.bigPicture.ESC_KEY &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')) {
      inputUpload.value = '';
      formUpload.reset();
      closeModal();
    }
  };

  var closeModal = function () {
    imageEdit.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);

    // delete old filter styles
    photoPreview.style.filter = '';
    photoPreview.style.transform = '';
    photoPreview.classList.value = 'img-upload__preview';
  };

  inputUpload.addEventListener('change', function () {
    imageEdit.classList.remove('hidden');
    body.classList.add('modal-open');
    scaleInput.value = '100%';
    effectLevelValue.value = 100;
    effectSlider.classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  });

  buttonClose.addEventListener('click', function () {
    closeModal();
  });

  window.upload = {
    preview: photoPreview,
    scaleInput: scaleInput,
    effectSlider: effectSlider,
    effectLevelValue: effectLevelValue
  };

})();
