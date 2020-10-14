'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPinMain = map.querySelector('.map__pin--main');
  const mapFilter = document.querySelectorAll('.map__filter');
  const adForm = document.querySelector('.ad-form');
  const adFormElement = adForm.querySelectorAll('.ad-form__element');
  const type = adForm.querySelector('#type');
  const roomNumber = adForm.querySelector('#room_number');

  const switchToActiveView = () => {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.util.setDisability(adFormElement, false);
    window.util.setDisability(mapFilter, false);
  };

  const deactivatePage = () => {
    window.util.setDisability(adFormElement, true);
    window.util.setDisability(mapFilter, true);
    window.form.fillAddressInput(false);
  };

  const activatePage = () => {
    switchToActiveView();

    window.load.loadData(window.map.successHandler, window.map.errorHandler);

    window.form.fillAddressInput(true);
    window.form.checkTypePrice(type);
    window.form.checkRoomCapacity(roomNumber);

    mapPinMain.removeEventListener('mousedown', onPinMouseDown);
    mapPinMain.removeEventListener('keydown', onPinKeyDown);
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

  deactivatePage();

  mapPinMain.addEventListener('mousedown', onPinMouseDown);
  mapPinMain.addEventListener('keydown', onPinKeyDown);

  mapPinMain.addEventListener('mousedown', (evt) => {
    if (evt.button === 0) {
      window.move.movePin(evt);
    }
  });
})();
