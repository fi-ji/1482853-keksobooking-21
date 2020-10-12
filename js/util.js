'use strict';

(() => {
  const setDisability = (arr, boolean) => {
    arr.forEach((element) => {
      element.disabled = boolean;
      return element;
    });
  };

  const getRandomNumBetween = (min, max) => Math.round(Math.random() * (max - min) + min);

  const fillFragment = (frag, list, amount, func) => {
    for (let i = 0; i < amount; i++) {
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
