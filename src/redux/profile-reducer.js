import { getProfile } from "../api/api";
import { profileAPI } from "./../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";

let initialState = {
  postsData: [
    { id: 1, message: "Hui, SHO TU GOLOVA?", countLike: "0" },
    { id: 2, message: "It`s JOPA", countLike: "5" },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        countLike: 0,
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};
export const addPostActionCreator = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText,
  };
};
export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};
export const getUserProfile = (userId) => async (dispatch) => {
  let data = await getProfile(userId);
  dispatch(setUserProfile(data));
};
export const setStatus = (status) => {
  return { type: SET_STATUS, status };
};
export const deletePost = (postId) => {
  return { type: DELETE_POST, postId };
};
export const savePhotoSuccess = (photos) => {
  return { type: SAVE_PHOTO_SUCCESS, photos };
};
export const saveProfileSuccess = (profile) => {
  return { type: SAVE_PROFILE_SUCCESS, profile };
};
export const getStatus = (userId) => async (dispatch) => {
  let responce = await profileAPI.getStatus(userId);
  dispatch(setStatus(responce.data));
};
export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id;
  let response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  }
};
export default profileReducer;
