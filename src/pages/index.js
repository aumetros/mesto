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

/**Импортируем переменные */
import { configValidation } from "../scripts/utils/configValidation.js";

import {
  profileEditButton,
  newCardAddButton,
  userAvatar,
  formAvatarEdit,
  nameInput,
  aboutInput,
  formProfileEdit,
  formNewCardAdd,
} from "../scripts/utils/constants.js";

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
    renderer: (item, userId) => {
      const cardElement = createNewCard(item, userId);
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
      })
      .finally(() => {
        popupProfileEdit._renderLoading(false);
      });
  },
  resetValidation: () => {
    formProfileEditValidator.resetErrorInput();
  },
});

const popupCardSubmit = new PopupWithForm(".popup-newcard", {
  submitForm: (data) => {
    api
      .addNewCard(data)
      .then((res) => {
        const newCard = createNewCard(res, getId());
        cardsSection.addItem(newCard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCardSubmit._renderLoading(false);
      });
  },
  resetValidation: () => {
    formCardSubmitValidator.resetErrorInput();
    formCardSubmitValidator.disableSubmitButton();
  },
});

const popupWithImage = new PopupWithImage(".popup-image");

const popupWithConfirmation = new PopupWithConfirmation(
  ".popup-confirm-delete",
  {
    submitForm: (cardId, card) => {
      api
        .deleteCard(cardId)
        .then(() => {
          popupWithConfirmation.delete(card);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
);

const popupEditAvatar = new PopupWithForm(".popup-edit-avatar", {
  submitForm: (data) => {
    api
      .editAvatar(data.link)
      .then((res) => {
        userInfo.renderUserAvatar(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar._renderLoading(false);
      });
  },
  resetValidation: () => {
    formAvatarEditValidator.resetErrorInput();
    formAvatarEditValidator.disableSubmitButton();
  },
});

/**Создаем экземпляр валидации формы каждого попапа */
const formProfileEditValidator = new FormValidator(
  configValidation,
  formProfileEdit
);

const formCardSubmitValidator = new FormValidator(
  configValidation,
  formNewCardAdd
);

const formAvatarEditValidator = new FormValidator(
  configValidation,
  formAvatarEdit
);

/**Создаем класс управляющий отображением данных пользователя */
const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
  avatar: ".profile__avatar",
});

/**Функция создания новой карточки */
function createNewCard(data, userId) {
  const card = new Card(data, userId, "#card", {
    handleCardClick: (evt) => {
      const name = evt.target.alt;
      const link = evt.target.src;
      popupWithImage.open(name, link);
    },
    handleDeleteCard: (cardId, card) => {
      popupWithConfirmation.open(cardId, card);
    },
    handleLikeCard: (evt) => {
      if (!card.isLiked(card.likes, card.userId)) {
        api
          .putLike(card.cardId)
          .then((res) => {
            card.switchLike(evt, res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .deleteLike(card.cardId)
          .then((res) => {
            card.switchLike(evt, res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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

/**
 * Загружаем данные пользователя с сервера
 * Загружаем на страницу карточки по умолчанию
 */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    userInfo.setUserId(res[0]);
    userInfo.renderUserInfo(res[0]);
    userInfo.renderUserAvatar(res[0]);

    cardsSection.renderItems(res[1], getId());
  })
  .catch((err) => {
    console.log(err);
  });

/**Устанавливаем слушатели на попапы */
popupProfileEdit.setEventListeners();
popupCardSubmit.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();
popupEditAvatar.setEventListeners();

/**Устанавливаем валидацию на каждую форму */
formProfileEditValidator.enableValidation();
formCardSubmitValidator.enableValidation();
formAvatarEditValidator.enableValidation();

/**Устанавливаем слушатель события на кнопку открытия формы редактирования профайла */
profileEditButton.addEventListener("click", openProfileEditPopup);

/**Устанавливаем событие на кнопку открытия формы добавления карточки */
newCardAddButton.addEventListener("click", () => popupCardSubmit.open());

/**Устаналиваем слушатель на аватар - редактирование */
userAvatar.addEventListener("click", () => popupEditAvatar.open());
