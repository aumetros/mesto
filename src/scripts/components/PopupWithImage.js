import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { fillImagePopup }) {
    super(popupSelector);
    this._fillImagePopup = fillImagePopup;
  }

  open(name, link) {
    this._fillImagePopup(name, link);
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
}
