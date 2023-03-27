import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitForm = submitForm;
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  delete(card) {
    card.remove();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._cardId, this._card);
      this.close();
    });
  }
}
