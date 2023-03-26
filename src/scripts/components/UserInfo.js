export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameProfile = document.querySelector(name);
    this._aboutProfile = document.querySelector(about);
    this._avatarProfile = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameProfile.innerText;
    userInfo.about = this._aboutProfile.innerText;
    return userInfo;
  }

  getUserId() {
    return this._id;    
  }

  renderUserInfo({name, about}) {
    this._nameProfile.textContent = name;
    this._aboutProfile.textContent = about;
  }

  renderUserAvatar({avatar}) {
    this._avatarProfile.style.backgroundImage = `url(${avatar})`;
  }

  setUserId({_id}) {
    this._id = _id;
  }  
}
