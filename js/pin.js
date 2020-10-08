'use strict';

(() => {
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

    adPin.addEventListener('click', function () {
      window.card.renderCard(ad);
    });

    return adPin;
  };

  window.pin = {
    createAd: createAd
  };
})();
