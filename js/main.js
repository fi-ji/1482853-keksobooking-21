'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = map.querySelector('.map__pins');
  const mapPinMain = map.querySelector('.map__pin--main');
  const mapFilter = document.querySelectorAll('.map__filter');
  const adForm = document.querySelector('.ad-form');
  const adFormElement = adForm.querySelectorAll('.ad-form__element');
  const type = adForm.querySelector('#type');
  const roomNumber = adForm.querySelector('#room_number');

  const deactivatePage = () => {
    window.util.setDisability(adFormElement, true);
    window.util.setDisability(mapFilter, true);
    window.form.fillAddressInput(false);
  };

  const switchToActive = () => {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.util.setDisability(adFormElement, false);
    window.util.setDisability(mapFilter, false);
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
    window.form.fillAddressInput(true);
    window.form.checkTypePrice(type);
    window.form.checkRoomCapacity(roomNumber);

    mapPins.appendChild(window.map.pinFragment);

    mapPinMain.removeEventListener('mousedown', onPinMouseDown);
    mapPinMain.removeEventListener('keydown', onPinKeyDown);
  };

  deactivatePage();
  mapPinMain.addEventListener('mousedown', onPinMouseDown);
  mapPinMain.addEventListener('keydown', onPinKeyDown);
})();
