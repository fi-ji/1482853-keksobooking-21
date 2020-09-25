'use strict';

const map = document.querySelector('.map');
const mapPins = map.querySelector('.map__pins');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const pinFragment = document.createDocumentFragment();

map.classList.remove('map--faded');

const getRandomNumBetween = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomArr = (item, amount) => {
  let arr = [];

  do {
    let element = item ? item[Math.floor(Math.random() * amount)] : Math.ceil(Math.random() * amount);
    arr.push(element);

    arr = arr.filter((elem, index) => arr.indexOf(elem) === index);
  } while (arr.length < amount);

  return arr;
};

const generateRandomData = (amount) => {
  const ads = [];
  const mock = {
    avatar: getRandomArr(null, amount),
    type: ['palace', 'flat', 'house', 'bungalow'],
    checkinout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  for (let i = 0; i < amount; i++) {
    let ad = {};

    ad.author = {
      avatar: `img/avatars/user0${mock.avatar[i]}.png`
    };
    ad.location = {
      x: getRandomNumBetween(25, 1175),
      y: getRandomNumBetween(130, 630)
    };
    ad.offer = {
      title: 'Милая, уютная квартирка в центре Токио',
      address: `${ad.location.x}, ${ad.location.y}`,
      price: `${getRandomNumBetween(50, 200)}$/ночь`,
      type: mock.type[getRandomNumBetween(0, mock.type.length - 1)],
      rooms: getRandomNumBetween(1, 3),
      guests: ad.rooms < 2 ? getRandomNumBetween(1, 2) : getRandomNumBetween(3, 5),
      checkin: mock.checkinout[getRandomNumBetween(0, mock.checkinout.length - 1)],
      checkout: mock.checkinout[getRandomNumBetween(0, mock.checkinout.length - 1)],
      features: getRandomArr(mock.features, getRandomNumBetween(1, 6)),
      description: 'Уютная, чистая квартира со всей необходимой мебелью и техникой. На собственной кухне можно приготовить или разогреть еду. Чай, кофе, каша, макароны и масло есть всегда. До центра около 10 минут пешком.',
      photos: getRandomArr(mock.photos, getRandomNumBetween(1, 3))
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

const adsList = generateRandomData(8);

fillFragment(pinFragment, adsList, renderAds);

mapPins.appendChild(pinFragment);
