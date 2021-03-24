import axios from "axios";
// eslint-disable-next-line no-unused-vars
import FingerprintJS from "@fingerprintjs/fingerprintjs";
// eslint-disable-next-line no-unused-vars
import store from "@/store";
import { logout } from "@/api/auth";
import { TokenStorage } from "@/utils/token_storage";
import vue_router from "@/router";

export async function getFingerPrint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  timeout: 5000,
  withCredentials: true
});

export function doLogout() {
  logout();
  TokenStorage.clear();
  vue_router.push({ name: "Login" });
}

service.interceptors.request.use(function(config) {
  config.headers.Authorization = `Bearer ${TokenStorage.getToken()}`;
  return config;
});

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      if (error.config.url === "/auth/refresh_tokens") {
        doLogout();
        return error;
      }
      return TokenStorage.getNewToken()
        .then(token => {
          // New request with new token
          const config = error.config;
          config.headers["Authorization"] = `Bearer ${token}`;

          return new Promise((resolve, reject) => {
            service
              .request(config)
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          });
        })
        .catch(error => {
          return Promise.reject(error);
        });
    }
    return error;
  }
);

export default service;
