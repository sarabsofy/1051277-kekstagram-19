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
  var commentCounter = 5;
  var commentStep = 5;
  var commentsLoadHandler;


  // Get content of single comment
  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  // Create comment list
  var createComments = function (el, sum) {
    var fragmentComment = document.createDocumentFragment();
    for (var k = 0; k < sum; k++) {
      fragmentComment.appendChild(renderComment(el[k]));
    }
    commentList.innerHTML = '';
    var almost;

    if (el.length <= commentCounter) {
      almost = el.length;
    } else {
      almost = commentCounter;
    }

    commentCount.innerHTML = almost + ' из <span class="comments-count">' + el.length + '</span> комментариев';
    commentList.appendChild(fragmentComment);
  };

  // Render modal content
  var renderModal = function (el) {
    var pic = window.load.arrayPictures[el];

    bigPicture.querySelector('.big-picture__img img').src = pic.url;
    bigPicture.querySelector('.likes-count').textContent = pic.likes;
    bigPicture.querySelector('.comments-count').textContent = pic.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pic.description;

    if (pic.comments.length <= commentCounter) {
      createComments(pic.comments, pic.comments.length);
      commentLoad.classList.add('hidden');
    } else {
      commentLoad.classList.remove('hidden');
      createComments(pic.comments, commentCounter);
    }

    commentsLoadHandler = function () {
      commentCounter += commentStep;

      if (pic.comments.length > commentCounter) {
        createComments(pic.comments, commentCounter);
      } else {
        createComments(pic.comments, pic.comments.length);
        commentLoad.classList.add('hidden');
        commentCounter = pic.comments.length;
      }

      commentCount.innerHTML = commentCounter + ' из <span class="comments-count">' + pic.comments.length + '</span> комментариев';
    };
  };


  // open and close big picture
  var openPicture = function (evt) {
    var target = evt.target;
    if (target.matches('a[data-id]') || target.parentNode.matches('a[data-id]')) {
      evt.preventDefault();
      var id = target.dataset.id || target.parentNode.dataset.id;
      renderModal(id);
      bigPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', pictureEscPressHandler);
      document.removeEventListener('keydown', pictureEnterPressHandler);
      commentLoad.addEventListener('click', commentsLoadHandler);
    }
  };

  var closePicture = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', pictureEscPressHandler);
    document.addEventListener('keydown', pictureEnterPressHandler);
    commentLoad.removeEventListener('click', commentsLoadHandler);
    commentCounter = 5;
  };

  var keydownHandler = function (evt, key, func) {
    if (evt.key === key) {
      func(evt);
    }
  };

  var pictureEnterPressHandler = function (evt) {
    keydownHandler(evt, ENTER_KEY, openPicture);
  };

  var pictureEscPressHandler = function (evt) {
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
