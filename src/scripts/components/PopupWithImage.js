import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup-image__item");
    this._imageSubtitle = this._popup.querySelector(".popup-image__subtitle");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageSubtitle.textContent = name;
    super.open();
  }
}
