'use strict';

const map = document.querySelector('.map');
const mapPinMain = map.querySelector('.map__pin--main');

const MainPinCoords = {
  X: mapPinMain.style.left,
  Y: mapPinMain.style.top
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
  setMainPinStartCoords,
  onPinMouseDown,
  onPinKeyDown
};
