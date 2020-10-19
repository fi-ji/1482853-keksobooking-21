'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapFilters = map.querySelector('.map__filters-container');
  const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  const accomodationType = {
    palace: 'Дворец',
    house: 'Дом',
    bungalow: 'Бунгало',
    flat: 'Квартира'
  };

  const renderFeatures = (card, templateCopy) => {
    const cardFeatures = templateCopy.querySelector('.popup__features');

    if (!card.offer.features.length) {
      cardFeatures.remove();
      return;
    }

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

    if (!card.offer.photos.length) {
      cardPhotos.remove();
      return;
    }

    cardPhoto.src = `${card.offer.photos[0]}`;

    for (let i = 1; i < card.offer.photos.length; i++) {
      let cardPhotoCopy = cardPhoto.cloneNode();
      cardPhotoCopy.src = `${card.offer.photos[i]}`;

      cardPhotos.appendChild(cardPhotoCopy);
    }
  };

  const createCard = (card) => {
    const capacityMessage = card.offer.rooms === 1 ? `${card.offer.rooms} комната для ` : `${card.offer.rooms} комнаты для `;
    const capacityMessage2 = card.offer.guests === 1 ? `${card.offer.guests} гостя` : `${card.offer.guests} гостей`;

    const cardCopy = cardTemplate.cloneNode(true);

    cardCopy.querySelector('.popup__avatar').src = `${card.author.avatar}`;
    cardCopy.querySelector('.popup__avatar').alt = `${card.offer.title}`;
    cardCopy.querySelector('.popup__title').textContent = `${card.offer.title}`;
    cardCopy.querySelector('.popup__text--address').textContent = `${card.offer.address}`;
    cardCopy.querySelector('.popup__text--price').textContent = `${card.offer.price}₽/ночь`;
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

  const renderCard = (ad) => {
    const mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }

    map.insertBefore(window.card.createCard(ad), mapFilters);
  };

  const removeCard = () => {
    const mapCard = map.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    createCard: createCard,
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
