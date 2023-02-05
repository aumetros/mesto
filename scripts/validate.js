//Конфиг селекторов и классов валидации форм
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Функция скрытия сообщения об ошибке
const hideInputError = (errorElement, errorClass) => {
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция отображения сообщения об ошибке
const showInputError = (errorElement, input, errorClass) => {
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
};

//Функция проверки валидности формы и отображение ошибки
const checkInputValidity = (form, inputElement, config) => {
  const inputId = inputElement.id;
  const errorElement = form.querySelector(`.${inputId}-error`);

  if (inputElement.validity.valid) {
    hideInputError(errorElement, config.errorClass);
  } else {
    showInputError(errorElement, inputElement, config.errorClass);
  }
};

//Функция состояния кнопки при проверки валидности формы
const toggleButtonState = (form, config) => {
  const buttonElement = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(config.inactiveButtonClass, !isFormValid);
};

//Прописываем каждому полю проверку на валидность
const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach((item) => {
    item.addEventListener('input', function () {
      checkInputValidity(form, item, config);
    });
  });
};

//Объвляем функцию валидации на каждую форму на странице
function enableValidation(config) {

  //Ищем все формы с заданным классом
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  //Прописываем каждой форме валидацию полей и переключатель состояния кнопки
  formList.forEach((form) => {

    form.addEventListener('input', () => {
      toggleButtonState(form, config);
    });
    setEventListeners(form, config);
    
  });
}

//Запускаем валидацию форм
enableValidation(formValidationConfig);