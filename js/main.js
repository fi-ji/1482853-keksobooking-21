'use strict';

const map = document.querySelector('.map');
// const mapPins = map.querySelector('.map__pins');
const mapPinMain = map.querySelector('.map__pin--main');
// const mapFilters = map.querySelector('.map__filters-container');
const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
const roomNumber = adForm.querySelector('#room_number');
const aptCapacity = adForm.querySelector('#capacity');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const pinFragment = document.createDocumentFragment();
const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
const cardFragment = document.createDocumentFragment();

const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_TIP = 19;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const ROOMS = [100, 1, 2, 3];

const MOCK = {
  type: ['palace', 'flat', 'house', 'bungalow'],
  checkinout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

const accomodationType = {
  palace: 'Дворец',
  house: 'Дом',
  bungalow: 'Бунгало',
  flat: 'Квартира'
};

// Неактивное состояние

for (let item of adFormElement) {
  item.disabled = true;
}

adForm.querySelector('input[name=address]').value = `${parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2}, ${parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2}`;

// ------------------ //

const switchToActive = () => {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (let item of adFormElement) {
    item.disabled = false;
  }
};

const fillAddressInput = () => {
  adForm.querySelector('input[name=address]').value = `${parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2}, ${parseInt(mapPinMain.style.top, 10) + (MAIN_PIN_HEIGHT + MAIN_PIN_TIP)}`;
};

const syncSelectBoxes = (arr) => {
  const roomNum = parseInt(roomNumber.value, 10);
  const capacityNum = parseInt(aptCapacity.value, 10);
  const roomsMessage = [100, ['1, 2 или 3'], ['2 или 3'], 3];
  const guestMessage = capacityNum === 1 ? 'гостя' : 'гостей';

  if (capacityNum > arr.indexOf(roomNum)) {
    roomNumber.setCustomValidity(`Выберите ${roomsMessage[capacityNum]} комнаты для ${capacityNum} ${guestMessage}`);
  } else if (!capacityNum && capacityNum !== arr.indexOf(roomNum)) {
    roomNumber.setCustomValidity(`Выберите ${roomsMessage[capacityNum]} комнат для выбора "не для гостей"`);
  } else {
    roomNumber.setCustomValidity('');
  }
  roomNumber.reportValidity();
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    switchToActive();
    fillAddressInput();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    switchToActive();
    fillAddressInput();
  }
});

roomNumber.addEventListener('change', function () {
  syncSelectBoxes(ROOMS);
});

const getRandomNumBetween = (min, max) => Math.round(Math.random() * (max - min) + min);

const generateRandomData = (mockObj, amount) => {
  const avatarArr = Array.from({length: amount}, (element, index) => {
    let num = index + 1;
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  });

  const ads = [];

  for (let i = 0; i < amount; i++) {
    let locationX = getRandomNumBetween(25, 1175);
    let locationY = getRandomNumBetween(130, 630);
    let roomsNum = getRandomNumBetween(1, 3);

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
        price: `${getRandomNumBetween(4000, 15600)}₽/ночь`,
        type: mockObj.type[getRandomNumBetween(0, mockObj.type.length - 1)],
        rooms: roomsNum,
        guests: roomsNum < 2 ? getRandomNumBetween(1, 2) : getRandomNumBetween(3, 5),
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

const renderFeatures = (card, templateCopy) => {
  const cardFeatures = templateCopy.querySelector('.popup__features');
  cardFeatures.innerHTML = '';

  for (let i = 0; i < card.offer.features.length; i++) {
    let li = document.createElement('li');
    li.classList.add('popup__feature', `popup__feature--${card.offer.features[i]}`);
    cardFeatures.appendChild(li);
  }
};

const renderPhotos = (card, templateCopy) => {
  const cardPhotos = templateCopy.querySelector('.popup__photos');
  const cardPhoto = cardPhotos.querySelector('.popup__photo');
  cardPhoto.src = `${card.offer.photos[0]}`;

  for (let i = 1; i < card.offer.photos.length; i++) {
    let cardPhotoCopy = cardPhoto.cloneNode();
    cardPhotoCopy.src = `${card.offer.photos[i]}`;

    cardPhotos.appendChild(cardPhotoCopy);
  }
};

const createAd = (ad) => {
  const adPin = pinTemplate.cloneNode(true);
  const adImg = adPin.querySelector('img');

  adPin.style = `left: ${ad.location.x - PIN_WIDTH / 2}px; top: ${ad.location.y - PIN_HEIGHT}px;`;
  adImg.src = `${ad.author.avatar}`;
  adImg.alt = `${ad.offer.title}`;

  return adPin;
};

const createCard = (card) => {
  const capacityMessage = card.offer.rooms === 1 ? `${card.offer.rooms} комната для ` : `${card.offer.rooms} комнаты для `;
  const capacityMessage2 = card.offer.guests === 1 ? `${card.offer.guests} гостя` : `${card.offer.guests} гостей`;

  const cardCopy = cardTemplate.cloneNode(true);

  cardCopy.querySelector('.popup__avatar').src = `${card.author.avatar}`;
  cardCopy.querySelector('.popup__avatar').alt = `${card.offer.title}`;
  cardCopy.querySelector('.popup__title').textContent = `${card.offer.title}`;
  cardCopy.querySelector('.popup__text--address').textContent = `${card.offer.address}`;
  cardCopy.querySelector('.popup__text--price').textContent = `${card.offer.price}`;
  cardCopy.querySelector('.popup__type').textContent = `${accomodationType[card.offer.type]}`;
  cardCopy.querySelector('.popup__text--capacity').textContent = capacityMessage + capacityMessage2;
  cardCopy.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardCopy.querySelector('.popup__description').textContent = `${card.offer.description}`;

  renderFeatures(card, cardCopy);
  renderPhotos(card, cardCopy);

  return cardCopy;
};

const fillFragment = (frag, list, func) => {
  for (let i = 0; i < list.length; i++) {
    frag.appendChild(func(list[i]));
  }
  return frag;
};

const adsList = generateRandomData(MOCK, 8);

fillFragment(pinFragment, adsList, createAd);
fillFragment(cardFragment, adsList, createCard);

// mapPins.appendChild(pinFragment);
// map.insertBefore(cardFragment, mapFilters);
