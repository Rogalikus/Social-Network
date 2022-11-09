import { getProfile } from "../api/api";
import { profileAPI } from "../api/api";
import { PhotosType } from "../Types/Types";
import { PostType } from "../Types/Types";
import { ProfileType } from "../Types/Types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "react";

let initialState = {
  postsData: [
    { id: 1, message: "Hui, SHO TU GOLOVA?", countLike: 0 },
    { id: 2, message: "It`s JOPA", countLike: 5 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  error: [],
  newPostText: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case "ADD_POST":
      let newPost = {
        id: 5,
        message: action.newPostText,
        countLike: 0,
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: "",
      };
    case "SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "DELETE_POST":
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };
    case "SAVE_PHOTO_SUCCESS":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    case "SAVE_PROFILE_SUCCESS":
      return {
        ...state,
        profile: action.profile,
      };
    case "SHOW_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  saveProfileSuccess: (profile: ProfileType) => {
    return { type: "SAVE_PROFILE_SUCCESS", profile } as const;
  },
  savePhotoSuccess: (photos: PhotosType) => {
    return { type: "SAVE_PHOTO_SUCCESS", photos } as const;
  },
  deletePost: (postId: number) => {
    return { type: "DELETE_POST", postId } as const;
  },
  showError: (error: Array<string>) => {
    return { type: "SHOW_ERROR", error } as const;
  },
  setStatus: (status: string) => {
    return { type: "SET_STATUS", status } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return { type: "SET_USER_PROFILE", profile } as const;
  },
  addPostActionCreator: (newPostText: string) => {
    return {
      type: "ADD_POST",
      newPostText,
    } as const;
  },
};

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

export const getUserProfile =
  (userId: number | null): ThunkType =>
  async (dispatch: DispatchType) => {
    let data = await getProfile(userId);
    dispatch(actions.setUserProfile(data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch: DispatchType) => {
    let responce = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(responce.data));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch: DispatchType) => {
    try {
      let response = await profileAPI.updateStatus(status);
      if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }
    } catch (error) {}
  };

export const savePhoto =
  (file: any): ThunkType =>
  async (dispatch: DispatchType) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(response.data.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch: DispatchType | any, getState: GetStateType) => {
    let data = await profileAPI.saveProfile(profile);

    const userId = getState().auth.id;

    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else if (data.resultCode === 1) {
      dispatch(actions.showError(data.messages));
    }
  };

export default profileReducer;
