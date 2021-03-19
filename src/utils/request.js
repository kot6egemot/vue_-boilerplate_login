import axios from "axios";
// eslint-disable-next-line no-unused-vars
import FingerprintJS from "@fingerprintjs/fingerprintjs";
// eslint-disable-next-line no-unused-vars
import store from "@/store";
import { logout, refresh_token } from "@/api/auth";

export async function getFingerPrint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

// eslint-disable-next-line no-unused-vars
export function token_has_expired() {
  const token_created_in = localStorage.getItem("created_in");
  if (token_created_in) {
    return (
      (new Date().getTime() - parseInt(token_created_in)) / 1000 / 60 >
      parseInt(process.env.VUE_APP_ACCESS_TOKEN_EXPIRE_MINUTES)
    );
  }
  return false;
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  timeout: 5000,
  withCredentials: true
});

function doRefreshToken() {
  getFingerPrint().then(fingerprint => {
    const str_refresh_token = localStorage.getItem("refresh_token");
    refresh_token({ fingerprint, refresh_token: str_refresh_token })
      .then(r => {
        store.commit("saveToken", r.data);
      })
      .catch(() => {
        doLogout();
      });
  });
}

export function doLogout() {
  logout();
  store.commit("removeToken");
  document.location.replace("/login");
}

service.interceptors.request.use(function(config) {
  if (token_has_expired() && config.url !== "/auth/refresh_tokens") {
    doRefreshToken();
  }
  const token = localStorage.getItem("token");
  console.log(token);

  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      doRefreshToken().then(() => {
        document.location.reload();
      });
    }
    return error;
  }
);

export default service;
