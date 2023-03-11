/**Импортируем переменные */
import {
  containerSelector,
  currentImage,
  currentImageSubtitle
} from "../scripts/utils/constants.js";

/**Импортируем модули карточки, готовых карточек и валидации форм. */
import { initialCards } from "../scripts/components/initialCards.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/popupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

/**Конфигуратор селекторов и классов для валидации форм */
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

const nameInput = popupProfile.querySelector(".popup-profile__input_type_name");
const aboutInput = popupProfile.querySelector(".popup-profile__input_type_about");

// Выбираем элемент DOM - форма отправки изменения данных профайла
const formProfileEdit = popupProfile.querySelector(".popup__form-profile-edit");

//Выбираем элементы DOM контейнеры для карточек и фотографии
const cardsContainer = document.querySelector(".elements");

const cardAddButton = profile.querySelector(".profile__add-button");

const popupNewCard = document.querySelector(".popup-newcard");
const formNewCardAdd = popupNewCard.querySelector(".popup-newcard__form-card-add");

/**Создаем экземпляры попапов */
const popupProfileEdit = new PopupWithForm('.popup-profile', {
  formSubmit: () => {
    const data = popupProfileEdit._getInputValues();
    userInfo.setUserInfo(data);
  },
  resetValidation: () => {
    formProfileEditValidator.resetErrorInput();
  }
});

const popupCardSubmit = new PopupWithForm('.popup-newcard', {
  formSubmit: () => {
    const data = popupCardSubmit._getInputValues();
    const newCard = createNewCard(data);
    cardsContainer.prepend(newCard);
  },
  resetValidation: () => {
    formCardSubmitValidator.resetErrorInput();
    formCardSubmitValidator.disableSubmitButton();
  }
});

const popupWithImage = new PopupWithImage('.popup-image', {
  fillImagePopup: (name, link) => {
    currentImage.src = link;
    currentImage.alt = name;
    currentImageSubtitle.textContent = name;
  },
});

/**Создаем экземпляр валидации формы каждого попа для обращения к публичным методам */
const formProfileEditValidator = new FormValidator(
  configValidation,
  formProfileEdit
);

const formCardSubmitValidator = new FormValidator(
  configValidation,
  formNewCardAdd
);

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__about'
});

/**Функция открытия формы редактирования данных профайла */
function openProfileEditPopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;  
  formProfileEditValidator.resetErrorInput();
  popupProfileEdit.open();
}

/**Устанавливаем слушатели на попапы */
popupProfileEdit.setEventListeners();
popupCardSubmit.setEventListeners();
popupWithImage.setEventListeners();

/**Функция создания новой карточки */
function createNewCard(data) {
  const card = new Card(data, "#card", {
    handleCardClick: (evt) =>{
      const name = evt.target.alt;
      const link = evt.target.src;
      popupWithImage.open(name, link);
    }
   });
  const newElement = card.generateCard();
  return newElement;
}

/**Добавляем на страницу карточки по умолчанию */
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createNewCard(item);
      defaultCardList.addItem(cardElement);
    },
  },
  containerSelector
);

defaultCardList.renderItems();

//Устанавливаем валидацию на каждую форму
formProfileEditValidator.enableValidation();
formCardSubmitValidator.enableValidation();

//Устанавливаем слушатель события на кнопку открытия формы редактирования профайла
profileEditButton.addEventListener("click", () => openProfileEditPopup());

//Устанавливаем событие на кнопку открытия формы добавления карты
cardAddButton.addEventListener("click", () => popupCardSubmit.open());