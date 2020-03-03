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

  bigPicture.classList.remove('hidden');
  if (!bigPicture.classList.contains('hidden')) {
    document.querySelector('body').classList.add('modal-open');
  }
};

renderModal(0);
