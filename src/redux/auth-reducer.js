import { authAPI } from "./../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const PROCESS_SIGN_UP = "PROCESS_SIGN_UP";
const LEAVING_SITE = "LEAVING_SITE";

let initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    case PROCESS_SIGN_UP:
      return {
        ...state,
        email: action.email,
        password: action.password,
        rememberMe: action.rememberMe,
      };
    case LEAVING_SITE:
      return {
        ...state,
        userId: action.id,
      };
    default:
      return state;
  }
};
export const setUserData = (id, email, login) => ({
  type: SET_USER_DATA,
  data: { id, email, login },
});
export const auThorize = (email, password, rememberMe) => ({
  type: PROCESS_SIGN_UP,
  email,
  password,
  rememberMe,
});
export const leaveSite = (userId) => ({
  type: LEAVING_SITE,
  userId,
});

export const getAuthUserData = () => (dispatch) => {
  authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setUserData(id, email, login));
    }
  });
};
export const signIn = () => (dispatch) => {
  authAPI.signIn().then((values) => {
    if (values === 0) {
      dispatch(auThorize(values));
    }
  });
};
export const logOut = () => (dispatch) => {
  authAPI.logOut().then((data) => {
    dispatch(leaveSite(data.data));
  });
};

export default authReducer;
