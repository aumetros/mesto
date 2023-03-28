import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitForm = submitForm;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._card, this._cardId);
    });
  }
}
