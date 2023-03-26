export default class Card {
  constructor(
    data,
    templateSelector,
    { handleCardClick, generateCard, handleDeleteCard, handleLikeCard }
  ) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this.generateCard = generateCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  setEventListeners() {
    this._likeButton
      .addEventListener("click", this._handleLikeCard);

    this._element
      .querySelector(".element__trash-button")
      .addEventListener("click", () => this._handleDeleteCard(this._id, this._element));

    this._elementFoto.addEventListener("click", (evt) =>
      this._handleCardClick(evt)
    );
  }
}
