import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmit, resetValidation }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._formSubmit = formSubmit;
    this._resetValidation = resetValidation;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".form-input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._resetValidation();
    this._form.reset();
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      } else if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit();
      this.close();
    });
  }
}
