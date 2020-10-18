'use strict';

(() => {
  const mapFilters = document.querySelector('.map__filters');
  const housingType = mapFilters.querySelector('#housing-type');

  const MAX_SIMILAR_AD_COUNT = 5;

  const findSameHousingTypes = (element) => {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };

  const applyAllFilters = (data) => {
    return data
      .filter((element) => {
        return findSameHousingTypes(element);
      })
      .slice(0, MAX_SIMILAR_AD_COUNT);
  };

  window.filter = {
    applyAllFilters: applyAllFilters
  };
})();
