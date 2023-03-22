export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(res => res.json())
    .then ((result) => {
      console.log(result);
    })
  }

  test() {
    console.log(this.baseUrl);
    console.log(this.headers);
  }
}

// fetch("https://nomoreparties.co/v1/cohort-62/users/me", {
//   headers: {
//     authorization: "6ba72a3f-7eee-48cb-8d60-730e6585ad7a",
//   }
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });
