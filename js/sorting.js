'use strict';

(function () {
  var IMG_COUNT = 10;
  var filter = document.querySelector('.img-filters');
  var filterButtons = filter.querySelectorAll('.img-filters__button');
  var filterRandomButton = filter.querySelector('#filter-random');
  var filterDefaultButton = filter.querySelector('#filter-default');
  var filterDiscussedButton = filter.querySelector('#filter-discussed');

  var getRandomData = function (array, splice) {
    var result = Math.floor(Math.random() * array.length);
    var content = array[result];

    if (splice) {
      array.splice(result, 1);
    }

    return content;
  };

  var removeButtonActiveClass = function () {
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var cleanArrayPictures = function () {
    var pictures = window.gallery.pictureList.querySelectorAll('.picture');

    pictures.forEach(function (picture) {
      window.gallery.pictureList.removeChild(picture);
    });
  };


  var getSortingPhotos = function (button, func) {
    button.addEventListener('click', function () {
      window.debounce(function () {
        removeButtonActiveClass();
        button.classList.add('img-filters__button--active');
        cleanArrayPictures();

        func();
      })();
    });
  };

  var renderRandomPhotos = function () {
    var randomPhotos = [];
    var output = window.load.arrayPictures.slice();

    for (var i = 0; i < IMG_COUNT; i++) {
      var item = getRandomData(output, true);
      randomPhotos.push(item);
    }

    window.gallery.createArrayPictures(randomPhotos);
  };

  var renderDefaultPhotos = function () {
    window.gallery.createArrayPictures(window.load.arrayPictures);
  };

  var renderDiscussedPhotos = function () {
    var output = window.load.arrayPictures.slice();

    output.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    window.gallery.createArrayPictures(output);
  };


  var getRandomPhotos = function () {
    getSortingPhotos(filterRandomButton, renderRandomPhotos);
  };

  var getDefaultPhotos = function () {
    getSortingPhotos(filterDefaultButton, renderDefaultPhotos);
  };

  var getDiscussedPhotos = function () {
    getSortingPhotos(filterDiscussedButton, renderDiscussedPhotos);
  };

  window.sorting = {
    getRandomPhotos: getRandomPhotos,
    getDefaultPhotos: getDefaultPhotos,
    getDiscussedPhotos: getDiscussedPhotos,
    filter: filter
  };

})();
