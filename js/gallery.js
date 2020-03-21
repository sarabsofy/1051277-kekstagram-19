'use strict';

(function () {
  var pictureList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // RENDER ALL PICTURES
  var renderPicture = function (picture, id) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.dataset.id = id;
    return pictureElement;
  };

  var createArrayPictures = function (array) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < array.length; j++) {
      fragment.appendChild(renderPicture(array[j], array[j].id));
    }

    pictureList.appendChild(fragment);
  };

  var successLoadHandler = function (data) {
    for (var item in data) {
      if (data.hasOwnProperty(item)) {
        data[item]['id'] = item;
      }
    }

    window.sorting.filter.classList.remove('img-filters--inactive');
    window.load.arrayPictures = data;
    createArrayPictures(window.load.arrayPictures);
    window.sorting.getRandomPhotos();
    window.sorting.getDefaultPhotos();
    window.sorting.getDiscussedPhotos();
  };

  window.load.loadData(successLoadHandler, 'GET', window.load.URL_GET);

  window.gallery = {
    pictureList: pictureList,
    createArrayPictures: createArrayPictures
  };
})();
