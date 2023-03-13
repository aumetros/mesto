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
    super.close();
    this._resetValidation();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }
}
