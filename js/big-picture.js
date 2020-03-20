'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var COMENT_COUNTER = 5;
  var COMMENT_STEP = 5;
  var COMMENT_COUNTER_DEFAULT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var pictureList = document.querySelector('.pictures');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentLoad = bigPicture.querySelector('.comments-loader');
  var commentList = bigPicture.querySelector('.social__comments');
  var commentTemplate = bigPicture.querySelector('.social__comment');
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

    if (el.length <= COMENT_COUNTER) {
      almost = el.length;
    } else {
      almost = COMENT_COUNTER;
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

    if (pic.comments.length <= COMENT_COUNTER) {
      createComments(pic.comments, pic.comments.length);
      commentLoad.classList.add('hidden');
    } else {
      commentLoad.classList.remove('hidden');
      createComments(pic.comments, COMENT_COUNTER);
    }

    commentsLoadHandler = function () {
      COMENT_COUNTER += COMMENT_STEP;

      if (pic.comments.length > COMENT_COUNTER) {
        createComments(pic.comments, COMENT_COUNTER);
      } else {
        createComments(pic.comments, pic.comments.length);
        commentLoad.classList.add('hidden');
        COMENT_COUNTER = pic.comments.length;
      }

      commentCount.innerHTML = COMENT_COUNTER + ' из <span class="comments-count">' + pic.comments.length + '</span> комментариев';
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
    COMENT_COUNTER = COMMENT_COUNTER_DEFAULT;
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
