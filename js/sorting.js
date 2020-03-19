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

  var getDefaultPhotos = function () {
    filterDefaultButton.addEventListener('click', function () {
      window.debounce(function () {
        removeButtonActiveClass();
        filterDefaultButton.classList.add('img-filters__button--active');
        cleanArrayPictures();

        window.gallery.createArrayPictures(window.load.arrayPictures);
      })();
    });
  };

  var getRandomPhotos = function () {
    filterRandomButton.addEventListener('click', function () {
      window.debounce(function () {
        removeButtonActiveClass();
        filterRandomButton.classList.add('img-filters__button--active');
        cleanArrayPictures();

        var randomPhotos = [];
        var output = window.load.arrayPictures.slice();

        for (var i = 0; i < IMG_COUNT; i++) {
          var item = getRandomData(output, true);
          randomPhotos.push(item);
        }

        window.gallery.createArrayPictures(randomPhotos);
      })();
    });
  };


  var getDiscussedPhotos = function () {
    filterDiscussedButton.addEventListener('click', function () {
      window.debounce(function () {
        removeButtonActiveClass();
        filterDiscussedButton.classList.add('img-filters__button--active');
        cleanArrayPictures();

        var output = window.load.arrayPictures.slice();

        output.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });

        window.gallery.createArrayPictures(output);
      })();
    });
  };

  window.sorting = {
    getRandomPhotos: getRandomPhotos,
    getDefaultPhotos: getDefaultPhotos,
    getDiscussedPhotos: getDiscussedPhotos,
    filter: filter
  };

})();
