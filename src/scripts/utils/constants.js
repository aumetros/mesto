/**Выбираем DOM элементы страницы */
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const newCardAddButton = profile.querySelector(".profile__add-button");
const userAvatar = profile.querySelector(".profile__avatar");
const formAvatarEdit = document.querySelector(".popup-edit-avatar__form");

/**Выбираем DOM элементы попапов */
const popupProfile = document.querySelector(".popup-profile");
const nameInput = popupProfile.querySelector(".popup-profile__input_type_name");
const aboutInput = popupProfile.querySelector(".popup-profile__input_type_about");
const formProfileEdit = popupProfile.querySelector(".popup__form-profile-edit");

const popupNewCard = document.querySelector(".popup-newcard");
const formNewCardAdd = popupNewCard.querySelector(".popup-newcard__form-card-add");

export {
  profileEditButton,
  newCardAddButton,
  userAvatar,
  formAvatarEdit,
  nameInput,
  aboutInput,
  formProfileEdit,
  formNewCardAdd,
};
