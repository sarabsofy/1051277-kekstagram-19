'use strict';

var pictureList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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

var picturesLength = 25; // Count of picture elements

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
    likes: Math.floor(Math.random() * (200 - 15 + 1) + 15),
    comments: getComments()
  };

  arrayPictures.push(item);
}

// RENDER
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
