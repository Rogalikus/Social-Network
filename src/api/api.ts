import axios from "axios";
import { ProfileType, PhotosType } from "../Types/Types";

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "117de793-4071-49ba-8933-4701d3fabaae",
  },
});

type ResponseType<D = {}, RS = ResultCodesEnum | ResultCodeOfCaptchaEnum> = {
  resultCode: RS;
  data: D;
  messages: Array<string>;
};
type ForPutResponseType = {
  resultCode: ResultCodesEnum | ResultCodeOfCaptchaEnum;
  data: {};
  messages: Array<string>;
};

type Users = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

type GetUsersResponseType = {
  items: Array<Users>;
  totalCount: number;
  error: string | null;
};

type GetFollowResponseType = ForPutResponseType;
type DropFollow = ForPutResponseType;

export const getUsers = (
  currentPage = 1,
  pageSize = 5,
  term: string = "",
  friend: string | boolean = ""
) => {
  return instance
    .get<GetUsersResponseType>(
      `users?page=${currentPage}&count=${pageSize}&term=${term}` +
        (friend === null ? "" : `&friend=${friend}`)
    )
    .then((response) => {
      return response.data;
    });
};
export const getFollow = (id: number) => {
  return instance
    .post<GetFollowResponseType>(`follow/${id}`, null)
    .then((response) => {
      return response.data;
    });
};
export const dropFollow = (id: number) => {
  return instance.delete<DropFollow>(`follow/${id}`).then((response) => {
    return response.data;
  });
};

export const getProfile = (userId: number | null) => {
  return profileAPI.getProfile(userId);
};

type ProfileResponseType = ProfileType;
type GetStatusResponseType = any;
type UpdateStatusResponseType = ForPutResponseType;
type SavePhotoResponseType = {
  data: { photos: PhotosType };
  resultCode: ResultCodesEnum | ResultCodeOfCaptchaEnum;
  messages: Array<string>;
};
type SaveProfileResponseType = ForPutResponseType;

export const profileAPI = {
  getProfile(userId: number | null) {
    return instance
      .get<ProfileResponseType>(`profile/` + userId)
      .then((response) => {
        return response.data;
      });
  },
  getStatus(userId: number) {
    return instance.get<GetStatusResponseType>(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put<UpdateStatusResponseType>(`profile/status`, {
      status: status,
    });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<SaveProfileResponseType>("profile", profile)
      .then((response) => response.data);
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeOfCaptchaEnum {
  CaptchaURL = 10,
}

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: { userId: number };
  resultCode: ResultCodesEnum | ResultCodeOfCaptchaEnum;
  messages: Array<string>;
};

type LogOutResponseType = ForPutResponseType;

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((response) => {
      return response.data;
    });
  },
  signIn(email: string, password: string, rememberMe = false, captcha = null) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => {
        return response.data;
      });
  },
  logOut() {
    return instance
      .delete<LogOutResponseType>(`auth/login`)
      .then((response) => {
        return response.data;
      });
  },
};

type CaptchaURLType = {
  url: string;
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<CaptchaURLType>("security/get-captcha-url")
      .then((response) => {
        return response.data;
      });
  },
};
