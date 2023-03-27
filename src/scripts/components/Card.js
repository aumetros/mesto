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

  _generateCard() {
    card._element = card.getTemplate();
    card._elementFoto = card._element.querySelector(".element__foto");
    card._elementFoto.src = card._link;
    card._elementFoto.alt = card._name;

    card._trashButton = card._element.querySelector(".element__trash-button");
    card._likeButton = card._element.querySelector(".element__like-button");
    card._counter = card._element.querySelector(".element__like-counter");

    card._element.querySelector(".element__title").textContent = card._name;
    card._counter.textContent = card._likes.length;

    if (isLiked(card._likes, getId())) {
      card._likeButton.classList.toggle("element__like-button_checked");
    }

    renderTrashButton(card._ownerId, card._trashButton);

    card.setEventListeners();

    return card._element;
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
