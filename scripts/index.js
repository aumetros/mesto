// Выбираем элементы DOM - Кнопки открытия и закрытия формы редактирования профайла
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup-profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup-profile__close-button');

const nameProfile = profile.querySelector('.profile__name');
const aboutProfile = profile.querySelector('.profile__about');

const nameInput = popupProfile.querySelector('.popup-profile__input_type_name');
const aboutInput = popupProfile.querySelector('.popup-profile__input_type_about');

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Вешаем события на кнопки открытия и закрытия попапа редактирования профайла
profileEditButton.addEventListener('click', () => {
  nameInput.value = nameProfile.innerText;
  aboutInput.value = aboutProfile.innerText;
  openPopup(popupProfile);
});
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));

// Выбираем элемент DOM - форма отправки изменения данных профайла
let formProfileEdit = popupProfile.querySelector('.popup-profile__form-profile-edit');

// Функция отправки изменений данных профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopup(popupProfile);
}

//Вешаем событие на кнопку отправки новых данных профайла
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

//Выбираем элементы DOM контейнеры для карточек и фотографии
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup-image');

//Вешаем событие на кнопку закрытия попапа просмотра фото
imagePopup.querySelector('.popup-image__close-button').addEventListener('click', () => closePopup(imagePopup));

//Выбираем элементы DOM фотографию и описание для просмотра
const currentImage = imagePopup.querySelector('.popup-image__item');
const currentImageSubtitle = imagePopup.querySelector('.popup-image__subtitle');

//Обработчик события при клике на картинку - открытие просмотра
function handleImageClick(name, link) {
  currentImage.src = link;
  currentImage.alt = name;
  currentImageSubtitle.textContent = name;
  openPopup(imagePopup);
}

//Находим заготовку карточки
const cardTemplate = document.querySelector('#card').content.querySelector('.element');

//Функция удаления карточки
function deleteCurrentCard (evt) {
  const currentCard = evt.target.closest('.element');
  currentCard.remove();
}

//Функция создания новой карточки
function createNewCard(name, link) {  
  //Клонируем код карточки
  const card = cardTemplate.cloneNode(true);
  //Наполняем клонированную карточку
  card.querySelector('.element__title').textContent = name;
  card.querySelector('.element__foto').src = link;
  card.querySelector('.element__foto').alt = name;
  //Вешаем на фотографию событие открытия попапа и просмотра фотографии
  card.querySelector('.element__foto').addEventListener('click', () => handleImageClick(name, link));
  //Вешаем событие лайка на создаваемую карточку
  card.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_checked');
  });
  //Вешаем событие удаления карточки
  card.querySelector('.element__trash-button').addEventListener('click', deleteCurrentCard);
  //Возвращаем новую готовую карточку
  return card;
}

const cardAddButton = profile.querySelector('.profile__add-button');

const popupNewCard = document.querySelector('.popup-newcard');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup-newcard__close-button');
const formNewCardAdd = popupNewCard.querySelector('.popup-newcard__form-card-add');

const nameNewCardInput = formNewCardAdd.querySelector('.popup-newcard__input_type_name');
const linkNewCardInput = formNewCardAdd.querySelector('.popup-newcard__input_type_link');

//Функция добавления новой карточки в контейнер
function addNewCard() {
  //Сохраняем возвращаемую функцией карточку в переменную
  const newElement = createNewCard(nameNewCardInput.value, linkNewCardInput.value);
  cardsContainer.prepend(newElement);  
}

//Перебираем массив карточек и создаем из них элементы списка карточек
initialCards.forEach(function(card) {
  const initialCard = createNewCard(card.name, card.link);
  cardsContainer.append(initialCard);
});

//Вешаем события на кнопки открытия и закрытия формы добавления карты
cardAddButton.addEventListener('click', () => {
  formNewCardAdd.reset();
  openPopup(popupNewCard);
});
popupNewCardCloseButton.addEventListener('click', () => closePopup(popupNewCard));

//Вешаем событие на форму отправки новой карточки и закрываем попап
formNewCardAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupNewCard);
  }
);