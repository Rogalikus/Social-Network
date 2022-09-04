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
export const getProfile = (userId) => {
  return profileAPI.getProfile(userId);
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId).then((response) => {
      return response.data;
    });
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then((response) => {
      return response.data;
    });
  },
  signIn(email, password, rememberMe = false) {
    return instance
      .post(`auth/login`, { email, password, rememberMe })
      .then((response) => {
        return response.data;
      });
  },
  logOut() {
    return instance.delete(`auth/login`).then((response) => {
      return response.data;
    });
  },
};
