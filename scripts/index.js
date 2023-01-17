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
  nameInput.value = ''; //Очищаем поля перед открытием
  aboutInput.value = '';
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
  //Проверяем заполнены ли все поля формы
  if (nameInput.value === '' || aboutInput.value === '') {
    alert('Пожалуйста, заполните все поля!');
  } else {
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopupProfile();
  }
}

//Вешаем событие на кнопку отправки новых данных профайла
formProfileEdit.addEventListener('submit', handleFormSubmit);


//Выбираем элементы DOM контейнеры для карточек и фотографии
const elementsList = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup-image');

//Функция закрытия попапа просмотра фотографии
function closeImageViewer() {
imagePopup.classList.remove('popup_opened');
}

//Функция создания новой фотографии для просмотра
function createNewImageViewer(name, link) {
  //Подставляем в заготовку новые значения фото и описания
  const currentImage = imagePopup.querySelector('.popup-image__item');
  const currentImageSubtitle = imagePopup.querySelector('.popup-image__subtitle')
  currentImage.src = link;
  currentImage.alt = name;
  currentImageSubtitle.textContent = name;
  //Вешаем на кнопку закрытия попапа событие
  imagePopup.querySelector('.popup-image__close-button').addEventListener('click', closeImageViewer);
}

//Функция создания новой карточки
function createNewCard(name, link) {
  //Находим заготовку карточки
  const elementTemplate = document.querySelector('#card').content;
  //Клонируем код карточки
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  //Наполняем клонированную карточку
  element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__foto').src = link;
  element.querySelector('.element__foto').alt = name;
  //Вешаем на фотографию событие открытия попапа и просмотра фотографии
  element.querySelector('.element__foto').addEventListener('click', function() {
    createNewImageViewer(name, link);
    imagePopup.classList.add('popup_opened');    
  });
  //Вешаем событие лайка на создаваемую карточку
  element.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_checked');
  });
  //Вешаем событие удаления карточки
  element.querySelector('.element__trash-button').addEventListener('click', function(evt) {
    const currentCard = evt.target.closest('.element');
    currentCard.remove();
  });
  //Возвращаем новую готовую карточку
  return element;
}

//Функция добавления новой карточки в контейнер
function addNewCard() {
  //Сохраняем возвращаемую функцией карточку в переменную
  const newElement = createNewCard(nameNewCardInput.value, linkNewCardInput.value);
  elementsList.prepend(newElement);  
}

//Перебираем массив карточек и создаем из них элементы списка карточек
initialCards.forEach(function(card) {
  const initialCard = createNewCard(card.name, card.link);
  elementsList.append(initialCard);
});

// Выбираем элементы DOM - Кнопки открытия и закрытия формы добавления карточки
const addButton = profile.querySelector('.profile__add-button');

const popupNewCard = document.querySelector('.popup-newcard');
const closePopupNewCardButton = popupNewCard.querySelector('.popup-newcard__close-button');

const formNewCardAdd = popupNewCard.querySelector('.popup-newcard__form-card-add');
const nameNewCardInput = formNewCardAdd.querySelector('.popup-newcard__input_type_name');
const linkNewCardInput = formNewCardAdd.querySelector('.popup-newcard__input_type_link');

//Функции открытия и закрытия попапа добавления карточки
function openPopupNewCard () {
  nameNewCardInput.value = ''; //Для избежания заполненных полей при повторном открытии попапа
  linkNewCardInput.value = '';
  popupNewCard.classList.add('popup_opened');
}

//Функция закрытия попапа добавления новой карточки
function closePopupNewCard () {
  popupNewCard.classList.remove('popup_opened');
}

//Вешаем события на кнопки открытия и закрытия формы добавления карты
addButton.addEventListener('click', openPopupNewCard);
closePopupNewCardButton.addEventListener('click', closePopupNewCard);

//Вешаем событие на форму отправки новой карточки и закрываем попап
formNewCardAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  if (nameNewCardInput.value === '' || linkNewCardInput.value === '') {
    alert('Пожалуйста, заполните все поля!')    
  } else {
  addNewCard();
  closePopupNewCard();
  }
});