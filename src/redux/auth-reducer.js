import { authAPI } from "./../api/api";

const SET_USER_DATA = "SET_USER_DATA";

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
export const getAuthUserData = () => (dispatch) => {
  authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setUserData(id, email, login, true));
    }
  });
};
export const signIn = (email, password, rememberMe) => (dispatch) => {
  authAPI.signIn(email, password, rememberMe).then((data) => {
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    }
  });
};
export const logOut = () => (dispatch) => {
  authAPI.logOut().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setUserData(null, null, null, false));
    }
  });
};

export default authReducer;
