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