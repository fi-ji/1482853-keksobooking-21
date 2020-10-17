'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = map.querySelector('.map__pins');
  const mapFilters = map.querySelector('.map__filters');
  const housingType = mapFilters.querySelector('#housing-type');
  const pinFragment = document.createDocumentFragment();

  const MAX_SIMILAR_AD_COUNT = 5;

  let apType;
  let dataCopy = [];

  const renderAds = (ads) => {
    window.pin.removePin();
    window.util.fillFragment(pinFragment, ads, MAX_SIMILAR_AD_COUNT, window.pin.createAd);
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

  const findSameTypeApartments = () => {
    const sameTypeApartments = dataCopy.filter((ad) => {
      return ad.offer.type === apType;
    });

    let finalAds = apType === 'any' ? dataCopy : sameTypeApartments;

    renderAds(finalAds);
  };

  housingType.addEventListener('change', (evt) => {
    window.card.removeCard();
    apType = evt.target.value;
    findSameTypeApartments();
  });

  window.render = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
