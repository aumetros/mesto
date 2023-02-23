import {openPopup} from "./index.js";

// Выбираем элементы DOM фотографию и описание для просмотра
const imagePopup = document.querySelector('.popup-image');
const currentImage = imagePopup.querySelector('.popup-image__item');
const currentImageSubtitle = imagePopup.querySelector('.popup-image__subtitle');


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

  _handleImageClick() {
    currentImage.src = this._link;
    currentImage.alt = this._name;
    currentImageSubtitle.textContent = this._name;
    openPopup(imagePopup);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', function (evt) {    
      evt.target.classList.toggle('element__like-button_checked');
    });
    
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__foto').addEventListener('click', () => {
      this._handleImageClick();
    });   
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__foto').src = this._link;
    this._element.querySelector('.element__foto').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}