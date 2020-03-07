'use strict';

var pictureList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var commentCount = document.querySelector('.social__comment-count');
var commentLoad = document.querySelector('.comments-loader');
var commentList = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('.social__comment');

var picturesLength = 25; // Count of picture elements
var arrayPictures = [];
var addressesPicture = [];
var descriptionsPicture = [];
var commentAvatars = [];
var commentNames = ['Петя', 'Николай', 'Алёна', 'Настя', 'Евгений', 'Никита'];
var commentTexts = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// create pics urls
var picturesUrl = function (array, name, count, format) {
  for (var i = 0; i < count; i++) {
    array[i] = name + (i + 1) + '.' + format;
  }
};

picturesUrl(commentAvatars, 'img/avatar-', 6, 'svg');
picturesUrl(addressesPicture, 'photos/', picturesLength, 'jpg');

// get pandom data from array
var getRandomData = function (array, splice) {

  var result = Math.floor(Math.random() * array.length);
  var content = array[result];

  if (splice) {
    array.splice(result, 1);
  }

  return content;
};

// create comments
var getComments = function () {

  var commentsCount = Math.floor(Math.random() * commentTexts.length); // get random comments count
  var copyComments = commentTexts.slice(); // Exclude same text messages
  var copyAvatars = commentAvatars.slice();

  var comments = [];
  for (var i = 0; i < commentsCount; i++) {
    var comment = {
      name: getRandomData(commentNames, false),
      avatar: getRandomData(copyAvatars, true),
      message: getRandomData(copyComments, true)
    };

    comments.push(comment);
  }
  return comments;
};

// Create pictures objects
for (var i = 0; i < picturesLength; i++) {
  var item = {
    url: getRandomData(addressesPicture, true),
    description: getRandomData(descriptionsPicture, true),
    likes: Math.floor(Math.random() * 186 + 15), // Range likes from 15 to 200
    comments: getComments()
  };

  arrayPictures.push(item);
}

// RENDER ALL PICTURES
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};


var fragment = document.createDocumentFragment();
for (var j = 0; j < arrayPictures.length; j++) {
  fragment.appendChild(renderPicture(arrayPictures[j]));
}

pictureList.appendChild(fragment);

// RENDER MODAL OF SINGLE PICTURE

// Get content of single comment
var renderComment = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

// Create comment list
var createComments = function (el) {
  var fragmentComment = document.createDocumentFragment();
  for (var k = 0; k < el.length; k++) {
    fragmentComment.appendChild(renderComment(el[k]));
  }
  commentList.innerHTML = '';
  commentList.appendChild(fragmentComment);
};

// Render modal content
var renderModal = function (el) {
  var pic = arrayPictures[el];

  bigPicture.querySelector('.big-picture__img img').src = pic.url;
  bigPicture.querySelector('.likes-count').textContent = pic.likes;
  bigPicture.querySelector('.comments-count').textContent = pic.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pic.description;

  createComments(pic.comments);

  commentCount.classList.add('hidden');
  commentLoad.classList.add('hidden');

  // bigPicture.classList.remove('hidden');
  if (!bigPicture.classList.contains('hidden')) {
    document.querySelector('body').classList.add('modal-open');
  }
};

renderModal(0);

// UPLOAD IMAGE FILTER

var ESC_KEY = 'Escape';
var body = document.querySelector('body');
var formUpload = body.querySelector('.img-upload__form');
var inputUpload = formUpload.querySelector('#upload-file');
var imageEdit = formUpload.querySelector('.img-upload__overlay');
var buttonClose = imageEdit.querySelector('#upload-cancel');
var scaleInput = imageEdit.querySelector('.scale__control--value');
var scaleButtonMinus = imageEdit.querySelector('.scale__control--smaller');
var scaleButtonPlus = imageEdit.querySelector('.scale__control--bigger');
var photoPreview = imageEdit.querySelector('.img-upload__preview');
var effectPin = imageEdit.querySelector('.effect-level__pin');
var effectSlider = imageEdit.querySelector('.img-upload__effect-level');
var effectList = imageEdit.querySelector('.effects__list');
var effectLevelLine = imageEdit.querySelector('.effect-level__line');
var effectLevelValue = imageEdit.querySelector('.effect-level__value');

var currentEffect = 'none';
var effectsValues = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 0,
    unit: ''
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    unit: ''
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    unit: ''
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    unit: '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    unit: 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    unit: ''
  }
];
var effectObject = effectsValues[0]; // set current effect obj

// open and close modal

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY &&
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

// photo scale
var percent = 100; // default scale
var scaleStep = 25; // default step

var scalePhoto = function (scale) {
  photoPreview.style.transform = 'scale(' + scale * 0.01 + ')';
};

scalePhoto(percent); // set default scale

scaleButtonMinus.addEventListener('click', function () {
  percent = scaleInput.value.replace('%', '');
  if (percent > 25) {
    percent = Number(percent) - scaleStep;
    scaleInput.value = percent + '%';
  }
  scalePhoto(percent);
});

scaleButtonPlus.addEventListener('click', function () {
  percent = scaleInput.value.replace('%', '');
  if (percent < 100) {
    percent = Number(percent) + scaleStep;
    scaleInput.value = percent + '%';
  }
  scalePhoto(percent);
});

// change effect by radio button

// find obj by its effect name
var findEffect = function (name) {
  effectObject = effectsValues.find(function (obj) {
    return obj.name === name;
  });
};

// add listeners to all radio buttons
effectList.addEventListener('change', function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    effectLevelValue.value = 100;

    var target = evt.target;
    var preveEffect = 'effects__preview--' + currentEffect;

    currentEffect = target.value;
    findEffect(currentEffect);

    var className = 'effects__preview--' + currentEffect;

    photoPreview.classList.remove(preveEffect);
    photoPreview.classList.add(className);

    photoPreview.style.filter = ''; // delete old filter styles

    // hide slider on default position
    if (currentEffect === 'none') {
      effectSlider.classList.add('hidden');
    } else {
      effectSlider.classList.remove('hidden');
    }
  }
});

// Change effect level by pin's position

// photo effects level
var interpolation = function (value, min, max, newMin, newMax) {
  var newValue = ((value - min) / (max - min)) * (newMax - newMin) + newMin;
  return newValue;
};

effectPin.addEventListener('mouseup', function (evt) {
  var evtX = evt.clientX;
  var coords = effectLevelLine.getBoundingClientRect();

  var start = coords.x;
  var end = coords.right;
  var levelPercent = Math.floor(interpolation(evtX, start, end, 0, 100));
  var value = interpolation(evtX, start, end, effectObject.min, effectObject.max);
  value = value.toFixed(2) + effectObject.unit;
  effectLevelValue.value = levelPercent;

  photoPreview.style.filter = effectObject.filter + '(' + value + ')';
});


// VALIDATION
var TAG_LENGTH = 20;
var INPUT_LENGTH = 5;
var tagInput = formUpload.querySelector('.text__hashtags');

var validateHashtags = function (value) {
  var hashtags = value.toLowerCase().trim().split(/\s+/);

  if (hashtags.length === 0) {
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

    if (/[^#a-zA-Z0-9]/.test(hashtags[l])) {
      return 'Строка после решётки должна состоять только из букв и чисел';
    }

    if (findRepeat.length > 1) {
      return 'Один и тот же хэш-тег не может быть использован дважды';
    }
  }

  if (hashtags.length > INPUT_LENGTH) {
    return 'Можно указать не больше ' + INPUT_LENGTH + '-ти хэш-тегов';
  }

  return '';
};

tagInput.addEventListener('input', function (evt) {
  tagInput.setCustomValidity(validateHashtags(evt.target.value));
});
