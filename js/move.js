'use strict';

const map = document.querySelector('.map');
const mapPinMain = document.querySelector('.map__pin--main');
const TIP_HEIGHT = 19;

const PinSize = {
  WIDTH: mapPinMain.clientWidth,
  HEIGHT: mapPinMain.clientHeight + TIP_HEIGHT
};

const PinCoords = {
  MIN_X: 0 - PinSize.WIDTH / 2,
  MAX_X: map.clientWidth - PinSize.WIDTH / 2,
  MIN_Y: 130 - PinSize.HEIGHT,
  MAX_Y: 630 - PinSize.HEIGHT
};

let isMouseDown = false;

const movePin = (evt) => {
  isMouseDown = true;

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let pinOffset = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  const shift = {
    x: startCoords.x - pinOffset.x,
    y: startCoords.y - pinOffset.y
  };

  const onMouseMove = (moveEvt) => {
    if (!isMouseDown) {
      return;
    }

    moveEvt.preventDefault();
    window.form.fillAddressInput(true);

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinOffset.x = startCoords.x - shift.x;
    pinOffset.y = startCoords.y - shift.y;

    if ((pinOffset.x < PinCoords.MIN_X) || (pinOffset.y < PinCoords.MIN_Y) || (pinOffset.x > PinCoords.MAX_X) || (pinOffset.y > PinCoords.MAX_Y)) {
      if (pinOffset.x < PinCoords.MIN_X) {
        pinOffset.x = PinCoords.MIN_X;
      }

      if (pinOffset.y < PinCoords.MIN_Y) {
        pinOffset.y = PinCoords.MIN_Y;
      }

      if (pinOffset.x > PinCoords.MAX_X) {
        pinOffset.x = PinCoords.MAX_X;
      }

      if (pinOffset.y > PinCoords.MAX_Y) {
        pinOffset.y = PinCoords.MAX_Y;
      }
    }

    mapPinMain.style.left = pinOffset.x + 'px';
    mapPinMain.style.top = pinOffset.y + 'px';
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    isMouseDown = false;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

window.move = {
  movePin
};
