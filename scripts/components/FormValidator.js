export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  _toggleButtonState() {
    const isFormValid = this._form.checkValidity();
    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(
      this._config.inactiveButtonClass,
      !isFormValid
    );
  }

  _hideInputError(errorElement) {
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _showInputError(errorElement, input) {
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = input.validationMessage;
  }

  _checkInputValidity(item) {
    const inputId = item.id;
    const errorElement = this._form.querySelector(`.${inputId}-error`);

    if (item.validity.valid) {
      this._hideInputError(errorElement);
    } else {
      this._showInputError(errorElement, item);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );

    inputList.forEach((item) => {
      item.addEventListener("input", () => {
        this._checkInputValidity(item);
        this._toggleButtonState();
      });
    });
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "");
  }

  resetErrorInput() {
    const errorInputList = this._form.querySelectorAll(`.${this._config.inputErrorClass}`);
    errorInputList.forEach((errorInput) => {
      this._hideInputError(errorInput);      
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}