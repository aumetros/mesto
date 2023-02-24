//Импортируем модули карточки, готовых карточек и валидации форм.
import Card from "./Card.js";
import { initialCards } from "./initialCards.js";
import FormValidator from "./FormValidator.js";

//Конфигуратор селекторов и классов для валидации форм
const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Выбираем элементы DOM - Кнопки открытия и закрытия формы редактирования профайла
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");

const popupProfile = document.querySelector(".popup-profile");

const nameProfile = profile.querySelector(".profile__name");
const aboutProfile = profile.querySelector(".profile__about");

const nameInput = popupProfile.querySelector(".popup-profile__input_type_name");
const aboutInput = popupProfile.querySelector(".popup-profile__input_type_about");

// Выбираем элемент DOM - форма отправки изменения данных профайла
const formProfileEdit = popupProfile.querySelector(".popup__form-profile-edit");

//Выбираем элементы DOM контейнеры для карточек и фотографии
const cardsContainer = document.querySelector(".elements");

const cardAddButton = profile.querySelector(".profile__add-button");

const popupNewCard = document.querySelector(".popup-newcard");
const formNewCardAdd = popupNewCard.querySelector(".popup-newcard__form-card-add");

const nameNewCardInput = formNewCardAdd.querySelector(".popup-newcard__input_type_name");
const linkNewCardInput = formNewCardAdd.querySelector(".popup-newcard__input_type_link");

const popupList = document.querySelectorAll(".popup");

const imagePopup = document.querySelector(".popup-image");
const currentImage = imagePopup.querySelector(".popup-image__item");
const currentImageSubtitle = imagePopup.querySelector(".popup-image__subtitle");

const formList = Array.from(
  document.querySelectorAll(configValidation.formSelector)
);

//Функция закрытия попапа при нажатии Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//Функция открытия попапа и установки слушателя Esc
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапа и снятия слушателя Esc
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

//Функция открытия формы редактирования данных профайла
function openProfileEditPopup() {
  nameInput.value = nameProfile.innerText;
  aboutInput.value = aboutProfile.innerText;
  openPopup(popupProfile);

  const validationItem = handleValidation(formProfileEdit);
  validationItem.resetErrorInput();
}

// Функция отправки изменений данных профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopup(popupProfile);
}

//Функция создания новой карточки
function createNewCard(data) {
  const card = new Card(data, "#card");
  const newElement = card.generateCard();
  return newElement;
}

//Функция добавления новой карточки в контейнер
function handleCardFormSubmit() {
  const data = {};
  data.link = linkNewCardInput.value;
  data.name = nameNewCardInput.value;

  const newCard = createNewCard(data);
  cardsContainer.prepend(newCard);
}

//Создаем карточки из предварительного списка
initialCards.forEach((item) => {
  const newCard = createNewCard(item);
  cardsContainer.append(newCard);
});

//Обработчик события при клике на картинку - открытие просмотра
function OpenImagePopup(name, link) {
  currentImage.src = link;
  currentImage.alt = name;
  currentImageSubtitle.textContent = name;
  openPopup(imagePopup);
}

//Функция валидации формы
function handleValidation(form) {
  const validationData = new FormValidator(configValidation, form);
  return validationData;
}

//Устанавливаем валидацию на каждую форму
formList.forEach((form) => {
  const validationItem = handleValidation(form);
  validationItem.enableValidation();
});

//Устанавливаем для каждого попапа слушатели клика по оверлею и кнопке закрытия
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    } else if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//Устанавливаем слушатель события на кнопку открытия формы редактирования профайла
profileEditButton.addEventListener("click", openProfileEditPopup);

//Устанавливаем событие на кнопку отправки новых данных профайла
formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

//Устанавливаем событие на кнопку открытия формы добавления карты
cardAddButton.addEventListener("click", () => openPopup(popupNewCard));

//Устанавливаем событие на форму отправки новой карточки, блокируем кнопку отправки, очищаем форму и закрываем попап
formNewCardAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  handleCardFormSubmit();

  const submitButton = handleValidation(formNewCardAdd);
  submitButton.disableSubmitButton();

  formNewCardAdd.reset();
  closePopup(popupNewCard);
});

export { openPopup, OpenImagePopup };
