/**Импортируем css-файл для webpack */
import "../pages/index.css";

/**Импортируем модули карточки, готовых карточек и валидации форм. */
// import { initialCards } from "../scripts/utils/initialCards.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/popupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

/**Конфигуратор селекторов и классов для валидации форм */
const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/**Выбираем DOM элементы страницы */
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const newCardAddButton = profile.querySelector(".profile__add-button");
const userAvatar = profile.querySelector(".profile__avatar");
// const userName = profile.querySelector(".profile__name");
// const userAbout = profile.querySelector(".profile__about");
const cardsContainer = document.querySelector(".elements");

/**Выбираем DOM элементы попапов */
const popupProfile = document.querySelector(".popup-profile");
const nameInput = popupProfile.querySelector(".popup-profile__input_type_name");
const aboutInput = popupProfile.querySelector(
  ".popup-profile__input_type_about"
);
const formProfileEdit = popupProfile.querySelector(".popup__form-profile-edit");

const popupNewCard = document.querySelector(".popup-newcard");
const formNewCardAdd = popupNewCard.querySelector(
  ".popup-newcard__form-card-add"
);

/** Создаем экземпляр класса для работы с API*/
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "6ba72a3f-7eee-48cb-8d60-730e6585ad7a"
  },
});

/**Функция создания новой карточки */
function createNewCard(data) {
  const card = new Card(data, "#card", {
    handleCardClick: (evt) => {
      const name = evt.target.alt;
      const link = evt.target.src;
      popupWithImage.open(name, link);
    },
  });
  const newElement = card.generateCard();
  return newElement;
}

/**Создаем экземпляры попапов */
const popupProfileEdit = new PopupWithForm(".popup-profile", {
  submitForm: (data) => {
    api
      .editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  resetValidation: () => {
    formProfileEditValidator.resetErrorInput();
  },
});

const popupCardSubmit = new PopupWithForm(".popup-newcard", {
  submitForm: (data) => {
    api.addNewCard(data)
    .then((res) => {
      const newCard = createNewCard(res);
      cardsContainer.prepend(newCard);  //Требует рефакторинга
    })
  },
  resetValidation: () => {
    formCardSubmitValidator.resetErrorInput();
    formCardSubmitValidator.disableSubmitButton();
  },
});

const popupWithImage = new PopupWithImage(".popup-image");

/**Создаем экземпляр валидации формы каждого попа для обращения к публичным методам */
const formProfileEditValidator = new FormValidator(
  configValidation,
  formProfileEdit
);

const formCardSubmitValidator = new FormValidator(
  configValidation,
  formNewCardAdd
);

/**Создаем класс управляющий отображением данных пользователя */
const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
});

/**Функция открытия формы редактирования данных профайла */
function openProfileEditPopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  popupProfileEdit.open();
}

/**Загружаем данные пользователя с сервера */
api
  .getUserInfo()
  .then((user) => {
    userAvatar.src = user.avatar;
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });

/**Загружаем на страницу карточки по умолчанию */
api
  .getInitialCards()
  .then((cards) => {
    const defaultCardList = new Section(
      {
        items: cards,
        renderer: (item) => {
          const cardElement = createNewCard(item);
          defaultCardList.addItem(cardElement);
        },
      },
      ".elements"
    );
    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

/**Устанавливаем слушатели на попапы */
popupProfileEdit.setEventListeners();
popupCardSubmit.setEventListeners();
popupWithImage.setEventListeners();

/**Устанавливаем валидацию на каждую форму */
formProfileEditValidator.enableValidation();
formCardSubmitValidator.enableValidation();

/**Устанавливаем слушатель события на кнопку открытия формы редактирования профайла */
profileEditButton.addEventListener("click", openProfileEditPopup);

/**Устанавливаем событие на кнопку открытия формы добавления карточки */
newCardAddButton.addEventListener("click", () => popupCardSubmit.open());
