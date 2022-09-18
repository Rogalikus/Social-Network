import { authAPI } from "./../api/api";

const SET_USER_DATA = "network/auth/SET_USER_DATA";

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
export const getAuthUserData = () => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setUserData(id, email, login, true));
  }
};
export const signIn = (email, password, rememberMe) => async (dispatch) => {
  let data = await authAPI.signIn(email, password, rememberMe);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
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

export default authReducer;
