export default class Auth {
  constructor(api_url) {
    this.api_url = api_url;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      const data = {
        username: username,
        password: password,
      };

      fetch(this.api_url + "auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
          } else {
            localStorage.setItem("token", data.token);
            resolve(data.token);
          }
        });
    });
  }

  logout() {
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    return localStorage.getItem("token") !== null;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUser() {
    return new Promise((resolve, reject) => {
      const auth = new Auth(this.api_url);
      if (!auth.isLoggedIn()) {
        reject("Not logged in");
      }

      fetch(this.api_url + "users/fromToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.getToken(),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
          } else {
            resolve(data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
