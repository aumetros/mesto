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
        const newCard = createNewCard(res);
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
          card.remove();
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
      card._element = card.getTemplate();
      card._elementFoto = card._element.querySelector(".element__foto");
      card._elementFoto.src = card._link;
      card._elementFoto.alt = card._name;

      card._trashButton = card._element.querySelector(".element__trash-button");
      card._likeButton = card._element.querySelector(".element__like-button");
      card._counter = card._element.querySelector(".element__like-counter");

      card._element.querySelector(".element__title").textContent = card._name;
      card._counter.textContent = card._likes.length;

      if (isLiked(card._likes, getId())) {
        card._likeButton.classList.toggle("element__like-button_checked");
      }

      renderTrashButton(card._ownerId, card._trashButton);

      card.setEventListeners();

      return card._element;
    },
    handleDeleteCard: (cardId, card) => {
      popupWithConfirmation.open(cardId, card);
    },
    handleLikeCard: (evt) => {
      if (!isLiked(card._likes, getId())) {
        api
          .putLike(card._id)
          .then((res) => {
            card._likes = res.likes;
            card._counter.textContent = res.likes.length;
            evt.target.classList.toggle("element__like-button_checked");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .deleteLike(card._id)
          .then((res) => {
            card._likes = res.likes;
            card._counter.textContent = res.likes.length;
            evt.target.classList.toggle("element__like-button_checked");
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

/**Функция проверки лайкнута ли карточка */
function isLiked(cardLikes, userId) {
  return cardLikes.some((like) => {
    return like._id === userId;
  });
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

    cardsSection.renderItems(res[1]);
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
