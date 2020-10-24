'use strict';

const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const createAd = (ad) => {
  const adPin = pinTemplate.cloneNode(true);
  const adImg = adPin.querySelector('img');

  adPin.style = `left: ${ad.location.x - PinSize.WIDTH / 2}px; top: ${ad.location.y - PinSize.HEIGHT}px;`;
  adImg.src = `${ad.author.avatar}`;
  adImg.alt = `${ad.offer.title}`;

  adPin.addEventListener('click', () => {
    window.card.renderCard(ad);
  });

  return adPin;
};

const removePin = () => {
  document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach((element) => {
    element.remove();
  });
};

window.pin = {
  createAd,
  removePin
};
