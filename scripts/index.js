const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');

let nameProfile = profile.querySelector('.profile__name');
let aboutProfile = profile.querySelector('.profile__about');

let nameInput = popup.querySelector('.popup__input_type_name');
let aboutInput = popup.querySelector('.popup__input_type_about');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.innerText;
  aboutInput.value = aboutProfile.innerText;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

let formProfileEdit = popup.querySelector('.popup__form-profile-edit');

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopup();
}

formProfileEdit.addEventListener('submit', handleFormSubmit);