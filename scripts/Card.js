import {OpenImagePopup} from "./index.js";

export default class Card {
  constructor(link, name, templateSelector) {
    this._link = link;
    this._name = name;
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

  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__like-button_checked');
  }

  _handleDeleteCard(evt) {
    const currentCard = evt.target.closest('.element');
    currentCard.remove();
  }

  _handleImageClick(evt) {
    const name = evt.target.alt;
    const link = evt.target.src;
    OpenImagePopup(name, link);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeCard);
    
    this._element.querySelector('.element__trash-button').addEventListener('click', this._handleDeleteCard);

    this._element.querySelector('.element__foto').addEventListener('click', this._handleImageClick);   
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