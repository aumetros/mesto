import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitForm = submitForm;
  }

  open(cardId, card) {
    super.open();
    this.cardId = cardId;
    this.card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this.cardId, this.card);
      this.close();
    });
  }
}
