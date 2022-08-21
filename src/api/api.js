import * as axios from "axios";

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "117de793-4071-49ba-8933-4701d3fabaae",
  },
});

export const getUsers = (currentPage = 1, pageSize = 5) => {
  return instance
    .get(`users?page=${currentPage}&count=${pageSize}`)
    .then((response) => {
      return response.data;
    });
};
export const getFollow = (id) => {
  return instance.post(`follow/${id}`, null).then((response) => {
    return response.data;
  });
};
export const dropFollow = (id) => {
  return instance.delete(`follow/${id}`).then((response) => {
    return response.data;
  });
};
