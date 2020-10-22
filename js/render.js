'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = map.querySelector('.map__pins');
  const mapFilters = map.querySelector('.map__filters');
  const pinFragment = document.createDocumentFragment();

  let dataCopy = [];

  const renderAds = (ads) => {
    window.pin.removePin();

    const filteredAds = window.filter.applyAllFilters(ads);

    window.util.fillFragment(pinFragment, filteredAds, window.pin.createAd);
    mapPins.appendChild(pinFragment);
  };

  const successHandler = (data) => {
    dataCopy = data;
    renderAds(dataCopy);
  };

  const errorHandler = (errorMessage) => {
    let node = document.createElement('div');
    node.style = 'z-index: 100; width: 100%; margin: 0 auto; padding: 20px; text-align: center; background-color: rgba(255, 86, 53, 0.7); color: white';
    node.style.position = 'absolute';
    node.style.bottom = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    map.insertAdjacentElement('beforeend', node);
  };

  mapFilters.addEventListener('change', window.util.debounce(() => {
    window.card.removeCard();
    renderAds(dataCopy);
  }));

  window.render = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
