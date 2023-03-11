export default class UserInfo {
  constructor({name, about}) {
    this._nameProfile = document.querySelector(name);
    this._aboutProfile = document.querySelector(about);
  }

  getUserInfo() {
  const userInfo = {};
  userInfo.name = this._nameProfile.innerText;
  userInfo.about = this._aboutProfile.innerText;
  return userInfo;
  }

  setUserInfo(data) {
    this._nameProfile.textContent = data.name;
    this._aboutProfile.textContent = data.about;
  }
}