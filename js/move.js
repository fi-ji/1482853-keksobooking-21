'use strict';

const map = document.querySelector('.map');
const mapPinMain = document.querySelector('.map__pin--main');

const PinSize = {
  WIDTH: mapPinMain.clientWidth,
  HEIGHT: mapPinMain.clientHeight + 19
};

const PinCoords = {
  MIN_X: 0,
  MAX_X: map.clientWidth,
  MIN_Y: 130,
  MAX_Y: 630
};

const movePin = (evt) => {
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    window.form.fillAddressInput(true);

    let pinOffsetX = mapPinMain.offsetLeft;
    let pinOffsetY = mapPinMain.offsetTop;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (pinOffsetX < PinCoords.MIN_X - PinSize.WIDTH / 2) {
      pinOffsetX = PinCoords.MIN_X - PinSize.WIDTH / 2;
    } else if (pinOffsetX > PinCoords.MAX_X - PinSize.WIDTH / 2) {
      pinOffsetX = PinCoords.MAX_X - PinSize.WIDTH / 2;
    }

    if (pinOffsetY < PinCoords.MIN_Y - PinSize.HEIGHT) {
      pinOffsetY = PinCoords.MIN_Y - PinSize.HEIGHT;
    } else if (pinOffsetY > PinCoords.MAX_Y - PinSize.HEIGHT) {
      pinOffsetY = PinCoords.MAX_Y - PinSize.HEIGHT;
    }

    mapPinMain.style.left = (pinOffsetX - shift.x) + 'px';
    mapPinMain.style.top = (pinOffsetY - shift.y) + 'px';
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

window.move = {
  movePin: movePin
};
