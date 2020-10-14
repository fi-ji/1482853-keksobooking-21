'use strict';

(() => {
  const URL_DATA = 'https://21.javascript.pages.academy/keksobooking/data';
  const URL = 'https://21.javascript.pages.academy/keksobooking';
  const TIMEOUT_IN_MS = 10000;
  const Code = {
    SUCCESS: 200,
    ERROR_BAD_REQUEST: 400,
    ERROR_UNAUTHORIZED: 401,
    ERROR_NOT_FOUND: 404
  };

  const eventHandler = (xhr, onSuccess, onError) => {
    xhr.addEventListener('load', () => {
      let error;

      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;

        case Code.ERROR_BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case Code.ERROR_UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Code.ERROR_NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  const loadData = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    eventHandler(xhr, onSuccess, onError);

    xhr.open('GET', URL_DATA);
    xhr.send();
  };

  const uploadData = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    eventHandler(xhr, onSuccess, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = {
    loadData: loadData,
    uploadData: uploadData
  };
})();
