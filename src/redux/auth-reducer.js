import { authAPI, securityAPI } from "./../api/api";

const SET_USER_DATA = "network/auth/SET_USER_DATA";
const GET_CAPTCHA = "GET_CAPTCHA";

let initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaURL: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case GET_CAPTCHA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export const setUserData = (id, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});

export const getCaptchaURL = (captchaURL) => ({
  type: GET_CAPTCHA,
  payload: { captchaURL },
});

export const getAuthUserData = () => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setUserData(id, email, login, true));
  }
};
export const signIn =
  (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authAPI.signIn(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptcha());
      }
    }
    //else {
    //   setStatus(data.messages);
    // }
  };
export const logOut = () => async (dispatch) => {
  let data = await authAPI.logOut();
  if (data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
  }
};

export const getCaptcha = () => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  const captchaURL = data.url;
  dispatch(getCaptchaURL(captchaURL));
};

export default authReducer;
