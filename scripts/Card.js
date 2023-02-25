import {openImagePopup} from "./index.js";

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

  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__like-button_checked');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleImageClick(evt) {
    const name = evt.target.alt;
    const link = evt.target.src;
    openImagePopup(name, link);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeCard);
    
    this._element.querySelector('.element__trash-button').addEventListener('click', () => this._handleDeleteCard());

    this._elementFoto.addEventListener('click', this._handleImageClick);   
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementFoto = this._element.querySelector('.element__foto');

    this._elementFoto.src = this._link;
    this._elementFoto.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}