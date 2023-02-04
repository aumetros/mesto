const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const hideInputError = (errorElement, errorClass) => {
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const showInputError = (errorElement, input, errorClass) => {
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
};

const checkInputValidity = (form, inputElement, config) => {
  const inputId = inputElement.id;
  const errorElement = form.querySelector(`.${inputId}-error`);
  if (inputElement.validity.valid) {
    hideInputError(errorElement, config.errorClass);
  } else {
    showInputError(errorElement, inputElement, config.errorClass);
  }
};

const toggleButtonState = (form, config) => {
  const buttonElement = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((item) => {
    item.addEventListener('input', function () {
      checkInputValidity(form, item, config);
    });
  });
};


//Объвляем функцию валидации
function enableValidation(config) {

  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('input', () => {
      toggleButtonState(form, config);
    });
    setEventListeners(form, config);
    toggleButtonState(form, config);
  });

  // const form = document.querySelector(config.formSelector);



}

enableValidation(formValidationConfig);