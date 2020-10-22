'use strict';

(() => {
  const mapFilters = document.querySelector('.map__filters');
  const housingType = mapFilters.querySelector('#housing-type');
  const housingPrice = mapFilters.querySelector('#housing-price');
  const housingRooms = mapFilters.querySelector('#housing-rooms');
  const housingGuests = mapFilters.querySelector('#housing-guests');
  const housingFeatures = mapFilters.querySelector('#housing-features');

  const MAX_SIMILAR_AD_COUNT = 5;

  const findHousingType = (element) => {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };

  const findHousingPrice = (element) => {
    let price;

    switch (true) {
      case element.offer.price < 10000:
        price = 'low';
        break;

      case element.offer.price > 50000:
        price = 'high';
        break;

      default:
        price = 'middle';
        break;
    }

    return housingPrice.value === 'any' ? true : price === housingPrice.value;
  };

  const findHousingRooms = (element) => {
    return housingRooms.value === 'any' ? true : element.offer.rooms === parseInt(housingRooms.value, 10);
  };

  const findHousingGuests = (element) => {
    return housingGuests.value === 'any' ? true : element.offer.guests === parseInt(housingGuests.value, 10);
  };

  const findHousingFeatures = (element) => {
    let checkedBoxes = housingFeatures.querySelectorAll('.map__checkbox:checked');
    let checkedBoxesValue = [];

    checkedBoxes.forEach((checkbox) => {
      checkedBoxesValue.push(checkbox.value);
    });

    return window.util.includesAll(element.offer.features, checkedBoxesValue);
  };

  const applyAllFilters = (data) => {
    return data
      .filter((element) => {
        return (
          findHousingType(element)
          && findHousingPrice(element)
          && findHousingRooms(element)
          && findHousingGuests(element)
          && findHousingFeatures(element)
        );
      })
      .slice(0, MAX_SIMILAR_AD_COUNT);
  };

  window.filter = {
    applyAllFilters: applyAllFilters
  };
})();
