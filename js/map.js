'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = map.querySelector('.map__pins');
  const pinFragment = document.createDocumentFragment();

  const MAX_SIMILAR_AD_COUNT = 8;

  const successHandler = (adList) => {
    window.util.fillFragment(pinFragment, adList, MAX_SIMILAR_AD_COUNT, window.pin.createAd);
    mapPins.appendChild(pinFragment);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement('div');
    node.style = 'z-index: 100; width: 100%; margin: 0 auto; padding: 20px; text-align: center; background-color: rgba(255, 86, 53, 0.7); color: white';
    node.style.position = 'absolute';
    node.style.bottom = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    map.insertAdjacentElement('beforeend', node);
  };

  window.map = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    pinFragment: pinFragment
  };
})();
