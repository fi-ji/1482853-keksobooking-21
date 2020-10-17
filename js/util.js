'use strict';

(() => {
  const setDisability = (arr, boolean) => {
    arr.forEach((element) => {
      element.disabled = boolean;
    });
  };

  const getRandomNumBetween = (min, max) => Math.round(Math.random() * (max - min) + min);

  const fillFragment = (frag, list, amount, func) => {
    const takeNumber = list.length > amount ? amount : list.length;

    for (let i = 0; i < takeNumber; i++) {
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
