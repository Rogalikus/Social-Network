import profileReducer from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
  Action,
  AnyAction,
} from "redux";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer; //globalState: GLOBALSTATE)=>GLOBALSTATE
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store = store;

export default store;
