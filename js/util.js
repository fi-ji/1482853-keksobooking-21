'use strict';

(() => {
  const setDisability = (arr, boolean) => {
    arr.forEach((element) => {
      element.disabled = boolean;
    });
  };

  const getRandomNumBetween = (min, max) => Math.round(Math.random() * (max - min) + min);

  const fillFragment = (frag, list, func) => {
    for (let i = 0; i < list.length; i++) {
      frag.appendChild(func(list[i]));
    }
    return frag;
  };

  window.util = {
    setDisability: setDisability,
    getRandomNumBetween: getRandomNumBetween,
    fillFragment: fillFragment
  };
})();
