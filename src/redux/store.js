import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: "Hui, SHO TU GOLOVA?", countLike: "0" },
        { id: 2, message: "It`s JOPA", countLike: "5" },
      ],
      newPostText: "4e go?",
    },
    messagesPage: {
      dialogsData: [
        { id: 1, name: "Ukrainets" },
        { id: 2, name: "Belarus" },
        { id: 3, name: "Moskal" },
        { id: 4, name: "Negr" },
      ],
      messagesData: [
        { id: 1, text: "Pishov Nahui,Moskal" },
        { id: 2, text: "Ne stop, dai hui otsosy, potom idi kyda ho4esh" },
        { id: 3, text: "Ladno(" },
        { id: 4, text: "Y menya bolshe,Belarus" },
      ],
      newMessagesData: "Sho hochesh?",
    },
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this.__callSomeone = observer;
  },
  _callSomeone() {
    console.log("state changed");
  },
  // _addPost() {
  //   let newPost = {
  //     id: 5,
  //     message: this._state.profilePage.newPostText,
  //     countLike: 0,
  //   };
  //   this._state.profilePage.postsData.push(newPost);
  //   this._state.profilePage.newPostText = "";
  //   this.__callSomeone(this._state);
  // },
  // _updateNewPostText(newText) {
  //   debugger;
  //   this._state.profilePage.newPostText = newText;
  //   this.__callSomeone(this._state);
  // },
  // addMessage() {
  //   let newMessage = {
  //     id: 5,
  //     text: this._state.messagesPage.newMessagesData,
  //   };
  //   this._state.messagesPage.messagesData.push(newMessage);
  //   this.__callSomeone(this._state);
  // },
  // updateNewMessageText(newText) {
  //   this._state.messagesPage.newMessagesData = newText;
  //   this.__callSomeone(this._state);
  // },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
    this.__callSomeone(this._state);
  },
};

export default store;
window.store = store;
