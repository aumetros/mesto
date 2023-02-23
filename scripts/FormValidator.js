export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _toggleButtonState() {
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    const isFormValid = this._form.checkValidity();
    buttonElement.disabled = !isFormValid;
    buttonElement.classList.toggle(this._config.inactiveButtonClass, !isFormValid);
  }

  _hideInputError(errorElement, errorClass) {
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _showInputError(errorElement, input, errorClass) {
    errorElement.classList.add(errorClass);
    errorElement.textContent = input.validationMessage;
  }

  _checkInputValidity(item) {
    const inputId = item.id;
    const errorElement = this._form.querySelector(`.${inputId}-error`);

    if (item.validity.valid) {
      this._hideInputError(errorElement, this._config.errorClass);
    } else {
      this._showInputError(errorElement, item, this._config.errorClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

    inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._checkInputValidity(item);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('input', () => {
    this._toggleButtonState();
    })

    this._setEventListeners();
  }
}