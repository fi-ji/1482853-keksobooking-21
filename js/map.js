'use strict';

(() => {
  const pinFragment = document.createDocumentFragment();

  window.util.fillFragment(pinFragment, window.data.adsList, window.pin.createAd);

  window.map = {
    pinFragment: pinFragment
  };
})();
