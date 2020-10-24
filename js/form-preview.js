'use strict';

const adForm = document.querySelector('.ad-form');
const avatarFileChooser = adForm.querySelector('.ad-form-header__input');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const photoContainer = adForm.querySelector('.ad-form__photo-container');
const photoFileChooser = adForm.querySelector('.ad-form__input');
const photoPreview = adForm.querySelector('.ad-form__photo');
const photoFragment = document.createDocumentFragment();

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

photoFileChooser.addEventListener('change', () => {
  const files = Array.from(photoFileChooser.files);
  const fileNames = [];

  files.forEach((file) => fileNames.push(file.name.toLowerCase()));

  const matches = fileNames.every((file) => FILE_TYPES.some((type) => file.endsWith(type)));

  if (matches) {
    photoPreview.remove();

    files.forEach((file) => {
      const reader = new FileReader();
      let photoPreviewCopy = photoPreview.cloneNode(true);

      reader.addEventListener('load', () => {
        photoPreviewCopy.innerHTML = `<img src='${reader.result}' width='40' height='44' alt='Фотография жилья'>`;
      });

      reader.readAsDataURL(file);

      photoFragment.appendChild(photoPreviewCopy);
    });

    photoContainer.appendChild(photoFragment);
  }
});
