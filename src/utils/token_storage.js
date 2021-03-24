import { refresh_token } from "@/api/auth";
import { getFingerPrint } from "@/utils/request";

export class TokenStorage {
  static LOCAL_STORAGE_TOKEN = "token";
  static LOCAL_STORAGE_REFRESH_TOKEN = "refresh_token";

  static isAuthenticated() {
    return this.getToken() !== null;
  }

  static getAuthentication() {
    return {
      headers: { Authorization: "Bearer " + this.getToken() }
    };
  }

  static getNewToken() {
    return new Promise((resolve, reject) => {
      getFingerPrint().then(fingerprint => {
        const data = {
          refresh_token: this.getRefreshToken(),
          fingerprint
        };
        refresh_token(data)
          .then(response => {
            console.log(response);
            this.storeToken(response.data.access_token);
            this.storeRefreshToken(response.data.refresh_token);
            resolve(response.data.access_token);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    });
  }

  static storeToken(token) {
    localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
  }

  static storeRefreshToken(refreshToken) {
    localStorage.setItem(
      TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN,
      refreshToken
    );
  }

  static clear() {
    localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  static getRefreshToken() {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  static getToken() {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
  }
}
