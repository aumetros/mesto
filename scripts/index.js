const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');


function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


let nameProfile = profile.querySelector('.profile__name');
let aboutProfile = profile.querySelector('.profile__about');

let nameInput = popup.querySelector('.popup__input_type_name');
let aboutInput = popup.querySelector('.popup__input_type_about');

nameInput.value = nameProfile.innerText;
aboutInput.value = aboutProfile.innerText;


function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;

  aboutProfile.textContent = aboutInput.value;

  popup.classList.remove('popup_opened');
}

const submitButton = popup.querySelector('.popup__submit-button');

submitButton.addEventListener('click', handleFormSubmit);