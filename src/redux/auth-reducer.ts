import {
  authAPI,
  ResultCodeOfCaptchaEnum,
  ResultCodesEnum,
  securityAPI,
} from "../api/api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "react";

let initialState = {
  id: null as null | number,
  login: null as null | string,
  email: null as null | string,
  isAuth: false,
  captchaURL: null as null | string,
};

export type InitialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "GET_CAPTCHA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SET_USER_DATA",
      payload: { id, email, login, isAuth },
    } as const),
  getCaptchaURL: (captchaURL: string) =>
    ({
      type: "GET_CAPTCHA",
      payload: { captchaURL },
    } as const),
};

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

//type DispatchThunksType = ThunkDispatch<GetStateType, void, ActionsTypes>;

export const getCaptcha = (): ThunkType => async (dispatch: DispatchType) => {
  let data = await securityAPI.getCaptchaUrl();
  const captchaURL = data.url;
  dispatch(actions.getCaptchaURL(captchaURL));
};

export const getAuthUserData =
  (): ThunkType => async (dispatch: DispatchType, _getState: GetStateType) => {
    let data = await authAPI.me();
    if (data.resultCode === ResultCodesEnum.Success) {
      let { id, email, login } = data.data;
      dispatch(actions.setUserData(id, email, login, true));
    }
  };

export const signIn =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null
  ): ThunkType =>
  async (dispatch) => {
    let data = await authAPI.signIn(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeOfCaptchaEnum.CaptchaURL) {
        dispatch(getCaptcha());
      }
    }
    //else {
    //   setStatus(data.messages);
    // }
  };
export const logOut = (): ThunkType => async (dispatch: DispatchType) => {
  let data = await authAPI.logOut();
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setUserData(null, null, null, false));
  }
};

export default authReducer;
