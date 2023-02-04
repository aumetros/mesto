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

const checkInputValidity = (event, form, config) => {
   const input = event.target;
   const inputId = input.id;
   const errorElement = form.querySelector(`.${inputId}-error`);
  if (input.validity.valid) {
    hideInputError(errorElement, config.errorClass);
  } else {
    showInputError(errorElement, input, config.errorClass);
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
      item.addEventListener('input', function (event) {
        checkInputValidity(event, form, config);        
    });
  });
};


//Объвляем 
function enableValidation(config) {
const form = document.querySelector(config.formSelector);

form.addEventListener('input', () => {
  toggleButtonState(form, config);
});

setEventListeners(form, config);
toggleButtonState(form, config);

}

enableValidation(formValidationConfig);