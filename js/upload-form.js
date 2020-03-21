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
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainContainer = document.querySelector('main');
  var errorButtonClose = errorMessageTemplate.querySelector('.error__button');
  var successButtonClose = successMessageTemplate.querySelector('.success__button');

  // open and close modal
  var popupEscPressHandler = function (evt) {
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
    document.removeEventListener('keydown', popupEscPressHandler);

    // delete old filter styles
    photoPreview.style.filter = '';
    photoPreview.querySelector('img').style.transform = '';
    photoPreview.classList.value = 'img-upload__preview';
  };

  inputUpload.addEventListener('change', function () {
    imageEdit.classList.remove('hidden');
    body.classList.add('modal-open');
    scaleInput.value = '100%';
    effectLevelValue.value = 100;
    effectSlider.classList.add('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
  });

  buttonClose.addEventListener('click', function () {
    closeModal();
  });

  // create message
  var createUploadMessage = function (message) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    mainContainer.appendChild(fragment);
  };

  // close message
  var closeUploadMessage = function (message) {
    message.remove();
    document.removeEventListener('keydown', function (evt) {
      messageEscPressHandler(evt, message);
    });
  };

  var messageEscPressHandler = function (evt, message) {
    if (evt.key === window.bigPicture.ESC_KEY) {
      closeUploadMessage(message);
    }
  };


  var uploadHandler = function (message, button) {
    inputUpload.value = '';
    formUpload.reset();
    closeModal();
    createUploadMessage(message);
    document.addEventListener('keydown', function (evt) {
      messageEscPressHandler(evt, message);
    });
    button.addEventListener('click', function () {
      closeUploadMessage(message);
    });
    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target !== document.querySelector('.success__inner') && target !== document.querySelector('.error__inner')) {
        closeUploadMessage(message);
      }
    });
  };

  var successUploadHandler = function () {
    uploadHandler(successMessageTemplate, successButtonClose);
  };

  var errorUploadHandler = function () {
    uploadHandler(errorMessageTemplate, errorButtonClose);
  };

  formUpload.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load.loadData(successUploadHandler, 'POST', window.load.URL_POST, errorUploadHandler, new FormData(formUpload));
  });

  window.upload = {
    preview: photoPreview,
    scaleInput: scaleInput,
    effectSlider: effectSlider,
    effectLevelValue: effectLevelValue
  };

})();
