import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
export const initSuccess = () => ({
  type: SET_INITIALIZED,
});
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(initSuccess());
  });
};

export default appReducer;