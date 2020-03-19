'use strict';

(function () {
  var effectPin = document.querySelector('.effect-level__pin');
  var effectList = document.querySelector('.effects__list');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var currentEffect = 'none';
  var draggable = false;
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
      window.upload.effectLevelValue.value = 100;
      effectPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      draggable = false;

      var target = evt.target;
      var preveEffect = 'effects__preview--' + currentEffect;

      currentEffect = target.value;
      findEffect(currentEffect);

      var className = 'effects__preview--' + currentEffect;

      window.upload.preview.classList.remove(preveEffect);
      window.upload.preview.classList.add(className);

      window.upload.preview.style.filter = ''; // delete old filter styles

      // hide slider on default position
      if (currentEffect === 'none') {
        window.upload.effectSlider.classList.add('hidden');
      } else {
        window.upload.effectSlider.classList.remove('hidden');
      }
    }
  });

  // Change effect level by pin's position

  // photo effects level
  var interpolation = function (value, min, max, newMin, newMax) {
    var newValue = ((value - min) / (max - min)) * (newMax - newMin) + newMin;
    return newValue;
  };

  var setDistanceEffect = function (evt) {
    var evtX = evt.clientX;
    var coords = effectLevelLine.getBoundingClientRect();

    var start = coords.x;
    var end = coords.right;
    var levelPercent = interpolation(evtX, start, end, 0, 100);

    if (levelPercent >= 100) {
      levelPercent = 100;
    }
    if (levelPercent <= 0) {
      levelPercent = 0;
    }

    var value = interpolation(evtX, start, end, effectObject.min, effectObject.max);
    value = value.toFixed(2) + effectObject.unit;

    window.upload.effectLevelValue.value = levelPercent;

    effectPin.style.left = levelPercent + '%';
    effectPin.style.transform = 'tranlateX(-50%)';
    effectLevelDepth.style.width = levelPercent + '%';

    window.upload.preview.style.filter = effectObject.filter + '(' + value + ')';
  };

  effectLevelLine.addEventListener('mousedown', function () {
    draggable = true;
  });

  effectLevelLine.addEventListener('mousemove', function (evt) {
    if (draggable === true) {
      setDistanceEffect(evt);
    }
  });

  document.addEventListener('mouseup', function (evt) {
    if (draggable === true) {
      draggable = false;
      setDistanceEffect(evt);
    }
  });

})();
