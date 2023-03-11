/**Селекторы*/
const containerSelector = '.elements';
const popupProfileSelector = '.popup-profile';
const popupWithImageSelector = '.popup-image';
const popupAddNewCardSelector = '.popup-newcard';

/**DOM элементы*/
const imagePopup = document.querySelector(".popup-image");
const currentImage = imagePopup.querySelector(".popup-image__item");
const currentImageSubtitle = imagePopup.querySelector(".popup-image__subtitle");

export {
  containerSelector,
  popupProfileSelector,
  popupWithImageSelector,
  popupAddNewCardSelector,
  currentImage,
  currentImageSubtitle
}