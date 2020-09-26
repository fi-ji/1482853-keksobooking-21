'use strict';

const map = document.querySelector('.map');
const mapPins = map.querySelector('.map__pins');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const pinFragment = document.createDocumentFragment();

const MOCK = {
  type: ['palace', 'flat', 'house', 'bungalow'],
  checkinout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

map.classList.remove('map--faded');

const getRandomNumBetween = (min, max) => Math.round(Math.random() * (max - min) + min);

const generateRandomData = (mockObj, amount) => {
  const avatarArr = Array.from({ length: amount }, (element, index) => {
    let num = index + 1;
    if (num < 10) {
      return `0${num}`
    }
    return num
  });

  const ads = [];

  for (let i = 0; i < amount; i++) {
    let locationX = getRandomNumBetween(25, 1175);
    let locationY = getRandomNumBetween(130, 630);

    let ad = {
      author: {
        avatar: `img/avatars/user${avatarArr.splice(getRandomNumBetween(0, avatarArr.length - 1), 1)}.png`
      },
      location: {
        x: locationX,
        y: locationY
      },
      offer: {
        title: 'Милая, уютная квартирка в центре Токио',
        address: `${locationX}, ${locationY}`,
        price: `${getRandomNumBetween(50, 200)}$/ночь`,
        type: mockObj.type[getRandomNumBetween(0, mockObj.type.length - 1)],
        rooms: getRandomNumBetween(1, 3),
        guests: this.rooms < 2 ? getRandomNumBetween(1, 2) : getRandomNumBetween(3, 5),
        checkin: mockObj.checkinout[getRandomNumBetween(0, mockObj.checkinout.length - 1)],
        checkout: mockObj.checkinout[getRandomNumBetween(0, mockObj.checkinout.length - 1)],
        features: mockObj.features.slice(0, getRandomNumBetween(1, mockObj.features.length)),
        description: 'Уютная, чистая квартира со всей необходимой мебелью и техникой. На собственной кухне можно приготовить или разогреть еду. Чай, кофе, каша, макароны и масло есть всегда. До центра около 10 минут пешком.',
        photos: mockObj.photos.slice(0, getRandomNumBetween(1, mockObj.photos.length))
      }
    };

    ads.push(ad);
  }
  return ads;
};

const renderAds = (ad) => {
  const adPin = pinTemplate.cloneNode(true);
  const adImg = adPin.querySelector('img');

  adPin.style = `left: ${ad.location.x - 25}px; top: ${ad.location.y - 70}px;`;
  adImg.src = `${ad.author.avatar}`;
  adImg.alt = `${ad.offer.title}`;

  return adPin;
};

const fillFragment = (frag, list, func) => {
  for (let i = 0; i < list.length; i++) {
    frag.appendChild(func(list[i]));
  }
  return frag;
};

const adsList = generateRandomData(MOCK, 8);

fillFragment(pinFragment, adsList, renderAds);

mapPins.appendChild(pinFragment);
