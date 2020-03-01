'use strict';

var pictureList = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var pictures = [
  {
    url: 'photos/1.jpg',
    description: '',
    likes: 27,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      },
      {
        avatar: 'img/avatar-5.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Никита'
      },
      {
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Настя'
      }
    ]
  },
  {
    url: 'photos/7.jpg',
    description: '',
    likes: 15,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      }
    ]
  },
  {
    url: 'photos/5.jpg',
    description: '',
    likes: 33,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Настя'
      }
    ]
  },
  {
    url: 'photos/8.jpg',
    description: '',
    likes: 47,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      },
      {
        avatar: 'img/avatar-5.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Никита'
      },
      {
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Настя'
      }
    ]
  },
  {
    url: 'photos/6.jpg',
    description: '',
    likes: 56,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      }
    ]
  },
  {
    url: 'photos/4.jpg',
    description: '',
    likes: 21,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Настя'
      }
    ]
  },
  {
    url: 'photos/2.jpg',
    description: '',
    likes: 158,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      },
      {
        avatar: 'img/avatar-5.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Никита'
      }
    ]
  },
  {
    url: 'photos/3.jpg',
    description: '',
    likes: 131,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      }
    ]
  },
  {
    url: 'photos/10.jpg',
    description: '',
    likes: 90,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      }
    ]
  },
  {
    url: 'photos/9.jpg',
    description: '',
    likes: 54,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      },
      {
        avatar: 'img/avatar-5.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Никита'
      }
    ]
  },
  {
    url: 'photos/13.jpg',
    description: '',
    likes: 86,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      }
    ]
  },
  {
    url: 'photos/12.jpg',
    description: '',
    likes: 187,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      }
    ]
  },
  {
    url: 'photos/14.jpg',
    description: '',
    likes: 16,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      }
    ]
  },
  {
    url: 'photos/11.jpg',
    description: '',
    likes: 34,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Настя'
      }
    ]
  },
  {
    url: 'photos/18.jpg',
    description: '',
    likes: 47,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      },
      {
        avatar: 'img/avatar-5.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Никита'
      },
      {
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Настя'
      }
    ]
  },
  {
    url: 'photos/15.jpg',
    description: '',
    likes: 75,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      }
    ]
  },
  {
    url: 'photos/17.jpg',
    description: '',
    likes: 109,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      }
    ]
  },
  {
    url: 'photos/16.jpg',
    description: '',
    likes: 81,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      }
    ]
  },
  {
    url: 'photos/19.jpg',
    description: '',
    likes: 93,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      }
    ]
  },
  {
    url: 'photos/22.jpg',
    description: '',
    likes: 67,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      }
    ]
  },
  {
    url: 'photos/20.jpg',
    description: '',
    likes: 19,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      }
    ]
  },
  {
    url: 'photos/21.jpg',
    description: '',
    likes: 124,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-5.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Никита'
      },
      {
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Настя'
      }
    ]
  },
  {
    url: 'photos/25.jpg',
    description: '',
    likes: 176,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      },
      {
        avatar: 'img/avatar-5.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Никита'
      }
    ]
  },
  {
    url: 'photos/23.jpg',
    description: '',
    likes: 106,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      }
    ]
  },
  {
    url: 'photos/24.jpg',
    description: '',
    likes: 110,
    comments: [
      {
        avatar: 'img/avatar-1.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Пётр'
      },
      {
        avatar: 'img/avatar-2.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Евгений'
      },
      {
        avatar: 'img/avatar-3.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Колян'
      },
      {
        avatar: 'img/avatar-4.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Маруся'
      }
    ]
  }
];

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}

pictureList.appendChild(fragment);
