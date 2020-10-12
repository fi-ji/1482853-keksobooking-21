'use strict';

(() => {
  const MOCK = {
    type: ['palace', 'flat', 'house', 'bungalow'],
    checkinout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  const generateRandomData = (mockObj, amount) => {
    const avatarArr = Array.from({ length: amount }, (element, index) => {
      let num = index + 1;
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    });

    const ads = [];

    for (let i = 0; i < amount; i++) {
      let locationX = window.util.getRandomNumBetween(25, 1175);
      let locationY = window.util.getRandomNumBetween(130, 630);
      let roomsNum = window.util.getRandomNumBetween(1, 3);

      let ad = {
        author: {
          avatar: `img/avatars/user${avatarArr.splice(window.util.getRandomNumBetween(0, avatarArr.length - 1), 1)}.png`
        },
        location: {
          x: locationX,
          y: locationY
        },
        offer: {
          title: 'Милая, уютная квартирка в центре Токио',
          address: `${locationX}, ${locationY}`,
          price: `${window.util.getRandomNumBetween(4000, 15600)}₽/ночь`,
          type: mockObj.type[window.util.getRandomNumBetween(0, mockObj.type.length - 1)],
          rooms: roomsNum,
          guests: roomsNum < 2 ? window.util.getRandomNumBetween(1, 2) : window.util.getRandomNumBetween(3, 5),
          checkin: mockObj.checkinout[window.util.getRandomNumBetween(0, mockObj.checkinout.length - 1)],
          checkout: mockObj.checkinout[window.util.getRandomNumBetween(0, mockObj.checkinout.length - 1)],
          features: mockObj.features.slice(0, window.util.getRandomNumBetween(1, mockObj.features.length)),
          description: 'Уютная, чистая квартира со всей необходимой мебелью и техникой. На собственной кухне можно приготовить или разогреть еду. Чай, кофе, каша, макароны и масло есть всегда. До центра около 10 минут пешком.',
          photos: mockObj.photos.slice(0, window.util.getRandomNumBetween(1, mockObj.photos.length))
        }
      };

      ads.push(ad);
    }
    return ads;
  };

  const adsList = generateRandomData(MOCK, 8);
})();
