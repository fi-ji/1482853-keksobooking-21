'use strict';

const map = document.querySelector('.map');
const mapPins = map.querySelector('.map__pins');
const mapPinMain = map.querySelector('.map__pin--main');
const mapFilters = map.querySelector('.map__filters-container');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const aptCapacity = adForm.querySelector('#capacity');
const capacityOption = aptCapacity.querySelectorAll('option');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const pinFragment = document.createDocumentFragment();
const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70,
  MAIN_WIDTH: 65,
  MAIN_HEIGHT: 65,
  MAIN_TIP: 19
};

const ROOMS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

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

const typeMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const setDisability = (arr, boolean) => {
  arr.forEach((element) => {
    element.disabled = boolean;
    return element;
  });
};

const fillAddressInput = (isActive) => {
  const adFormAddress = adForm.querySelector('input[name=address]');
  if (isActive) {
    adFormAddress.value = `${parseInt(mapPinMain.style.left, 10) + PinSize.MAIN_WIDTH / 2}, ${parseInt(mapPinMain.style.top, 10) + (PinSize.MAIN_HEIGHT + PinSize.MAIN_TIP)}`;
    return adFormAddress.value;
  }
  adFormAddress.value = `${parseInt(mapPinMain.style.left, 10) + PinSize.MAIN_WIDTH / 2}, ${parseInt(mapPinMain.style.top, 10) + PinSize.MAIN_HEIGHT / 2}`;
  return adFormAddress.value;
};

// Неактивное состояние

setDisability(adFormElement, true);
setDisability(mapFilter, true);
fillAddressInput(false);

// ------------------ //

const switchToActive = () => {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  setDisability(adFormElement, false);
  setDisability(mapFilter, false);
};

const onPinMouseDown = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
};

const onPinKeyDown = (evt) => {
  if (evt.key === 'Enter') {
    activatePage();
  }
};

const activatePage = () => {
  switchToActive();
  fillAddressInput(true);
  checkSelectedType();
  checkSelectedRoom();

  mapPins.appendChild(pinFragment);

  mapPinMain.removeEventListener('mousedown', onPinMouseDown);
  mapPinMain.removeEventListener('keydown', onPinKeyDown);
};

const checkTypePrice = (currentType) => {
  const minPrice = typeMinPrice[currentType.value];
  price.minLength = minPrice;
  price.placeholder = minPrice;
};

const checkSelectedType = () => {
  const typeOption = Array.from(type.querySelectorAll('option'));
  checkTypePrice(typeOption.find((element) => element.selected));
};

const onTypeChange = (evt) => {
  checkTypePrice(evt.target);
};

const checkTimeValue = (time) => {
  let timeOptions = time.name === 'timein' ? Array.from(timeOut.querySelectorAll('option')) : Array.from(timeIn.querySelectorAll('option'));

  const option = timeOptions.find((element) => {
    return element.value === time.value;
  });

  option.selected = true;
};

const onTimeChange = (evt) => {
  checkTimeValue(evt.target);
};

const checkRoomCapacity = (roomnum) => {
  const roomCapacity = ROOMS[roomnum.value];
  setDisability(capacityOption, true);

  roomCapacity.forEach((guest) => {
    capacityOption.forEach((option) => {
      let optNum = parseInt(option.value, 10);
      if (optNum === guest) {
        option.selected = true;
        option.disabled = false;
      }
    });
  });
};

const checkSelectedRoom = () => {
  const roomOptionArr = Array.from(roomNumber.querySelectorAll('option'));
  checkRoomCapacity(roomOptionArr.find((element) => element.selected));
};

const onRoomsChange = (evt) => {
  checkRoomCapacity(evt.target);
};

mapPinMain.addEventListener('mousedown', onPinMouseDown);
mapPinMain.addEventListener('keydown', onPinKeyDown);
type.addEventListener('change', onTypeChange);
timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);
roomNumber.addEventListener('change', onRoomsChange);

// --------------- //

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

const renderCard = (ad) => {
  const mapCard = map.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  }

  map.insertBefore(createCard(ad), mapFilters);
};

const createAd = (ad) => {
  const adPin = pinTemplate.cloneNode(true);
  const adImg = adPin.querySelector('img');

  adPin.style = `left: ${ad.location.x - PinSize.WIDTH / 2}px; top: ${ad.location.y - PinSize.HEIGHT}px;`;
  adImg.src = `${ad.author.avatar}`;
  adImg.alt = `${ad.offer.title}`;

  adPin.addEventListener('click', function () {
    renderCard(ad);
  });

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

  const popupClose = cardCopy.querySelector('.popup__close');

  const onPinEscPress = (evt) => {
    if (evt.key === 'Escape') {
      cardCopy.remove();
      document.removeEventListener('keydown', onPinEscPress);
    }
  };

  popupClose.addEventListener('click', function () {
    cardCopy.remove();
  });
  document.addEventListener('keydown', onPinEscPress);

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
