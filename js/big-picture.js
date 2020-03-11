'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var pictureList = document.querySelector('.pictures');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var bigPicture = document.querySelector('.big-picture');
  var commentCount = document.querySelector('.social__comment-count');
  var commentLoad = document.querySelector('.comments-loader');
  var commentList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');


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
    var pic = window.gallery.array[el];

    bigPicture.querySelector('.big-picture__img img').src = pic.url;
    bigPicture.querySelector('.likes-count').textContent = pic.likes;
    bigPicture.querySelector('.comments-count').textContent = pic.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pic.description;

    createComments(pic.comments);

    commentCount.classList.add('hidden');
    commentLoad.classList.add('hidden');

    if (!bigPicture.classList.contains('hidden')) {
      document.querySelector('body').classList.add('modal-open');
    }
  };

  // open and close big picture
  var openPicture = function (evt) {
    var target = evt.target;
    if (target.matches('a[data-id]') || target.parentNode.matches('a[data-id]')) {
      evt.preventDefault();
      var id = target.dataset.id || target.parentNode.dataset.id;
      renderModal(id);
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onPictureEscPress);
      document.removeEventListener('keydown', onPictureEnterPress);
    }
  };

  var closePicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEscPress);
    document.addEventListener('keydown', onPictureEnterPress);
  };

  var keydownHandler = function (evt, key, func) {
    if (evt.key === key) {
      func(evt);
    }
  };

  var onPictureEnterPress = function (evt) {
    keydownHandler(evt, ENTER_KEY, openPicture);
  };

  var onPictureEscPress = function (evt) {
    keydownHandler(evt, ESC_KEY, closePicture);
  };

  pictureList.addEventListener('click', function (evt) {
    openPicture(evt);
  });

  bigPictureClose.addEventListener('click', function () {
    closePicture();
  });

  window.bigPicture = {
    ESC_KEY: ESC_KEY
  };
})();
