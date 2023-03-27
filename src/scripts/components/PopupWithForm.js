import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm, resetValidation }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._buttonText = this._popup.querySelector(".popup__button-text");
    this._spinner = this._popup.querySelector(".popup__button-spinner");
    this._inputList = this._form.querySelectorAll(".form-input");
    this._submitForm = submitForm;
    this._resetValidation = resetValidation;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._spinner.classList.add("popup__button-spinner_visible");
      this._buttonText.classList.add("popup__button-text_hidden");
    } else {
      this._buttonText.classList.remove("popup__button-text_hidden");
      this._spinner.classList.remove("popup__button-spinner_visible");
    }
  }

  close() {
    super.close();
    this._resetValidation();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      this._submitForm(this._getInputValues());
    });
  }
}
