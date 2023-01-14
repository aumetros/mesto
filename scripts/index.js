// Выбираем элементы DOM - Кнопки открытия и закрытия формы редактирования профайла
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup-profile');
const closeButton = popupProfile.querySelector('.popup-profile__close-button');

let nameProfile = profile.querySelector('.profile__name');
let aboutProfile = profile.querySelector('.profile__about');

let nameInput = popupProfile.querySelector('.popup-profile__input_type_name');
let aboutInput = popupProfile.querySelector('.popup-profile__input_type_about');

// Функция открытия попапа
function openPopupProfile() {
  popupProfile.classList.add('popup_opened');
  nameInput.value = nameProfile.innerText;
  aboutInput.value = aboutProfile.innerText;
}

// Функция закрытия попапа
function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

//Вешаем события на кнопки открытия и закрытия попапа редактирования профайла
editButton.addEventListener('click', openPopupProfile);
closeButton.addEventListener('click', closePopupProfile);

// Выбираем элемент DOM - форма отправки изменения данных профайла
let formProfileEdit = popupProfile.querySelector('.popup-profile__form-profile-edit');

// Функция отправки изменений данных профайла
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopupProfile();
}

//Вешаем событие на кнопку отправки новых данных профайла
formProfileEdit.addEventListener('submit', handleFormSubmit);

//Массив карточек "из коробки" при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Выбираем элементы DOM список карточек и template
const elementTemplate = document.querySelector('#card').content;
const elementsList = document.querySelector('.elements');


//Перебираем массив карточек и создаем из них элементы списка карточек
initialCards.forEach(function(card) {

  //Клонируем код карточки
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  //Наполняем клонированную карточку
  element.querySelector('.element__foto').src = card.link;
  element.querySelector('.element__title').textContent = card.name;

  //Добавляем на страницу
  elementsList.append(element);

});


// Выбираем элементы DOM - Кнопки открытия и закрытия формы добавления карточки
const addButton = profile.querySelector('.profile__add-button');

const popupNewCard = document.querySelector('.popup-newcard');
const closePopupNewCardButton = popupNewCard.querySelector('.popup-newcard__close-button');

//Функции открытия и закрытия попапа добавления карточки
function openPopupNewCard () {
  popupNewCard.classList.add('popup_opened');
}

function closePopupNewCard () {
  popupNewCard.classList.remove('popup_opened');
}

//Вешаем события на кнопки открытия и закрытия формы добавления карты
addButton.addEventListener('click', openPopupNewCard);
closePopupNewCardButton.addEventListener('click', closePopupNewCard);

// Выбираем элемент DOM - форма добавления новых карточек
const formNewCardAdd = popupNewCard.querySelector('.popup-newcard__form-card-add');

//Функция добавления новый карточек
function addNewCard(evt) {
  evt.preventDefault();

  const nameNewCardInput = formNewCardAdd.querySelector('.popup-newcard__input_type_name');
  const linkNewCardInput = formNewCardAdd.querySelector('.popup-newcard__input_type_link');

  //Клонируем код карточки
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  //Наполняем клонированную карточку
  element.querySelector('.element__title').textContent = nameNewCardInput.value;
  element.querySelector('.element__foto').src = linkNewCardInput.value;

  elementsList.prepend(element);

  closePopupNewCard();
}

//Вешаем событие форму отправки новой карточки
formNewCardAdd.addEventListener('submit', addNewCard);
