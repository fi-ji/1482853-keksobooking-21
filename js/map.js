'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = map.querySelector('.map__pins');
  const mapPinMain = map.querySelector('.map__pin--main');
  const pinFragment = document.createDocumentFragment();

  const MainPinCoords = {
    X: mapPinMain.style.left,
    Y: mapPinMain.style.top
  };

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

  const setMainPinStartCoords = () => {
    mapPinMain.style.left = MainPinCoords.X;
    mapPinMain.style.top = MainPinCoords.Y;
  };

  const onPinMouseDown = (evt) => {
    if (evt.button === 0) {
      window.main.activatePage();
    }
  };

  const onPinKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      window.main.activatePage();
    }
  };

  mapPinMain.addEventListener('mousedown', onPinMouseDown);
  mapPinMain.addEventListener('keydown', onPinKeyDown);
  mapPinMain.addEventListener('mousedown', (evt) => {
    if (evt.button === 0) {
      window.move.movePin(evt);
    }
  });

  window.map = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    setMainPinStartCoords: setMainPinStartCoords,
    onPinMouseDown: onPinMouseDown,
    onPinKeyDown: onPinKeyDown,
    pinFragment: pinFragment
  };
})();
