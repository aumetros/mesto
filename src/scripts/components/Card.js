export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    { handleCardClick, handleDeleteCard, handleLikeCard }
  ) {
    this._link = data.link;
    this._name = data.name;
    this.userId = userId;
    this.cardId = data._id;
    this.likes = data.likes;
    this._cardOwnerId = data.owner._id;    
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _renderTrashButton(cardOwnerId, userId) {
    if (cardOwnerId === userId) {
      this._trashButton.classList.add("element__trash-button_showed");
    }
    return;
  }

  isLiked(cardLikes, userId) {
    return cardLikes.some((like) => {
      return like._id === userId;
    });
  }

  switchLike(evt, likes) {
      this.likes = likes;
      this._counter.textContent = likes.length;
      evt.target.classList.toggle("element__like-button_checked");
  }

  _renderLiked() {
    if (this.isLiked(this.likes, this.userId)) {
      this._likeButton.classList.toggle("element__like-button_checked");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementFoto = this._element.querySelector(".element__foto");
    this._elementFoto.src = this._link;
    this._elementFoto.alt = this._name;

    this._trashButton = this._element.querySelector(".element__trash-button");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._counter = this._element.querySelector(".element__like-counter");

    this._element.querySelector(".element__title").textContent = this._name;
    this._counter.textContent = this.likes.length;

    this._renderLiked();

    this._renderTrashButton(this._cardOwnerId, this.userId);

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeCard);

    this._element
      .querySelector(".element__trash-button")
      .addEventListener("click", () =>
        this._handleDeleteCard(this.cardId, this._element)
      );

    this._elementFoto.addEventListener("click", (evt) =>
      this._handleCardClick(evt)
    );
  }
}
