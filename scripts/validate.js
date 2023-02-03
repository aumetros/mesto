const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup-profile__input-error_type_active');
};

function enableValidation(config) {
const form = document.querySelector(config.formSelector);
console.log(form);
}

// enableValidation(formValidationConfig);