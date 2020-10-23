'use strict';

const DEBOUNCE_INTERVAL = 500; // ms

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

const includesAll = (arr, fromArr) => fromArr.every((item) => arr.includes(item));

const debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {
  setDisability: setDisability,
  getRandomNumBetween: getRandomNumBetween,
  fillFragment: fillFragment,
  includesAll: includesAll,
  debounce: debounce
};
