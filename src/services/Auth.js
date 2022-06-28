export default class Auth {
  constructor(api_url) {
    this.api_url = api_url;
  }

  register(email, username, password, verifyPassword) {
    return new Promise((resolve, reject) => {
      if (password.localeCompare(verifyPassword) !== 0) {
        reject("Passwords do not match");
      }
      const data = {
        email,
        username,
        password,
      };

      fetch(this.api_url + "auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          resolve("Registration successful");
        } else {
          return res.json().then((json) => {
            reject(json.message);
          });
        }
      });
    });
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
        .then((res) => {
          if (res.status === 401) {
            reject("Username or password incorrect");
          } else if (res.status === 200) {
            return res.json();
          } else {
            reject("Server Error");
          }
        })
        .then((json) => {
          if (!json.data.access_token) {
            reject("Error: No access token received");
          } else {
            localStorage.setItem("token", json.data.access_token);
            resolve();
          }
        })
        .catch((err) => {
          reject(err);
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
