export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderDefaultItems(element) {
    this._container.append(element);
  }

  renderItems(items, userId) {
    items.forEach((item) => {
      this._renderer(item, userId);
    });
  }
}
