/**Импортируем css-файл для webpack */
import "../pages/index.css";

/**Импортируем модули карточки, готовых карточек и валидации форм. */
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/popupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
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

const popupDeleteCard = document.querySelector(".popup-confirm-delete");

/** Создаем экземпляр класса для работы с API*/
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "6ba72a3f-7eee-48cb-8d60-730e6585ad7a",
  },
});

/**Создаем экземпляр класса секции с карточками */
const cardsSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createNewCard(item);
      cardsSection.addItem(cardElement);
    },
  },
  ".elements"
);

/**Создаем экземпляры попапов */
const popupProfileEdit = new PopupWithForm(".popup-profile", {
  submitForm: (data) => {
    api
      .editProfile(data)
      .then((res) => {
        userInfo.renderUserInfo(res);
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
    api.addNewCard(data).then((res) => {
      const newCard = createNewCard(res);
      cardsSection.addItem(newCard);
    });
  },
  resetValidation: () => {
    formCardSubmitValidator.resetErrorInput();
    formCardSubmitValidator.disableSubmitButton();
  },
});

const popupWithImage = new PopupWithImage(".popup-image");

const popupWithConfirmation = new PopupWithConfirmation(".popup-confirm-delete",
  {
    submitForm: (cardId, card) => {
      api
        .deleteCard(cardId)
        .then(() => {
          card.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
);

/**Создаем экземпляр валидации формы каждого попа для обращения к публичным методам */
const formProfileEditValidator = new FormValidator(
  configValidation,
  formProfileEdit
);

const formCardSubmitValidator = new FormValidator(
  configValidation,
  formNewCardAdd
);

/**Функция отображения кнопки удалить у карточки пользователя */
function renderTrashButton(cardId, trashButton) {
  if (cardId === getId()) {
    trashButton.classList.add("element__trash-button_showed");
  }
  return;
}

/**Функция создания новой карточки */
function createNewCard(data) {
  const card = new Card(data, "#card", {
    handleCardClick: (evt) => {
      const name = evt.target.alt;
      const link = evt.target.src;
      popupWithImage.open(name, link);
    },
    generateCard: () => {
      card.element = card.getTemplate();
      card.elementFoto = card.element.querySelector(".element__foto");
      card.elementFoto.src = card._link;
      card.elementFoto.alt = card._name;

      card.trashButton = card.element.querySelector(".element__trash-button");

      card.element.querySelector(".element__title").textContent = card._name;
      card.element.querySelector(".element__like-counter").textContent =
        card.likes.length;

      renderTrashButton(card.ownerId, card.trashButton);

      card.setEventListeners();

      return card.element;
    },
    handleDeleteCard: (cardId, card) => {
      popupWithConfirmation.open(cardId, card);
    },
  });
  const newElement = card.generateCard();
  return newElement;
}

/**Функция открытия формы редактирования данных профайла */
function openProfileEditPopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  popupProfileEdit.open();
}

//Функция возвращения id пользователя
function getId() {
  const userId = userInfo.getUserId();
  return userId;
}

/**Создаем класс управляющий отображением данных пользователя */
const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
  avatar: ".profile__avatar",
});

/**Загружаем данные пользователя с сервера */
api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserId(user);
    userInfo.renderUserInfo(user);
    userInfo.renderUserAvatar(user);
  })
  .catch((err) => {
    console.log(err);
  });

/**Загружаем на страницу карточки по умолчанию */
api
  .getInitialCards()
  .then((cards) => {
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

/**Устанавливаем слушатели на попапы */
popupProfileEdit.setEventListeners();
popupCardSubmit.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();

/**Устанавливаем валидацию на каждую форму */
formProfileEditValidator.enableValidation();
formCardSubmitValidator.enableValidation();

/**Устанавливаем слушатель события на кнопку открытия формы редактирования профайла */
profileEditButton.addEventListener("click", openProfileEditPopup);

/**Устанавливаем событие на кнопку открытия формы добавления карточки */
newCardAddButton.addEventListener("click", () => popupCardSubmit.open());
