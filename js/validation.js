'use strict';

(function () {
  var TAG_LENGTH = 20;
  var INPUT_LENGTH = 5;
  var tagInput = document.querySelector('.text__hashtags');

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);

    tagInput.classList.add('invalid');

    // if field is empty -> ok
    if (hashtags.length === 0 || hashtags[0] === '') {
      tagInput.classList.remove('invalid');
      return '';
    }

    for (var l = 0; l < hashtags.length; l++) {
      var findRepeat = hashtags.filter(function (tag) {
        return tag === hashtags[l];
      });

      if (hashtags[l][0] !== '#') {
        return 'Хэш-тег должен начинаться с #';
      }

      if (hashtags[l] === '#') {
        return 'Хэш-тег не может быть только #';
      }

      if (hashtags[l].length > TAG_LENGTH) {
        return 'Хэш-тег не может быть длинее ' + TAG_LENGTH + '-ти символов, включая решётку';
      }

      if (/[^#a-zA-Zа-яА-Я0-9]/.test(hashtags[l])) {
        return 'Строка после решётки должна состоять только из букв и чисел';
      }

      if (findRepeat.length > 1) {
        return 'Один и тот же хэш-тег не может быть использован дважды';
      }
    }

    if (hashtags.length > INPUT_LENGTH) {
      return 'Можно указать не больше ' + INPUT_LENGTH + '-ти хэш-тегов';
    }

    // validate success
    tagInput.classList.remove('invalid');
    return '';
  };

  tagInput.addEventListener('input', function (evt) {
    tagInput.setCustomValidity(validateHashtags(evt.target.value));
  });
})();
