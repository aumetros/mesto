export default class Card {
  constructor(data, templateSelector, { handleCardClick, generateCard }) {
    this._link = data.link;
    this._name = data.name;
    this.id = data._id;
    this.ownerId = data.owner._id;
    this.likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this.generateCard = generateCard;
  }

  getTemplate() {
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
    this.element.remove();
  }

  setEventListeners() {
    this.element.querySelector('.element__like-button').addEventListener('click', this._handleLikeCard);
    
    this.element.querySelector('.element__trash-button').addEventListener('click', () => this._handleDeleteCard());

    this.elementFoto.addEventListener('click', (evt) => this._handleCardClick(evt));   
  }
}