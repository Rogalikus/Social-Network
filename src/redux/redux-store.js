import profileReducer from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { combineReducers, legacy_createStore as createStore } from "redux";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: dialogsReducer,
  usersPage: usersReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;
