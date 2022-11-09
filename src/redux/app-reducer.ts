import { getAuthUserData } from "./auth-reducer";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";

export type InitialStateType = typeof initialState;

let initialState = {
  initialized: false,
};

type ActionsTypes = InferActionsTypes<typeof action>;

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case "SET_INITIALIZED":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
const action = {
  initSuccess: () =>
    ({
      type: "SET_INITIALIZED",
    } as const),
};
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export const initializeApp =
  (): ThunkType => (dispatch: any, _getState: GetStateType) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
      dispatch(action.initSuccess());
    });
  };

export default appReducer;
