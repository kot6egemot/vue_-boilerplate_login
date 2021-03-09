import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
}

export function get_user() {
  return request({
    url: "/auth/user",
    method: "get"
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "post"
  });
}

export function refresh_token(data) {
  return request({
    url: "/auth/refresh_tokens",
    method: "post",
    data
  });
}
