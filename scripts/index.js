// Выбираем элементы DOM - Кнопки открытия и закрытия формы редактирования профайла
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup-profile');

const nameProfile = profile.querySelector('.profile__name');
const aboutProfile = profile.querySelector('.profile__about');

const nameInput = popupProfile.querySelector('.popup-profile__input_type_name');
const aboutInput = popupProfile.querySelector('.popup-profile__input_type_about');

// Выбираем элемент DOM - форма отправки изменения данных профайла
const formProfileEdit = popupProfile.querySelector('.popup__form-profile-edit');

//Выбираем элементы DOM контейнеры для карточек и фотографии
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup-image');

//Выбираем элементы DOM фотографию и описание для просмотра
const currentImage = imagePopup.querySelector('.popup-image__item');
const currentImageSubtitle = imagePopup.querySelector('.popup-image__subtitle');

//Находим заготовку карточки
const cardTemplate = document.querySelector('#card').content.querySelector('.element');

const cardAddButton = profile.querySelector('.profile__add-button');

const popupNewCard = document.querySelector('.popup-newcard');
const formNewCardAdd = popupNewCard.querySelector('.popup-newcard__form-card-add');

const nameNewCardInput = formNewCardAdd.querySelector('.popup-newcard__input_type_name');
const linkNewCardInput = formNewCardAdd.querySelector('.popup-newcard__input_type_link');

//Находим список попапов
const popupList = document.querySelectorAll('.popup');

const newCardAddButton = formNewCardAdd.querySelector('.popup__new-card-button');

//Функция закрытия попапа при нажатии Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Функция открытия попапа и установки слушателя Esc
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//Функция закрытия попапа и снятия слушателя Esc
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//Функция очистки полей валидации, если окно было закрыто с ошибкой и вызвано снова
function resetErrorInput(popup) {
  const errorInputList = popup.querySelectorAll('.popup__input_type_error');
  errorInputList.forEach((errorInput) => {
    errorInput.textContent = '';
    errorInput.classList.remove('popup__error_visible');
  })
}

// Функция отправки изменений данных профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopup(popupProfile);
}

//Функция удаления карточки
function deleteCurrentCard(evt) {
  const currentCard = evt.target.closest('.element');
  currentCard.remove();
}

//Функция создания новой карточки
function createNewCard(name, link) {
  //Клонируем код карточки
  const card = cardTemplate.cloneNode(true);
  //Наполняем клонированную карточку
  card.querySelector('.element__title').textContent = name;
  const cardFoto = card.querySelector('.element__foto');
  cardFoto.src = link;
  cardFoto.alt = name;
  //Вешаем на фотографию событие открытия попапа и просмотра фотографии
  cardFoto.addEventListener('click', () => handleImageClick(name, link));
  //Вешаем событие лайка на создаваемую карточку
  card.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_checked');
  });
  //Вешаем событие удаления карточки
  card.querySelector('.element__trash-button').addEventListener('click', deleteCurrentCard);
  //Возвращаем новую готовую карточку
  return card;
}

//Функция добавления новой карточки в контейнер
function addNewCard() {
  //Сохраняем возвращаемую функцией карточку в переменную
  const newElement = createNewCard(nameNewCardInput.value, linkNewCardInput.value);
  cardsContainer.prepend(newElement);
}

//Перебираем массив карточек и создаем из них элементы списка карточек
initialCards.forEach(function (card) {
  const initialCard = createNewCard(card.name, card.link);
  cardsContainer.append(initialCard);
});

//Прописываем для каждого попапа слушатели клика по оверлею и кнопке закрытия
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

//Обработчик события при клике на картинку - открытие просмотра
function handleImageClick(name, link) {
  currentImage.src = link;
  currentImage.alt = name;
  currentImageSubtitle.textContent = name;
  openPopup(imagePopup);
}

//Функция очистки формы после добавления новой карточки или закрытия валидной
function disableCardAddForm() {
  newCardAddButton.classList.add('popup__button_disabled');
  newCardAddButton.setAttribute('disabled', '');
}

//Вешаем события на кнопку открытия формы редактирования профайла
profileEditButton.addEventListener('click', () => {
  nameInput.value = nameProfile.innerText;
  aboutInput.value = aboutProfile.innerText;
  openPopup(popupProfile);
  resetErrorInput(popupProfile);
});

//Вешаем событие на кнопку отправки новых данных профайла
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

//Вешаем событие на кнопку открытия формы добавления карты
cardAddButton.addEventListener('click', () => openPopup(popupNewCard));

//Вешаем событие на форму отправки новой карточки, блокируем кнопку отправки, очищаем форму и закрываем попап
formNewCardAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addNewCard();
  disableCardAddForm();
  formNewCardAdd.reset();
  closePopup(popupNewCard);
});