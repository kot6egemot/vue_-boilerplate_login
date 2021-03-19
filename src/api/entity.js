import request from "@/utils/request";
const admin_rout_prefix = "/admin";

export function entity_list(entity) {
  return request({
    url: admin_rout_prefix + `/${entity}` + "/list",
    method: "get"
  });
}

export function entity_by_id(entity, id) {
  return request({
    url: admin_rout_prefix + `/${entity}` + "/get" + `/${id}`,
    method: "get"
  });
}

export function entity_form(entity) {
  return request({
    url: admin_rout_prefix + `/${entity}` + "/form",
    method: "get"
  });
}

export function entity_create(entity, data) {
  return request({
    url: admin_rout_prefix + `/${entity}` + "/create",
    method: "put",
    data
  });
}

export function entity_update(entity, id, data) {
  return request({
    url: admin_rout_prefix + `/${entity}` + "/update" + `/${id}`,
    method: "post",
    data
  });
}

export function entity_delete(entity, id) {
  return request({
    url: admin_rout_prefix + `/${entity}` + "/delete" + `/${id}`,
    method: "delete"
  });
}
