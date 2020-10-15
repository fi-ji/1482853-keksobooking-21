'use strict';

(() => {
  const main = document.querySelector('main');
  const map = document.querySelector('.map');
  const mapPinMain = map.querySelector('.map__pin--main');
  const mapFilter = document.querySelectorAll('.map__filter');
  const adForm = document.querySelector('.ad-form');
  const adFormElement = adForm.querySelectorAll('.ad-form__element');
  const type = adForm.querySelector('#type');
  const roomNumber = adForm.querySelector('#room_number');
  const successMessage = document.querySelector('#success').content.querySelector('.success');
  const errorMessage = document.querySelector('#error').content.querySelector('.error');

  const switchToView = (toActive, disability) => {
    if (toActive) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    } else {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
    }

    window.util.setDisability(adFormElement, disability);
    window.util.setDisability(mapFilter, disability);
  };

  const deactivatePage = () => {
    switchToView(false, true);

    window.pin.removePin();
    window.map.setMainPinStartCoords();
    window.form.fillAddressInput(false);

    adForm.removeEventListener('submit', window.form.onSubmit);
    adForm.removeEventListener('reset', window.form.formReset);
  };

  const activatePage = () => {
    switchToView(true, false);

    window.load.loadData(window.map.successHandler, window.map.errorHandler);

    window.form.fillAddressInput(true);
    window.form.checkTypePrice(type);
    window.form.checkRoomCapacity(roomNumber);

    mapPinMain.removeEventListener('mousedown', window.map.onPinMouseDown);
    mapPinMain.removeEventListener('keydown', window.map.onPinKeyDown);

    adForm.addEventListener('submit', window.form.onSubmit);
    adForm.addEventListener('reset', window.form.formReset);
  };

  const successHandler = () => {
    window.form.formReset();
    window.main.messageHandler(successMessage, onEscPressSuccess);
  };

  const errorHandler = () => {
    window.main.messageHandler(errorMessage, onEscPressError);
  };

  const messageHandler = (message, escPress) => {
    main.appendChild(message);
    message.addEventListener('click', () => {
      message.remove();
      document.removeEventListener('keydown', escPress);
    });
    document.addEventListener('keydown', escPress);
  };

  const onEscPressSuccess = (evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
    document.removeEventListener('keydown', onEscPressSuccess);
  };

  const onEscPressError = (evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
    document.removeEventListener('keydown', onEscPressError);
  };

  deactivatePage();

  window.main = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
    successHandler: successHandler,
    errorHandler: errorHandler,
    messageHandler: messageHandler
  };
})();
