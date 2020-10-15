'use strict';

(() => {
  const mapPinMain = document.querySelector('.map__pin--main');
  const adForm = document.querySelector('.ad-form');
  const type = adForm.querySelector('#type');
  const price = adForm.querySelector('#price');
  const timeIn = adForm.querySelector('#timein');
  const timeOut = adForm.querySelector('#timeout');
  const roomNumber = adForm.querySelector('#room_number');
  const aptCapacity = adForm.querySelector('#capacity');
  const capacityOption = aptCapacity.querySelectorAll('option');

  const ROOMS = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const typeMinPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    TIP: 19
  };

  const fillAddressInput = (isActive) => {
    const adFormAddress = adForm.querySelector('input[name=address]');

    adFormAddress.value = isActive
      ? `${parseInt(mapPinMain.style.left, 10) + Math.floor(MainPinSize.WIDTH / 2)}, ${parseInt(mapPinMain.style.top, 10) + (MainPinSize.HEIGHT + MainPinSize.TIP)}`
      : `${parseInt(mapPinMain.style.left, 10) + Math.floor(MainPinSize.WIDTH / 2)}, ${parseInt(mapPinMain.style.top, 10) + MainPinSize.HEIGHT / 2}`;
  };

  const checkTypePrice = (currentType) => {
    const minPrice = typeMinPrice[currentType.value];
    price.minLength = minPrice;
    price.placeholder = minPrice;
  };

  const onTypeChange = (evt) => {
    checkTypePrice(evt.target);
  };

  const checkTimeValue = (time) => {
    if (time.name === 'timein') {
      timeOut.value = time.value;
    } else {
      timeIn.value = time.value;
    }
  };

  const onTimeChange = (evt) => {
    checkTimeValue(evt.target);
  };

  const checkRoomCapacity = (roomnum) => {
    const roomCapacity = ROOMS[roomnum.value];
    window.util.setDisability(capacityOption, true);

    roomCapacity.forEach((guest) => {
      capacityOption.forEach((option) => {
        let optNum = parseInt(option.value, 10);
        if (optNum === guest) {
          option.selected = true;
          option.disabled = false;
        }
      });
    });
  };

  const onRoomsChange = (evt) => {
    checkRoomCapacity(evt.target);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    window.load.uploadData(new FormData(adForm), window.main.successHandler, window.main.errorHandler);
  };

  const formReset = () => {
    adForm.reset();
    window.main.deactivatePage();
    mapPinMain.addEventListener('mousedown', window.map.onPinMouseDown);
    mapPinMain.addEventListener('keydown', window.map.onPinKeyDown);
  };

  type.addEventListener('change', onTypeChange);
  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);
  roomNumber.addEventListener('change', onRoomsChange);

  window.form = {
    fillAddressInput: fillAddressInput,
    checkTypePrice: checkTypePrice,
    checkRoomCapacity: checkRoomCapacity,
    onSubmit: onSubmit,
    formReset: formReset
  };
})();
