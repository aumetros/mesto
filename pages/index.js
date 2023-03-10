/**Импортируем переменные */
import {
  containerSelector,
  popupProfileSelector,
  popupWithImageSelector,
  currentImage,
  currentImageSubtitle
} from "../scripts/utils/constants.js";

/**Импортируем модули карточки, готовых карточек и валидации форм. */
import { initialCards } from "../scripts/components/initialCards.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

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

/**Создаем экземпляры попапов */
const popupProfileClass = new Popup(popupProfileSelector);

const popupWithImageClass = new PopupWithImage(popupWithImageSelector, {
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

/**Функция открытия формы редактирования данных профайла */
function openProfileEditPopup() {
  nameInput.value = nameProfile.innerText;
  aboutInput.value = aboutProfile.innerText;
  popupProfileClass.open();

  formProfileEditValidator.resetErrorInput();
}

/**Устанавливаем слушатели на попапы */
popupProfileClass.setEventListeners();
popupWithImageClass.setEventListeners();

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

//Обработчик события при клике на картинку - открытие просмотра
function openImagePopup(name, link) {
  popupWithImageClass.open(name, link);
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
profileEditButton.addEventListener("click", openProfileEditPopup);

//Устанавливаем событие на кнопку отправки новых данных профайла
formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

//Устанавливаем событие на кнопку открытия формы добавления карты
cardAddButton.addEventListener("click", () => openPopup(popupNewCard));

//Устанавливаем событие на форму отправки новой карточки, блокируем кнопку отправки, очищаем форму и закрываем попап
formNewCardAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  handleCardFormSubmit();

  formCardSubmitValidator.disableSubmitButton();

  formNewCardAdd.reset();
  closePopup(popupNewCard);
});

export { openImagePopup };
