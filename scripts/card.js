export default class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // _handleClosePopup() {
    
  // }

  // _handleOpenPopup() {
  //   imagePopup.classList.add('popup_opened');
  //   document.addEventListener('keydown', closePopupEsc);
  // }

  // _handleImageClick() {
  //   currentImage.src = this._link;
  //   currentImage.alt = this._name;
  //   currentImageSubtitle.textContent = this._name;
  //   openPopup(imagePopup);
  // }

  // _setEventListeners() {
  //   const cardFoto = this._element.querySelector('.element__foto');

  //   cardFoto.addEventListener('click', () => {
  //     handleImageClick();
  //   })
  // }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__foto').src = this._link;
    this._element.querySelector('.element__foto').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}